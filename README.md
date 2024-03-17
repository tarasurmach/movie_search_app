# Single-Page Movie App
This vanilla TS application leverages core JavaScript features to enable single-page functionality. Key components include:

-   **History API for Navigation**: Seamless navigation between views is achieved using the History API, allowing users to move between pages without full page reloads.

-   **URL Mapping with Hashtable**: URL paths are mapped to corresponding HTML views via a hashtable, ensuring the appropriate content is rendered based on the current URL.

-   **Watchlist Persistence**: The localStorage API is utilized to persist user watchlists, enabling the marking of favorite movies and shows and access to these selections across browser sessions.

-   **TMDB API Integration**: External integration with the TMDB API provides access to movie-related data, including trending lists, overviews, and ratings.

### Features:
**Exploration**
-Discover lists of trending movies and tv shows with brief overview and rating.
**Search**
-Search for both movies and shows by keyword.
**Watchlist**
-You are allowed to mark both movies and shows as liked and access them even after browser restarts.

### Summary:

This Vanilla TypeScript application offers a streamlined user experience for exploring, searching, and managing movie and TV show preferences within a single-page interface. It combines core JavaScript functionality, external API integration, and localStorage for efficient data management and seamless navigation.