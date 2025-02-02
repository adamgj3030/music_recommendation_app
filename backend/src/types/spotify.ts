// backend/src/types/spotify.ts

export interface TokenData {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }
  
  export interface UserData {
    display_name: string;
    id: string;
    // Add any other fields returned by the Spotify API as needed.
  }
  