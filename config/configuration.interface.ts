export interface IConfiguration {
  MONGODB_URI: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_COUNT: number;
  FIREBASE_APP_PROJECT_ID: string;
  FIREBASE_APP_PRIVATE_KEY: string;
  FIREBASE_APP_CLIENT_EMAIL: string;
}
