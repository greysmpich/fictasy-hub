import { Component, OnInit } from "@angular/core";
import { MovieDatabaseService } from '../../services/movie-database.service';
import { Movie } from '../../shared/interfaces/movie';
import { ApiResponse } from "src/app/shared/interfaces/api-response";

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
  selectedGenre: string = '';
  selectedYear: number = 0;
  genres = ['878', '14'];
  language = 'es-ES';


  constructor(private movieDbSvc: MovieDatabaseService) { }
  ngOnInit(): void {
    this.loadMovies();
    this.subscribeToFilterChanges();
    this.selectedGenre = this.movieDbSvc.selectedGenre;
  }


  loadMovies(): void {
    const apiUrlWithPage = this.movieDbSvc.buildApiUrl(this.genres, this.language, this.p);
    this.movieDbSvc.getMovies(apiUrlWithPage).subscribe((resp: ApiResponse) => {
      this.movieList = resp.results;
      this.totalResults = 10000;
      this.scrollToTop();
    });
  }

  private subscribeToFilterChanges(): void {
    this.movieDbSvc.filterGenreChangeEvent.subscribe((genre: string) => {
      this.loadMoviesWithFilter(genre);
    });
    this.movieDbSvc.filterClearEvent.subscribe(() => {
      this.onClearFilters();
      this.onAllMoviesClick();
    });
  }

  private loadMoviesWithFilter(genre: string): void {
    this.selectedGenre = genre;
    const apiUrlWithPageAndGenre = `https://api.themoviedb.org/3/discover/movie?api_key=b74a22ec79c7b7138fb203a5cba89793&with_genres=${genre}&language=es-ES&page=${this.p}`;
    this.movieDbSvc.getMovies(apiUrlWithPageAndGenre).subscribe((resp: ApiResponse) => {
      this.movieList = resp.results;
      this.totalResults = 10000;
      this.scrollToTop();
    });
  }

  onAllMoviesClick(): void {
    this.p = 1;
    this.onClearFilters();
    this.loadMovies();
  }

  onPageChange(event: number): void {
    this.p = event;
    if (this.selectedGenre) {
      this.loadMoviesWithFilter(this.selectedGenre);
    } else {
      this.loadMovies();
    }
  }

  onClearFilters(): void {
    this.selectedGenre = '';
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
