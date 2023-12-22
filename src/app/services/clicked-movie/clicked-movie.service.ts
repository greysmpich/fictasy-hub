import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickedMovieService {

  constructor() { }

  private clickedMovieIdSubject = new BehaviorSubject<number | null>(null);

  setClickedMovieId(movieId: number): void {
    this.clickedMovieIdSubject.next(movieId);
  }

  getClickedMovieId(): Observable<number | null> {
    return this.clickedMovieIdSubject.asObservable();
  }

}
