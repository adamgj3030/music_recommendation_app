import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');

  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    if (accessToken) {
      // Fetch Top Tracks
      fetch('http://localhost:5000/api/spotify/top-tracks', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTopTracks(data.items || []))
        .catch((err) => console.error('Error fetching top tracks:', err));

      // Fetch Top Artists
      fetch('http://localhost:5000/api/spotify/top-artists', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTopArtists(data.items || []))
        .catch((err) => console.error('Error fetching top artists:', err));
    }
  }, [accessToken]);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Top Tracks
      </Typography>
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
      <Typography variant="h5" gutterBottom>
        Top Artists
      </Typography>
      <List>
        {topArtists.map((artist) => (
          <ListItem key={artist.id}>
            <ListItemText primary={artist.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;