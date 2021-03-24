import { GitHubLogo, GoogleLogo, LinkedInLogo, OrcidLogo } from '../../components/theme/icons';
import { ProviderType } from '../types';

export type ProviderDetail = {
  displayName: string;
  path: string;
  icon: any;
};

export type ProviderMap = { [k in ProviderType]: ProviderDetail };

const providerMap: ProviderMap = {
  [ProviderType.GOOGLE]: { displayName: 'Google', path: 'google', icon: GoogleLogo },
  [ProviderType.ORCID]: { displayName: 'ORCiD', path: 'orcid', icon: OrcidLogo },
  [ProviderType.GITHUB]: { displayName: 'GitHub', path: 'github', icon: GitHubLogo },
  [ProviderType.LINKEDIN]: { displayName: 'LinkedIn', path: 'linkedin', icon: LinkedInLogo },
  // Facebook will be hidden until provider implementation is fixed in Ego https://github.com/overture-stack/ego/issues/555
  // [ProviderType.FACEBOOK]: { displayName: 'Facebook', path: '', icon: FacebookLogo },
};

export default providerMap;
