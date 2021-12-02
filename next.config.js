const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    NEXT_PUBLIC_AUTH_API_ROOT: process.env.NEXT_PUBLIC_AUTH_API_ROOT,
    NEXT_PUBLIC_AUTH_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    NEXT_PUBLIC_AUTH_REDIRECT_URI: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URI,
    NEXT_PUBLIC_AUTH_SCOPES: process.env.NEXT_PUBLIC_AUTH_SCOPES,
    NEXT_PUBLIC_SESSION_TOKEN_KEY: process.env.NEXT_PUBLIC_SESSION_TOKEN_KEY,
    NEXT_PUBLIC_ARRANGER_API_URL: process.env.NEXT_PUBLIC_ARRANGER_API_URL,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: process.env.NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX: process.env.NEXT_PUBLIC_ARRANGER_INDEX,
    NEXT_PUBLIC_ARRANGER_ADMIN_UI: process.env.NEXT_PUBLIC_ARRANGER_ADMIN_UI_URL,
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: process.env.NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS || '',
    // using ASSET_PREFIX for the public runtime BASE_PATH because basePath in the top level config was not working
    // with the dms reverse proxy setup
    NEXT_PUBLIC_BASE_PATH: process.env.ASSET_PREFIX,
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    NEXT_PUBLIC_DOMAIN_ROOT_URL: process.env.NEXT_PUBLIC_DOMAIN_ROOT_URL,
    NEXT_PUBLIC_LAB_NAME: process.env.NEXT_PUBLIC_LAB_NAME,
    NEXT_PUBLIC_LOGO_FILENAME: process.env.NEXT_PUBLIC_LOGO_FILENAME,
    NEXT_PUBLIC_SSO_PROVIDERS: process.env.NEXT_PUBLIC_SSO_PROVIDERS,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_DEBUG: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_DEBUG,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT: process.env.NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT,
  },
  assetPrefix: process.env.ASSET_PREFIX || '',
});
