import { Router } from 'express';
import { getTopTracks, getTopArtists } from '../controllers/spotifyController';

const router = Router();

router.get('/top-tracks', getTopTracks);
router.get('/top-artists', getTopArtists);

export default router;