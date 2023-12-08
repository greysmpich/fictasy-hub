import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/interfaces/movie'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() movie: Movie | undefined;
constructor(){ }

ngOnInit(): void{ }

getReleaseYear(): string | null {
  if(this.movie?.release_date){
    return new Date(this.movie?.release_date).getFullYear().toString();
  }
  return null;
}

getGenre(): string | null {
  if(this.movie?.genre_ids.includes(878)){
    return 'Ciencia ficción';
  } else if (this.movie?.genre_ids.includes(14)){
    return 'Fantasía';
  }
  return null
}
}
