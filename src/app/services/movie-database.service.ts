import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { ApiResponse } from '../shared/interfaces/api-response'
//import { Movie } from '../shared/interfaces/movie'

@Injectable({
  providedIn: 'root'
})

export class MovieDatabaseService {
  //private apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=b74a22ec79c7b7138fb203a5cba89793&with_genres=878|14&language=es-ES&page=currentPage';
  constructor(private http: HttpClient) { }

  getMovies(url: string):Observable<ApiResponse>{
    
    return this.http.get<ApiResponse>(url)

  }
}
