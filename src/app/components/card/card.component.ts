import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/interfaces/movie';
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() movie: Movie | undefined;
constructor(
  private movieDbSvc: MovieDatabaseService,
  private clickedMvSvc: ClickedMovieService
  ){ }

ngOnInit(): void{ }

getReleaseYear(): string | null {
  if(this.movie?.release_date){
    return new Date(this.movie?.release_date).getFullYear().toString();
  }
  return null;
}

getGenre(): string | null {
  const hasSciFi = this.movie?.genre_ids.includes(878);
  const hasFantasy = this.movie?.genre_ids.includes(14);

  if(hasSciFi && hasFantasy){
    const sciFiIndex = this.movie?.genre_ids.indexOf(878) || 0;
    const fantasyIndex = this.movie?.genre_ids.indexOf(14) || 0;

    if(sciFiIndex < fantasyIndex){
      return 'Ciencia ficción y Fantasía'
    } else {
      return 'Fantasía y Ciencia ficción'
    }
  }
  else if(hasSciFi){
    return 'Ciencia ficción';
  } else if (hasFantasy){
    return 'Fantasía';
  }
  return null
}

getImageUrl(): string | null {
  return this.movieDbSvc.getImageUrl(this.movie as Movie);
}

onCardClick(): void {
  if (this.movie && this.movie.id) {
    this.clickedMvSvc.setClickedMovieId(this.movie.id);
    console.log('Card clicked', this.movie.id);
  }
}

}
