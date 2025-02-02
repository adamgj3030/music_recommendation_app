import { TokenData, UserData } from '../types/spotify';

export async function exchangeToken(code: string): Promise<TokenData> {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.REDIRECT_URI!,
  });
  const authHeader = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authHeader}`,
    },
    body: params.toString(),
  });

  if (!tokenResponse.ok) {
    const errorData = await tokenResponse.text();
    throw new Error(`Spotify token exchange failed: ${errorData}`);
  }
  return tokenResponse.json();
}

export async function getUserData(accessToken: string): Promise<UserData> {
  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });
  if (!userResponse.ok) {
    const errorData = await userResponse.text();
    throw new Error(`Failed to fetch user data: ${errorData}`);
  }
  return userResponse.json();
}

export async function fetchTopTracks(authHeader: string, timeRange = 'medium_term') {
  const url = `https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=${timeRange}`;
  const response = await fetch(url, {
    headers: { 'Authorization': authHeader },
  });
  return response.json();
}

export async function fetchTopArtists(authHeader: string, timeRange = 'medium_term') {
  const url = `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`;
  const response = await fetch(url, {
    headers: { 'Authorization': authHeader },
  });
  return response.json();
}

// NEW: Fetch an artist's top track for a given country (default 'US')
export async function fetchArtistTopTrack(authHeader: string, artistId: string, country = 'US') {
  const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`;
  const response = await fetch(url, {
    headers: { 'Authorization': authHeader },
  });
  return response.json();
}
