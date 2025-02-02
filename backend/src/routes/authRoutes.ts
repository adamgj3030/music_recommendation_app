import { Router } from 'express';
import Joi from 'joi';
import { spotifyAuth, spotifyCallback } from '../controllers/authController';
import { validateQuery } from '../middleware/validate';

const router = Router();

// Schema to validate the query parameter for the callback route.
const callbackSchema = Joi.object({
  code: Joi.string().required()
});

router.get('/spotify', spotifyAuth);
// Use the validation middleware to ensure the 'code' parameter is provided.
router.get('/spotify/callback', validateQuery(callbackSchema), spotifyCallback);

export default router;