import dotenv from 'dotenv';
dotenv.config();

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;

const ROOT_URL = window.location.href;
const rootUrlRegex = /http:\/\/localhost:3000\/*/gm;

let API_URL;
if (rootUrlRegex.test(ROOT_URL)) {
  API_URL = 'http://localhost:5000';
} else {
  API_URL = 'https://agrofam-backend-production.up.railway.app';
}

// All the config variables avialable globally
export default {
  googleOAuthClientID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  environment: ENVIRONMENT,
  apiBaseURL: API_URL
};
