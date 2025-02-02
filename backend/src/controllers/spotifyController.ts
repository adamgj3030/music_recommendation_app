import { Request, Response, NextFunction, RequestHandler } from 'express';
import { fetchTopTracks, fetchTopArtists } from '../services/spotifyService';

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