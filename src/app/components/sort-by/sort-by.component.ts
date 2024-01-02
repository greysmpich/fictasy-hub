import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieDatabaseService } from '../../services/database/movie-database.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.css']
})
export class SortByComponent implements OnInit {
  @Output() sortByChangeEvent = new EventEmitter<string>();

  private subscriptions: Subscription [] = [];
  selectedOption: string = 'popularity.desc';

  constructor(public movieDbSvc: MovieDatabaseService) { }

  ngOnInit(): void { 
    this.subscriptions.push(
      this.movieDbSvc.isAFilterSelected$.subscribe(isSelected => {
        if(isSelected) {
          this.selectedOption = 'popularity.desc';
          this.sortByChangeEvent.emit(this.selectedOption)
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
