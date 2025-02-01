# music-recommendation-ap
Music recommendation app integrated with Spotify 

Feature Breakdown:
- User Authentication: Users log in via their Spotify account (using OAuth).
- Data Retrieval: Once logged in, fetch and display their top tracks/artists over various time ranges.
- Recommendation Engine: Allow users to search for music based on a song, artist, or playlist.
- User Interface: Build a responsive, user-friendly UI that displays data clearly.
- Additional Considerations: Consider caching, error handling, and possibly analytics or logging for learning purposes.

Non-Functional Requirements:
- Security: Securely handle OAuth tokens and user data.
- Performance: Fast API responses, efficient data retrieval, and minimal load times.
- Scalability & Maintainability: Code that’s modular and well-documented.

Frontend:
- Language/Framework: TypeScript/React
- Styling: Material UI
- Build Tool: Vite

Backend:
- Language/Framework: TypeScript/Node.js + Express.js
- Environment Management: Dotenv
- Development Tools: Nodemon, ts-node
- Database: PostgreSQL
- Authentication: Spotify OAuth
