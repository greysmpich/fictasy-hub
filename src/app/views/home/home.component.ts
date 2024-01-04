import { Component, OnDestroy, OnInit, NgZone } from "@angular/core";
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { Movie } from '../../shared/interfaces/movie';
import { ApiResponse } from "src/app/shared/interfaces/api-response";
import { Router } from '@angular/router';
//import { Subscription } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movieList: Movie[] = [];
  p: number = 1;
  pageSize = 20;
  totalResults = 0;
  genres = '878 | 14';
  option = 'popularity.desc'
  language = 'es-ES';
  selectedGenre: string = '';
  selectedOption: string = '';
  //private subscriptions: Subscription [] = [];

  constructor(
    private movieDbSvc: MovieDatabaseService, 
    private router: Router, 
    private ngZone: NgZone) { }
  
  ngOnInit(): void {
    const currentState = this.movieDbSvc.saveState();
    this.loadMovies(currentState.genre, currentState.option, currentState.page);
    this.subscribeToFilterChanges();
    this.selectedGenre = this.movieDbSvc.selectedGenre;
    this.selectedOption = this.movieDbSvc.selectedOption;
    this.p = this.movieDbSvc.currentPage;
   }

  // ngOnDestroy(): void{
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
  onCardClick(movieId: number) {
    const currentState = this.movieDbSvc.saveState();
    this.ngZone.run(() => {
      this.router.navigate(['/movie-detail', movieId]);
    })
    this.movieDbSvc.restoreState(currentState)    
  }
  
   subscribeToFilterChanges(): void {
    //this.subscriptions.push(
      this.movieDbSvc.filterGenreChange$.subscribe((genre: string) => {
        this.p = 1;
        this.loadMoviesWithFilter(genre, this.option);
      });
      this.movieDbSvc.filterClear$.subscribe(() => {
        this.onClearFilters();
        this.onAllMoviesClick();
      });
      this.movieDbSvc.pageReset$.subscribe(() => {
        this.p = 1;
        this.loadMoviesWithFilter(this.selectedGenre, this.option);
      })
   // );    
  }

  loadMovies(genre: string, option: string, page: number): void {
    const apiUrlWithPage = this.movieDbSvc.buildApiUrl(genre ? genre : this.genres, this.language, page ? page : this.p, option ? option : this.option);
    this.movieDbSvc.getMovies(apiUrlWithPage).subscribe((resp: ApiResponse) => {
      this.movieList = resp.results;
      this.totalResults = 10000;
      this.scrollToTop();
    });
  }

   loadMoviesWithFilter(genre: string, option: string): void {
    this.selectedGenre = genre;
    this.option = option;
    this.loadMovies(this.selectedGenre, this.option, this.p);
  }

  onSortByChange(selectedOption: string): void {
    this.selectedOption = selectedOption;
    if (this.selectedGenre && this.selectedOption){
      this.loadMovies(this.selectedGenre, this.selectedOption, this.p);
    } else {
      this.loadMovies(this.genres, this.selectedOption, this.p);
    }
    this.movieDbSvc.selectedOption = selectedOption;
  }
  
  onPageChange(event: number): void {
    this.p = event;
    if (this.selectedGenre && this.selectedOption) {
      this.loadMovies(this.selectedGenre, this.selectedOption, this.p)
    } else if (this.selectedGenre) {
      this.loadMoviesWithFilter(this.selectedGenre, this.option);
    } else if (this.selectedOption) {
      this.loadMovies(this.genres, this.selectedOption, this.p);
    } else {
      this.loadMovies(this.genres, this.option, this.p);
    }
    this.movieDbSvc.currentPage = this.p;    
  }


  onAllMoviesClick(): void {
  this.onClearFilters();
  this.movieDbSvc.currentPage = 1;
  this.loadMovies(this.genres, this.option, this.movieDbSvc.currentPage);  
  }

  onClearFilters(): void {
    this.selectedGenre = '';
    this.selectedOption = this.option;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
