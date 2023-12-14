import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
@Output() pageChange = new EventEmitter<number>();

  onPageChange(event: number): void {
    this.pageChange.emit(event);
}
}
