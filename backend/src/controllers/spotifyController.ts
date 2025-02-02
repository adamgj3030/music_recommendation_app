import { Request, Response } from 'express';
import { fetchTopTracks, fetchTopArtists } from '../services/spotifyService';

export const getTopTracks = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || `Bearer ${req.query.access_token}`;
  if (!authHeader) {
    res.status(401).json({ error: 'No access token provided.' });
    return;
  }
  try {
    const data = await fetchTopTracks(authHeader);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top tracks.' });
  }
};

export const getTopArtists = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization || `Bearer ${req.query.access_token}`;
  if (!authHeader) {
    res.status(401).json({ error: 'No access token provided.' });
    return;
  }
  try {
    const data = await fetchTopArtists(authHeader);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top artists.' });
  }
};

