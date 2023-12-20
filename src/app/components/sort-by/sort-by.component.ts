import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDatabaseService } from 'src/app/services/movie-database.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {
  @Output() sortByChangeEvent = new EventEmitter<string>();

  private subscriptions: Subscription [] = [];
  selectedOption: string = '';

  constructor(public movieDbSvc: MovieDatabaseService) { }

  ngOnInit(): void { 
    this.selectedOption = 'popularity.desc';
    this.subscriptions.push(
      this.movieDbSvc.isAFilterSelected$.subscribe(isSelected => {
        if(isSelected) {
          this.selectedOption = 'popularity.desc';
        }
      })
    )
  }

  onSortByChange(event: any): void {
    const selectedValue = event?.target?.value;
    if(selectedValue){
      this.sortByChangeEvent.emit(selectedValue);
    }
  }
}
