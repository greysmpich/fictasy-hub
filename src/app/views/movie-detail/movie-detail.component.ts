import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails, Movie } from '../../shared/interfaces/movie'
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: number = 0;
  movieDetails: MovieDetails | undefined;
  language = 'es-ES';


  constructor(
    private router: Router,
    private movieDbSvc: MovieDatabaseService,
    private clickedMvSvc: ClickedMovieService
  ) {}

  ngOnInit(): void {
    console.log('MovieDetailComponent ngOnInit called');
    this.clickedMvSvc.getClickedMovieId().subscribe((movieId) => {
      if(movieId){
        this.movieId = movieId;
        this.loadDetails();
        console.log('MovieDetailComponent initialized')
      }
    })
  }

  goBack() {
    this.router.navigate(['/'])
  }

  private loadDetails(): void {
    const apiUrlMovieDetails = this.movieDbSvc.buildApiUrlDetail(this.movieId, this.language);
    this.movieDbSvc.getDetails(apiUrlMovieDetails).subscribe((resp: MovieDetails) => {
      this.movieDetails = resp;
      console.log(resp);
      
    });
  }

  getImageUrl(): string | null {
    return this.movieDbSvc.getImageUrl(this.movieDetails as MovieDetails);
  }
}
