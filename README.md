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

- [Home](http://localhost:5173/) - See parts of viewable content.
- [Sign In](http://localhost:5173/signIn) - Sign in via TMDB.
- [Watchlist](http://localhost:5173/watchlist) - See your watchlist.
- [Favorites](http://localhost:5173/favorites) - See your favorites.
- [Movie/TV Detail](http://localhost:5173/movie/920/detail) - See movie/tv detail.
- [Actor Credits](http://localhost:5173/6193/credits) - See actor credits.
- [Search Page](http://localhost:5173/search/batman) - Search Movie/TV/Actors.
- [Top Picks](http://localhost:5173/whatToWatch/topPicks) - Popular movies.
- [From your watchlist](http://localhost:5173/whatToWatch/fromYourWatchlist) - See your watchlist.
- [Top IMDb](http://localhost:5173/whatToWatch/topIMDb) - Top rated movies.

## Live Demo

https://ensarkr.github.io/cs001-imdb/

## To Run Locally

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
