import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
}

interface Artist {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    // Fetch Top Tracks – include credentials so cookies are sent
    fetch('http://localhost:5000/api/spotify/top-tracks', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setTopTracks(data.items || []))
      .catch((err) => console.error('Error fetching top tracks:', err));

    // Fetch Top Artists – include credentials as well
    fetch('http://localhost:5000/api/spotify/top-artists', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setTopArtists(data.items || []))
      .catch((err) => console.error('Error fetching top artists:', err));
  }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="h5" gutterBottom>
        Top Tracks
      </Typography>
      {topTracks.length > 0 ? (
        <List>
          {topTracks.map((track) => (
            <ListItem key={track.id}>
              <ListItemText 
                primary={track.name} 
                secondary={track.artists.map((artist) => artist.name).join(', ')} 
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No top tracks available.</Typography>
      )}

      <Typography variant="h5" gutterBottom>
        Top Artists
      </Typography>
      {topArtists.length > 0 ? (
        <List>
          {topArtists.map((artist) => (
            <ListItem key={artist.id}>
              <ListItemText primary={artist.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No top artists available.</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
