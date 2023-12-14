import { Component, OnInit } from '@angular/core';
import { MovieDatabaseService } from 'src/app/services/movie-database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  constructor(private movieDbSvc: MovieDatabaseService) { }

  ngOnInit(): void {
    
  }

  onGenreClick(genre: string): void {
    this.movieDbSvc.selectedGenre = genre;
    this.movieDbSvc.filterChangeEvent.emit(genre);
  }

  
}
