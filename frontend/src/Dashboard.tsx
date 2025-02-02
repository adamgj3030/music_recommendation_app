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
  AppBar,
  Toolbar,
  CircularProgress,
} from '@mui/material';

// Extend types to include external_urls for tracks
interface Track {
  id: string;
  name: string;
  album: {
    id: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
  external_urls: { spotify: string };
}

interface Artist {
  id: string;
  name: string;
  images?: { url: string }[];
}

const Dashboard: React.FC = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [timeRange, setTimeRange] = useState<string>('medium_term');
  const [loadingArtist, setLoadingArtist] = useState<string | null>(null); // holds id of artist being fetched

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

  // Handle clicking on a track: open the track's Spotify URL in a new tab.
  const handleTrackClick = (track: Track) => {
    window.open(track.external_urls.spotify, '_blank');
  };

  // Handle clicking on an artist: fetch their top track then open its Spotify URL.
  const handleArtistClick = (artist: Artist) => {
    setLoadingArtist(artist.id);
    fetch(`http://localhost:5000/api/spotify/artist-top-track?artist_id=${artist.id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setLoadingArtist(null);
        if (data.error) {
          console.error('Error fetching artist top track:', data.error);
          alert('Unable to fetch artist top track.');
        } else {
          // Assume data.external_urls.spotify exists on the top track.
          window.open(data.external_urls.spotify, '_blank');
        }
      })
      .catch((err) => {
        setLoadingArtist(null);
        console.error('Error fetching artist top track:', err);
        alert('Error fetching artist top track.');
      });
  };

  return (
    <Box sx={{ backgroundColor: '#191414', minHeight: '100vh', color: 'white' }}>
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
            {topTracks.map((track) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={track.id}>
                <Card
                  sx={{ backgroundColor: '#242424', height: '100%', cursor: 'pointer' }}
                  onClick={() => handleTrackClick(track)}
                >
                  {track.album.images?.[0]?.url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={track.album.images[0].url}
                      alt={`${track.name} album cover`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                      {track.artists.map((a) => a.name).join(', ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
            {topArtists.map((artist) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={artist.id}>
                <Card
                  sx={{ backgroundColor: '#242424', height: '100%', cursor: 'pointer', position: 'relative' }}
                  onClick={() => handleArtistClick(artist)}
                >
                  {artist.images?.[0]?.url && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={artist.images[0].url}
                      alt={`${artist.name} image`}
                    />
                  )}
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ color: 'white' }}>
                      {artist.name}
                    </Typography>
                  </CardContent>
                  {loadingArtist === artist.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress color="inherit" />
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No top artists available.</Typography>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
