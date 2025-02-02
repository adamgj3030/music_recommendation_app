import Joi from 'joi';
import dotenv from 'dotenv';
import fs from 'fs';

// Load .env file if it exists (ensure .env is in your .gitignore)
if (fs.existsSync('.env')) {
  dotenv.config();
}

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(5000),
  SPOTIFY_CLIENT_ID: Joi.string().required().label('Spotify Client ID'),
  SPOTIFY_CLIENT_SECRET: Joi.string().required().label('Spotify Client Secret'),
  REDIRECT_URI: Joi.string().required().label('Redirect URI'),
}).unknown(true).required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: envVars.PORT,
  spotifyClientId: envVars.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: envVars.SPOTIFY_CLIENT_SECRET,
  redirectUri: envVars.REDIRECT_URI,
};
