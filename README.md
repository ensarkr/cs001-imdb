# cs001-imdb

## About

This case-study is IMDb clone with limited functionality. It uses TMDB api for backend.

## Features

- Popular, top rated movie/tvs can be seen.
- Movie/tv details can be seen.
- Actor credits can be seen.
- Movie/tv and actors can be searched.
- Users can be authenticated via TMDB.
- Users can see recently viewed movie/tvs.
- Users can add movie/tvs to favorites and watchlist.
- Users can remove movie/tvs from favorites and watchlist.
- Users can see their favorites and watchlist.

## Routes

- [Home](https://cs001-imdb.vercel.app/) - See parts of viewable content.
- [Sign In](https://cs001-imdb.vercel.app/signIn) - Sign in via TMDB.
- [Watchlist](https://cs001-imdb.vercel.app/watchlist) - See your watchlist.
- [Favorites](https://cs001-imdb.vercel.app/favorites) - See your favorites.
- Movie/TV Detail - See movie/tv detail.
- Actor Credits - See actor credits.
- Search Page - Search Movie/TV/Actors.
- [Top Picks](https://cs001-imdb.vercel.app/whatToWatch/topPicks) - Popular movies.
- [From your watchlist](https://cs001-imdb.vercel.app/whatToWatch/fromYourWatchlist) - See your watchlist.
- [Top IMDb](https://cs001-imdb.vercel.app/whatToWatch/topIMDb) - Top rated movies.

## Live Demo

https://cs001-imdb.vercel.app/

## To Run Locally

Change VITE_SITE_URL to http://localhost:5173/ in .env file.

```
$ npm install
$ npm run dev
```

After this, app is accessible on http://localhost:5173/

## Technologies

- React
- React Router
- TypeScript

## Case-Study Requirements

Purpose is to develop site similar to IMDb.

- Must be written with react.
- Any UI library or css preprocessor can be used with react.
- TMDB api must be used.
- Homepage must exist.
- Movie detail page must exist
- Search functionality must exist.
- Favorite TMDB api endpoint must be used to add or remove from favorite.
- Component hierarchy and code should be clean.
- Site must be responsive.

Time limit: 6 days
