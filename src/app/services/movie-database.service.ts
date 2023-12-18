import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/interfaces/api-response'

@Injectable({
  providedIn: 'root'
})

export class MovieDatabaseService {
  filterGenreChangeEvent = new EventEmitter<string>();
  selectedGenre: string = '';
  filterClearEvent = new EventEmitter<void>();
 
 
  constructor(private http: HttpClient) { }

  private apiKey = 'b74a22ec79c7b7138fb203a5cba89793';
  private baseUrl = 'https://api.themoviedb.org/3';

  buildApiUrl(genres: string[], language: string, page: number): string{
    const genreString = genres.join('|');
    return `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genreString}&language=${language}&page=${page}`
  }

  getMovies(url: string):Observable<ApiResponse>{    
    return this.http.get<ApiResponse>(url)
  }

  clearFilters(): void {
    this.selectedGenre = '';
    this.filterClearEvent.emit();
  }
}
