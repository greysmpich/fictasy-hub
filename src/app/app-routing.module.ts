import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MovieDetailComponent } from './views/movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie-detail/:id', component: MovieDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
