import request from 'supertest';
import app from '../app';

describe('GET /auth/spotify', () => {
  it('should redirect to Spotify authorization URL', async () => {
    const response = await request(app).get('/auth/spotify');
    // Expect a redirect status code
    expect(response.status).toBe(302);
    // Check that the redirect URL starts with Spotify's authorization endpoint
    expect(response.headers.location).toMatch(/^https:\/\/accounts\.spotify\.com\/authorize/);
  });
});
