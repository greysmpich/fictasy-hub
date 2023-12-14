import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/interfaces/api-response'

@Injectable({
  providedIn: 'root'
})

export class MovieDatabaseService {
  filterChangeEvent = new EventEmitter<string>();
  selectedGenre: string = '';
 
  constructor(private http: HttpClient) { }

  getMovies(url: string):Observable<ApiResponse>{    
    return this.http.get<ApiResponse>(url)
  }
}
