import { Request, Response, NextFunction } from 'express';
import { exchangeToken, getUserData } from '../services/spotifyService';

export const spotifyAuth = (req: Request, res: Response) => {
  const scope = 'user-read-private user-read-email user-top-read';
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.REDIRECT_URI!,
    scope,
  });
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};

export const spotifyCallback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const code = req.query.code as string;
  if (!code) {
    res.status(400).send('Authorization code not provided.');
    return;
  }

  try {
    const tokenData = await exchangeToken(code);
    const userData = await getUserData(tokenData.access_token);

    // Instead of sending tokens via query parameters, set them as HTTP-only cookies.
    res.cookie('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production.
      sameSite: 'strict'
    });
    res.cookie('refresh_token', tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    // Optionally set non-sensitive data (like display_name) in a regular cookie if needed.
    res.cookie('display_name', userData.display_name || '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Redirect to your dashboard without exposing sensitive tokens in the URL.
    res.redirect(`http://localhost:5173/dashboard`);
    return;
  } catch (error) {
    next(error);
  }
};