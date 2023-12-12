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

constructor(private moviDbSvc:MovieDatabaseService){ }
      
    ngOnInit(): void {
        this.loadMovies();
    }

    loadMovies(): void {
        const apiUrlWithPage = `https://api.themoviedb.org/3/discover/movie?api_key=b74a22ec79c7b7138fb203a5cba89793&with_genres=878|14&language=es-ES&page=${this.p}`;
        this.moviDbSvc.getMovies(apiUrlWithPage).subscribe((resp: ApiResponse) => { 
            this.movieList = resp.results;
            this.totalResults = resp.total_results;
            this.scrollToTop();
        });
    }

    onPageChange(event: number): void {
        this.p = event;
        this.loadMovies();
    }

    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
}
