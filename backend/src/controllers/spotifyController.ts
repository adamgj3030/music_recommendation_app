import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  fetchTopTracks,
  fetchTopArtists,
  fetchArtistTopTrack,
} from '../services/spotifyService';

export const getTopTracks: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Cookies on incoming request:', req.cookies);
  const token = req.cookies?.access_token;
  console.log('Extracted access token:', token);

  if (!token) {
    console.log('No token found in cookies');
    res.status(401).json({ error: 'No access token provided.' });
    return;
  }
  
  const timeRange = (req.query.time_range as string) || 'medium_term';

  try {
    const data = await fetchTopTracks(`Bearer ${token}`, timeRange);
    console.log('Fetched top tracks data from Spotify:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks.' });
  }
};

export const getTopArtists: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Cookies on incoming request:', req.cookies);
  const token = req.cookies?.access_token;
  console.log('Extracted access token:', token);

  if (!token) {
    console.log('No token found in cookies');
    res.status(401).json({ error: 'No access token provided.' });
    return;
  }

  const timeRange = (req.query.time_range as string) || 'medium_term';

  try {
    const data = await fetchTopArtists(`Bearer ${token}`, timeRange);
    console.log('Fetched top artists data from Spotify:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching top artists:', error);
    res.status(500).json({ error: 'Failed to fetch top artists.' });
  }
};

export const getArtistTopTrack: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Request for artist top track:', req.query);
  const token = req.cookies?.access_token;
  const artistId = req.query.artist_id as string;
  
  if (!token) {
    res.status(401).json({ error: 'No access token provided.' });
    return;
  }
  if (!artistId) {
    res.status(400).json({ error: 'No artist ID provided.' });
    return;
  }

  try {
    const data = await fetchArtistTopTrack(`Bearer ${token}`, artistId);
    if (data.top_tracks && data.top_tracks.length > 0) {
      res.json(data.top_tracks[0]);
    } else {
      res.status(404).json({ error: 'No top track found for this artist.' });
    }
  } catch (error) {
    console.error('Error fetching artist top track:', error);
    res.status(500).json({ error: 'Failed to fetch artist top track.' });
  }
};
