import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieDatabaseService } from 'src/app/services/movie-database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  p = 1;
  genres = ['878', '14'];
  language = 'es-ES';

  constructor(public movieDbSvc: MovieDatabaseService) { }

  years: number[] = [];

  ngOnInit(): void {
    const apiUrlWithPage = this.movieDbSvc.buildApiUrl(this.genres, this.language, this.p);
  }

  onGenreClick(genre: string): void {
    this.movieDbSvc.selectedGenre = genre;
    this.movieDbSvc.filterGenreChangeEvent.emit(genre);
  }

  onAllMoviesClick(): void {
    this.movieDbSvc.clearFilters();
  }
}
