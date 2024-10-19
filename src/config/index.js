const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

const ROOT_URL = window.location.href;
const rootUrlRegex = /^http:\/\/(localhost|127\.0\.0\.1):3000(\/\S*)?$/;

let API_URL;
if (rootUrlRegex.test(ROOT_URL)) {
  API_URL = 'http://localhost:3000';
  TEST_URL = 'http://localhost:5000';
} else {
  API_URL = 'https://agrofam-backend-production.up.railway.app';
}

// All the config variables avialable globally
export default {
  uday: " uday ",
  googleOAuthClientID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID || '312651318153-duhu95bpdjuv8vj29nndbo48gfc18lbr.apps.googleusercontent.com',
  environment: ENVIRONMENT,
  apiBaseURL: API_URL
};
