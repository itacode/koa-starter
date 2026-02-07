import dotenv from 'dotenv';
import path from 'path';

/**
 * Load environment variables from .env* files
 */
function loadEnv() {
  // Adopt this convention https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  // Inspired by https://pkg.go.dev/github.com/joho/godotenv#readme-precedence-conventions
  // Use PLATFORM to specify the configuration profile, otherwise fallback to NODE_ENV
  const appEnv = process.env.PLATFORM || process.env.NODE_ENV || 'production';

  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${appEnv}.local`),
  });
  if (appEnv != 'test') {
    dotenv.config({
      path: path.resolve(process.cwd(), '.env.local'),
    });
  }
  dotenv.config({
    path: path.resolve(process.cwd(), `.env.${appEnv}`),
  });

  // The Original .env
  dotenv.config();
}

export { loadEnv };
