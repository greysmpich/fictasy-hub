import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() voteAverage: number = 0;
  private readonly maxStars: number = 5;
  filledStars: number = 0;

  get stars(): number[] {
    return Array(this.maxStars).fill(0);
  }

  ngOnChanges(): void {
    this.filledStars = Math.round((this.voteAverage / 10) * this.maxStars);
  }
}
