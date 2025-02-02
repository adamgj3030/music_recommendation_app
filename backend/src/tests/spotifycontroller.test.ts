import request from 'supertest';
import app from '../app';

// 1. We'll mock fetchTopTracks and fetchTopArtists from the spotifyService
//    so they return some fake data (to avoid calling real Spotify).
jest.mock('../services/spotifyService', () => ({
  fetchTopTracks: jest.fn().mockResolvedValue({ items: [{ id: 'track1', name: 'Mock Track', artists: [{ name: 'Mock Artist' }] }] }),
  fetchTopArtists: jest.fn().mockResolvedValue({ items: [{ id: 'artist1', name: 'Mock Artist' }] }),
}));

describe('Spotify Controller Tests', () => {
  // We'll define a cookie parser that sets a mock "access_token" cookie
  const testCookie = 'access_token=fake_token_value; Path=/; HttpOnly';

  it('should return top tracks when access_token cookie is present', async () => {
    const res = await request(app)
      .get('/api/spotify/top-tracks')
      .set('Cookie', [testCookie])  // simulate the cookie being sent
      .expect(200);

    // We expect an object with "items"
    expect(res.body).toHaveProperty('items');
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0]).toEqual({
      id: 'track1',
      name: 'Mock Track',
      artists: [{ name: 'Mock Artist' }],
    });
  });

  it('should return top artists when access_token cookie is present', async () => {
    const res = await request(app)
      .get('/api/spotify/top-artists')
      .set('Cookie', [testCookie])
      .expect(200);

    expect(res.body).toHaveProperty('items');
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0]).toEqual({
      id: 'artist1',
      name: 'Mock Artist',
    });
  });

  it('should return 401 when no cookie is provided', async () => {
    const res = await request(app).get('/api/spotify/top-tracks');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: 'No access token provided.' });
  });
});
