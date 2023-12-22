import { Movie } from './movie';

export interface ApiResponse {
  results: Movie[];
  total_results: number;
}

