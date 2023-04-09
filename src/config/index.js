// import dotenv from 'dotenv';
// dotenv.config();

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

const ROOT_URL = window.location.href;
const rootUrlRegex = /^http:\/\/(localhost|127\.0\.0\.1):3000(\/\S*)?$/;

let API_URL;
if (rootUrlRegex.test(ROOT_URL)) {
  API_URL = 'http://localhost:5000';
} else {
  API_URL = 'https://agrofam-backend-production.up.railway.app';
}

console.log("mode",import.meta.env.MODE)
console.log('google id',import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID)

// All the config variables avialable globally
export default {
  googleOAuthClientID: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
  environment: ENVIRONMENT,
  apiBaseURL: API_URL
};
