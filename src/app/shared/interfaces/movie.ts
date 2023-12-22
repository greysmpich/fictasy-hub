export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  genre_ids: number[];
}

export interface Genres {
  id: number,
  name: string
}

export interface MovieDetails {
  poster_path: string;
  title: string;
  release_date: Date;
  genres: Genres[];
  id: number;
  runtime: number;
  overview: string;
  vote_average: number;
  vote_count: number;
}