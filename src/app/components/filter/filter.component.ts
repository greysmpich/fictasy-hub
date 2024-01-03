import { Component, OnInit } from '@angular/core';
import { MovieDatabaseService } from '../../services/database/movie-database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor(public movieDbSvc: MovieDatabaseService) { }

  ngOnInit(): void { }

  onGenreClick(genre: string): void {
    this.movieDbSvc.selectedGenre = genre;
    this.movieDbSvc.filterGenreChange$.emit(genre);
    this.movieDbSvc.setFilterSelectedState(true);
    //this.movieDbSvc.pageReset$.emit();
  }

  onAllMoviesClick(): void {
    this.movieDbSvc.clearFilters();
    this.movieDbSvc.setFilterSelectedState(true);
    //this.movieDbSvc.pageReset$.emit();
  }
}
