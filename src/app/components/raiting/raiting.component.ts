import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-raiting',
  templateUrl: './raiting.component.html',
  styleUrls: ['./raiting.component.css']
})
export class RaitingComponent {
  @Input() voteAverage?: number;

  get stars(): boolean[] {
    const maxStars = 5;
    const filledStars = (this.voteAverage ?? 0) / 2;

    console.log('filledStars:', filledStars);
    

    return Array.from({ length: maxStars }, (_, index) => index < filledStars);
  }
}
