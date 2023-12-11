import { Component, OnInit } from "@angular/core";
import { MovieDatabaseService } from '../../services/movie-database.service';
import { Movie } from '../../shared/interfaces/movie';
import { ApiResponse } from "src/app/shared/interfaces/api-response";
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
movieList: Movie[] = [];
pageSize = 20;
totalResults = 0;
currentPage = 1;
constructor(private moviDbSvc:MovieDatabaseService){ }
      
    ngOnInit(): void {
        this.loadMovies();
        //moviDbSvc.getMovies().subscribe((resp) => { this.movieList = resp});
    }

    loadMovies(): void {
        const apiUrlWithPage = `https://api.themoviedb.org/3/discover/movie?api_key=b74a22ec79c7b7138fb203a5cba89793&with_genres=878|14&language=es-ES&page=${this.currentPage}`;
        this.moviDbSvc.getMovies(apiUrlWithPage).subscribe((resp: ApiResponse) => { 
            this.movieList = resp.results;
            this.totalResults = resp.total_results;
        });
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1;
        this.loadMovies();
    }
}
