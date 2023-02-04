import dotenv from 'dotenv';
dotenv.config();

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;

let API_URL;
if (ENVIRONMENT === 'DEVELOPMENT') {
  API_URL = 'http://localhost:5000';
} else if (ENVIRONMENT === 'PRODUCTION') {
  API_URL = 'https://notionofnetizen.up.railway.app';
}

// All the config variables avialable globally
export default {
  googleOAuthClientID: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
  environment: ENVIRONMENT,
  apiBaseURL: API_URL
};
