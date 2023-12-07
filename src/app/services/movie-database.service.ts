import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../shared/interfaces/movie'

@Injectable({
  providedIn: 'root'
})
export class MovieDatabaseService {
  
  constructor(private http: HttpClient) { }

  getMovies():Observable<Movie>{
    
    return this.http.get<Movie>('https://api.themoviedb.org/3/discover/movie?api_key=b74a22ec79c7b7138fb203a5cba89793&with_genres=878|14');

  }
}
