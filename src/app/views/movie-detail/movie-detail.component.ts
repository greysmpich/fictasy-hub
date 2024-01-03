import { Component, OnInit, Input } from '@angular/core';
import { MovieDetails, Movie } from '../../shared/interfaces/movie'
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';

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
    private movieDbSvc: MovieDatabaseService,
    private clickedMvSvc: ClickedMovieService
  ) {}

  ngOnInit(): void {
    // console.log('MovieDetailComponent ngOnInit');
    // const savedState = this.movieDbSvc.saveState();
    // console.log(savedState);
    
    // this.movieDbSvc.restoreState(savedState);
    this.clickedMvSvc.getClickedMovieId().subscribe((movieId) => {
      if(movieId){
        this.movieId = movieId;
        this.loadDetails();
        console.log('MovieDetailComponent initialized')
      }
    })
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

  getYear(): string | null {
    if(this.movieDetails?.release_date){
      return new Date(this.movieDetails?.release_date).getFullYear().toString();
    }
    return null;
  }
  
  reverseReleaseDate(): string | null{
    if(this.movieDetails?.release_date){
      const releaseDate: string = this.movieDetails?.release_date.toString();
      const parts: string[] = releaseDate.split('-');
      const reverseReleaseDate: string = `${parts[2]}/${parts[1]}/${parts[0]}`
      
      return reverseReleaseDate
    }
    return null
  }

  minutesToHours(minutes: number): { hours: number, minutes: number} {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return { hours, minutes: remainingMinutes };
  }
}
