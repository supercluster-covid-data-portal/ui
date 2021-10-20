def dockerHubRepo = "overture/dms-ui"
def gitHubRegistry = "ghcr.io"
def gitHubRepo = "overture-stack/dms-ui"
def commit = "UNKNOWN"
def version = "UNKNOWN"

pipeline {
    agent {
        kubernetes {
            label 'dms-ui-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:12.13.1
    tty: true
  - name: docker
    image: docker:18-git
    tty: true
    env:
    - name: DOCKER_HOST
      value: tcp://localhost:2375
    - name: HOME
      value: /home/jenkins/agent
  - name: helm
    image: alpine/helm:3.1.0
    command:
    - cat
    tty: true
  - name: dind-daemon
    image: docker:18.06-dind
    securityContext:
      privileged: true
      runAsUser: 0
    volumeMounts:
    - name: docker-graph-storage
      mountPath: /var/lib/docker
  securityContext:
    runAsUser: 1000
  volumes:
  - name: docker-graph-storage
    emptyDir: {}
"""
        }
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    commit = sh(returnStdout: true, script: 'git describe --always').trim()
                }
                script {
                    version = sh(returnStdout: true, script: 'cat ./package.json | grep version | cut -d \':\' -f2 | sed -e \'s/"//\' -e \'s/",//\'').trim()
                }
            }
        }

		stage('Test') {
			steps {
				container('node') {
					sh "npm ci"
					sh "npm run test"
				}
			}
		}

		stage('Build & Publish Develop') {
			when {
				anyOf {
					branch 'develop'
				}
			}
			steps {
				container('docker') {
					withCredentials([usernamePassword(credentialsId:'OvertureDockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						sh 'docker login -u $USERNAME -p $PASSWORD'
					}
					// DNS error if --network is default
					sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:${version}-${commit} -t ${dockerHubRepo}:edge"
					sh "docker push ${dockerHubRepo}:${version}-${commit}"
					sh "docker push ${dockerHubRepo}:edge"
				}
			}
		}

		stage('Build arranger rewrite images') {
			when {
				anyOf {
					branch 'arranger-rewrite'
				}
			}
			steps {
				container('docker') {
					withCredentials([usernamePassword(credentialsId:'OvertureBioGithub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						sh "docker login ${gitHubRegistry} -u $USERNAME -p $PASSWORD"
					}
					// DNS error if --network is default
					sh "docker build --network=host -f Dockerfile . -t ${gitHubRegistry}/${gitHubRepo}:arranger-rewrite -t ${gitHubRegistry}/${gitHubRepo}:arranger-rewrite-${commit}"
					sh "docker push ${gitHubRegistry}/${gitHubRepo}:arranger-rewrite-${commit}"
					sh "docker push ${gitHubRegistry}/${gitHubRepo}:arranger-rewrite"
				}
			}
		}

		stage('Release & Tag') {
			when {
				anyOf {
					branch 'master'
				}
			}
			steps {
				container('docker') {
					withCredentials([usernamePassword(credentialsId: 'OvertureBioGithub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
						sh "git tag ${version}"
						sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${gitHubRepo} --tags"
					}
					withCredentials([usernamePassword(credentialsId:'OvertureDockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
						sh 'docker login -u $USERNAME -p $PASSWORD'
					}
					// DNS error if --network is default
					sh "docker build --network=host -f Dockerfile . -t ${dockerHubRepo}:${version} -t ${dockerHubRepo}:latest"
					sh "docker push ${dockerHubRepo}:${version}"
					sh "docker push ${dockerHubRepo}:latest"
				}
			}
		}
		

		stage('Deploy to overture-qa') {
			when {
				branch "develop"
			}
			steps {
				build(job: "/Overture.bio/provision/helm", parameters: [
						[$class: 'StringParameterValue', name: 'OVERTURE_ENV', value: 'qa' ],
						[$class: 'StringParameterValue', name: 'OVERTURE_CHART_NAME', value: 'dms-ui'],
						[$class: 'StringParameterValue', name: 'OVERTURE_RELEASE_NAME', value: 'dms-ui'],
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_CHART_VERSION', value: ''], // use latest
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_REPO_URL', value: "https://overture-stack.github.io/charts-server/"],
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_REUSE_VALUES', value: "false" ],
						[$class: 'StringParameterValue', name: 'OVERTURE_ARGS_LINE', value: "--set-string image.tag=${version}-${commit}"]
				])
			}
		}

		stage('Deploy to overture-staging') {
			when {
				branch "master"
			}
			steps {
				build(job: "/Overture.bio/provision/helm", parameters: [
						[$class: 'StringParameterValue', name: 'OVERTURE_ENV', value: 'staging' ],
						[$class: 'StringParameterValue', name: 'OVERTURE_CHART_NAME', value: 'dms-ui'],
						[$class: 'StringParameterValue', name: 'OVERTURE_RELEASE_NAME', value: 'dms-ui'],
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_CHART_VERSION', value: ''], // use latest
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_REPO_URL', value: "https://overture-stack.github.io/charts-server/"],
						[$class: 'StringParameterValue', name: 'OVERTURE_HELM_REUSE_VALUES', value: "false" ],
						[$class: 'StringParameterValue', name: 'OVERTURE_ARGS_LINE', value: "--set-string image.tag=${version}"]
				])
			}
		}

    }
    post {
        unsuccessful {
            // i used node container since it has curl already
            container("node") {
                script {
                    if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop") {
                    withCredentials([string(credentialsId: 'JenkinsFailuresSlackChannelURL', variable: 'JenkinsFailuresSlackChannelURL')]) { 
                            sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Failed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${JenkinsFailuresSlackChannelURL}"
                        }
                    }
                }
            }
        }
        fixed {
            // i used node container since it has curl already
            container("node") {
                script {
                    if (env.BRANCH_NAME == "master" || env.BRANCH_NAME == "develop") {
                    withCredentials([string(credentialsId: 'JenkinsFailuresSlackChannelURL', variable: 'JenkinsFailuresSlackChannelURL')]) { 
                            sh "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Build Fixed: ${env.JOB_NAME} [${env.BUILD_NUMBER}] (${env.BUILD_URL}) \"}' ${JenkinsFailuresSlackChannelURL}"
                        }
                    }
                }
            }
        }
    }
}
