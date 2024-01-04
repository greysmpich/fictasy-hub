import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  constructor( private router: Router, private ngZone: NgZone ) {}

  goBack() {
    this.ngZone.run(() => {
      this.router.navigate(['/home']); 
    })
  }
}

