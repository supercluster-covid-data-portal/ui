export const getConfig = () => {
  return {
    EGO_API_ROOT: process.env.NEXT_PUBLIC_EGO_API_ROOT || 'http://localhost:8088',
    EGO_CLIENT_ID: process.env.NEXT_PUBLIC_EGO_CLIENT_ID || '',
    EGO_PUBLIC_KEY:
      process.env.EGO_PUBLIC_KEY ||
      `-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lOqMuPLCVusc6szklNXQL1FHhSkEgR7An+8BllBqTsRHM4bRYosseGFCbYPn8r8FsWuMDtxp0CwTyMQR2PCbJ740DdpbE1KC6jAfZxqcBete7gP0tooJtbvnA6X4vNpG4ukhtUoN9DzNOO0eqMU0Rgyy5HjERdYEWkwTNB30i9I+nHFOSj4MGLBSxNlnuo3keeomCRgtimCx+L/K3HNo0QHTG1J7RzLVAchfQT0lu3pUJ8kB+UM6/6NG+fVyysJyRZ9gadsr4gvHHckw8oUBp2tHvqBEkEdY+rt1Mf5jppt7JUV7HAPLB/qR5jhALY2FX/8MN+lPLmb/nLQQichVQIDAQAB\r\n-----END PUBLIC KEY-----`,
    EGO_GOOGLE_ID: process.env.NEXT_PUBLIC_EGO_GOOGLE_ID || 'google',
    EGO_LINKEDIN_ID: process.env.NEXT_PUBLIC_EGO_LINKEDIN_ID || 'linkedin',
    EGO_FACEBOOK_ID: process.env.NEXT_PUBLIC_EGO_FACEBOOK_ID || 'facebook',
    EGO_GITHUB_ID: process.env.NEXT_PUBLIC_EGO_GITHUB_ID || 'github',
    EGO_ORCID_ID: process.env.NEXT_PUBLIC_EGO_ORCID_ID || 'orcid',
    ARRANGER_PROJECT_ID: process.env.NEXT_PUBLIC_ARRANGER_PROJECT_ID || '',
    ARRANGER_GRAPHQL_FIELD: process.env.NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD || '',
    ARRANGER_INDEX: process.env.NEXT_PUBLIC_ARRANGER_INDEX || '',
  } as {
    EGO_API_ROOT: string;
    EGO_CLIENT_ID: string;
    EGO_PUBLIC_KEY: string;
    EGO_GOOGLE_ID: string;
    EGO_LINKEDIN_ID: string;
    EGO_FACEBOOK_ID: string;
    EGO_GITHUB_ID: string;
    EGO_ORCID_ID: string;
    ARRANGER_PROJECT_ID: string;
    ARRANGER_GRAPHQL_FIELD: string;
    ARRANGER_INDEX: string;
  };
};
