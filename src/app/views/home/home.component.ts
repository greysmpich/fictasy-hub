import { Component, OnDestroy, OnInit } from "@angular/core";
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
  p = 1;
  pageSize = 20;
  totalResults = 0;
  genres = '878 | 14';
  option = 'popularity.desc'
  language = 'es-ES';
  selectedGenre: string = '';
  selectedOption: string = '';
  //private subscriptions: Subscription [] = [];

  constructor(private movieDbSvc: MovieDatabaseService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadMovies(this.genres, this.option);
    this.subscribeToFilterChanges();
    this.selectedGenre = this.movieDbSvc.selectedGenre;
    this.selectedOption = this.movieDbSvc.selectedOption;
   }

  // ngOnDestroy(): void{
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
  onCardClick(movieId: number) {
    this.router.navigate(['/movie-detail', movieId]);
  }
  
  private subscribeToFilterChanges(): void {
    //this.subscriptions.push(
      this.movieDbSvc.filterGenreChange$.subscribe((genre: string) => {
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

  private loadMovies(genre: string, option: string): void {
    const apiUrlWithPage = this.movieDbSvc.buildApiUrl(genre ? genre : this.genres, this.language, this.p, option ? option : this.option);
    this.movieDbSvc.getMovies(apiUrlWithPage).subscribe((resp: ApiResponse) => {
      this.movieList = resp.results;    
      this.totalResults = 10000;
      this.scrollToTop();
    });
  }

  private loadMoviesWithFilter(genre: string, option: string): void {
    this.selectedGenre = genre;
    this.option = option;
    this.loadMovies(this.selectedGenre, this.option);
  }

  onSortByChange(selectedOption: string): void {
    this.selectedOption = selectedOption;
    if (this.selectedGenre && this.selectedOption){
      this.loadMovies(this.selectedGenre, this.selectedOption);
    } else {
      this.loadMovies(this.genres, this.selectedOption);
    }
  }
  
  onPageChange(event: number): void {
    this.p = event;
    if (this.selectedGenre) {
      this.loadMoviesWithPagination(this.selectedGenre, this.selectedOption);
    } else {
      this.loadMoviesWithPagination(this.genres, this.selectedOption);
    }
  }

  private loadMoviesWithPagination(genre: string, option: string): void {
    this.selectedGenre = genre;
    this.selectedOption = option;
    if (this.selectedGenre && this.selectedOption) {
      this.loadMovies(this.selectedGenre, this.selectedOption);
    } else {
      this.loadMovies(this.genres, this.selectedOption)
    }
  }
  onAllMoviesClick(): void {
    this.p = 1;
    this.onClearFilters();
    this.loadMovies(this.genres, this.option);
  }

  onClearFilters(): void {
    this.selectedGenre = '';
    this.selectedOption = this.option;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
