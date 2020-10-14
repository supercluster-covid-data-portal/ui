def dockerHubRepo = "overture/dms-ui"
def githubRepo = "overture-stack/dms-ui"
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
    image: node:12.6.0
    tty: true
  - name: docker
    image: docker:18-git
    tty: true
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: docker-sock
  - name: helm
    image: alpine/helm:3.1.0
    command:
    - cat
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
      type: File
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
        //stage('Test') {
            //steps {
                //container('node') {
                    //sh "npm ci"
                    //sh "npm run type-check"
                    //sh "npm run build"
                    //sh "npm run test"
                    //sh "npm run build-uikit"
                //}
                //container('node') {
                    //sh "GATEWAY_API_ROOT=https://argo-gateway.dev.argo.cancercollaboratory.org/ npm run test-gql-validation"
                //}
            //}
        //}

        stage('Build & Publish Develop') {
            when {
                anyOf {
                    branch 'develop'
                    branch 'test-develop'
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

        stage('Release & Tag') {
            when {
                anyOf {
                    branch 'master'
                    branch 'test-master'
                }
            }
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'OvertureBioGithub', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                        sh "git tag ${version}"
                        sh "git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${githubRepo} --tags"
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
        

        //stage('Deploy to overture-qa') {
            //when {
                //branch "develop"
            //}
            //steps {
                //container('helm') {
                    //withCredentials([file(credentialsId:'4ed1e45c-b552-466b-8f86-729402993e3b', variable: 'KUBECONFIG')]) {
                        //sh 'env'
                        //sh 'helm init --client-only'
                        //sh "helm ls --kubeconfig $KUBECONFIG"
                        //sh "helm repo add overture https://overture-stack.github.io/charts-server/"
                        //sh """
                            //helm upgrade --kubeconfig $KUBECONFIG --install --namespace=overture-qa ego \\
                            //overture/ego --reuse-values --set-string image.tag=${version}-${commit}
                           //"""
                    //}
                //}
            //}
        //}

        //stage('Deploy to overture-staging') {
            //when {
                //branch "master"
            //}
            //steps {
                //container('helm') {
                    //withCredentials([file(credentialsId:'4ed1e45c-b552-466b-8f86-729402993e3b', variable: 'KUBECONFIG')]) {
                        //sh 'env'
                        //sh 'helm init --client-only'
                        //sh "helm ls --kubeconfig $KUBECONFIG"
                        //sh "helm repo add overture https://overture-stack.github.io/charts-server/"
                        //sh """
                            //helm upgrade --kubeconfig $KUBECONFIG --install --namespace=overture-qa ego \\
                            //overture/ego --reuse-values --set-string image.tag=${version}
                           //"""
                    //}
                //}
            //}
        //}
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
