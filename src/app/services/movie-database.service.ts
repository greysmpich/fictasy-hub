import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/interfaces/api-response'

@Injectable({
  providedIn: 'root'
})

export class MovieDatabaseService {
  filterGenreChange$ = new EventEmitter<string>();
  selectedGenre: string = '';
  filterClear$ = new EventEmitter<void>();
  isAFilterSelected$ = new EventEmitter<boolean>();
  isAFilterSelected: boolean = false;
  selectedOption: string = '';
  pageReset$ = new EventEmitter<void>();
 
  constructor(private http: HttpClient) { }

  private apiKey = 'b74a22ec79c7b7138fb203a5cba89793';
  private baseUrl = 'https://api.themoviedb.org/3';

  buildApiUrl(genres: string, language: string, page: number, option:string | null): string{
    return `${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=${genres}&language=${language}&page=${page}&sort_by=${option}`
  }

  getMovies(url: string):Observable<ApiResponse>{    
    return this.http.get<ApiResponse>(url)
  }

  clearFilters(): void {
    this.selectedGenre = '';
    this.filterClear$.emit();
  }

  setFilterSelectedState(isSelected: boolean): void {
    this.isAFilterSelected = isSelected;
    this.isAFilterSelected$.emit(isSelected);
  }

}
