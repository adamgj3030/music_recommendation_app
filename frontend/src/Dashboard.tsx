// frontend/src/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Toolbar,
  AppBar,
} from '@mui/material';

// Types for items
interface ArtistImage {
  url: string;
}

interface Artist {
  id: string;
  name: string;
  images?: ArtistImage[];
}

interface AlbumImage {
  url: string;
}

interface Album {
  id: string;
  images: AlbumImage[];
}

interface TrackArtist {
  name: string;
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: TrackArtist[];
}

const Dashboard: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>('medium_term');

  // Fetch data whenever the timeRange changes
  useEffect(() => {
    // Fetch Top Tracks
    fetch(`http://localhost:5000/api/spotify/top-tracks?time_range=${timeRange}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching top tracks:', data.error.message);
          setTopTracks([]);
        } else {
          setTopTracks(data.items || []);
        }
      })
      .catch((err) => console.error('Error fetching top tracks:', err));

    // Fetch Top Artists
    fetch(`http://localhost:5000/api/spotify/top-artists?time_range=${timeRange}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error('Error fetching top artists:', data.error.message);
          setTopArtists([]);
        } else {
          setTopArtists(data.items || []);
        }
      })
      .catch((err) => console.error('Error fetching top artists:', err));
  }, [timeRange]);

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    setTimeRange(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: '#191414', minHeight: '100vh', color: 'white' }}>
      {/* Optional AppBar for header */}
      <AppBar position="static" sx={{ backgroundColor: '#121212', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Your Spotify Dashboard
          </Typography>
          <FormControl variant="outlined" sx={{ minWidth: 200, backgroundColor: '#191414' }}>
            <InputLabel sx={{ color: 'white' }}>Time Range</InputLabel>
            <Select
              label="Time Range"
              value={timeRange}
              onChange={handleTimeRangeChange}
              sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              }}
            >
              <MenuItem value="short_term">Last 4 Weeks (Short)</MenuItem>
              <MenuItem value="medium_term">Last 6 Months (Medium)</MenuItem>
              <MenuItem value="long_term">All Time (Long)</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* Full-width container without gutters */}
      <Container maxWidth={false} disableGutters sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard – Top Items ({timeRange})
        </Typography>

        {/* Top Tracks Section */}
        <Typography variant="h5" gutterBottom sx={{ marginTop: '1rem' }}>
          Top Tracks
        </Typography>
        {topTracks.length > 0 ? (
          <Grid container spacing={2}>
            {topTracks.map((track) => {
              const albumImage = track.album.images?.[0]?.url;
              const artistNames = track.artists.map((a) => a.name).join(', ');
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={track.id}>
                  <Card sx={{ backgroundColor: '#242424', height: '100%' }}>
                    {albumImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={albumImage}
                        alt={`${track.name} album cover`}
                      />
                    )}
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        {track.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                        {artistNames}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No top tracks available.</Typography>
        )}

        {/* Top Artists Section */}
        <Typography variant="h5" gutterBottom sx={{ marginTop: '2rem' }}>
          Top Artists
        </Typography>
        {topArtists.length > 0 ? (
          <Grid container spacing={2}>
            {topArtists.map((artist) => {
              const artistImage = artist.images?.[0]?.url;
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
                  <Card sx={{ backgroundColor: '#242424', height: '100%' }}>
                    {artistImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={artistImage}
                        alt={`${artist.name} image`}
                      />
                    )}
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ color: 'white' }}>
                        {artist.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography>No top artists available.</Typography>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
