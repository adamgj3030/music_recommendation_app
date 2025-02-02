import { Router } from 'express';
import { getTopTracks, getTopArtists, getArtistTopTrack } from '../controllers/spotifyController';

const router = Router();

router.get('/top-tracks', getTopTracks);
router.get('/top-artists', getTopArtists);
router.get('/artist-top-track', getArtistTopTrack);

export default router;
