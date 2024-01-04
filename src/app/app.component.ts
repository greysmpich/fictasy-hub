import { Component } from '@angular/core';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [HomeComponent],
})
export class AppComponent {
  title = 'fictasy-hub'; 

  constructor() { }

  ngOnInit(): void {
  }
  
}
