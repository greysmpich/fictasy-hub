import { Component, OnInit } from "@angular/core";
import { MovieDatabaseService } from '../../services/movie-database.service';
import { Movie } from '../../shared/interfaces/movie';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
movieList: Movie[] = [];
constructor(private moviDbSvc:MovieDatabaseService){ }
      
    ngOnInit(): void {
        this.moviDbSvc.getMovies().subscribe((resp) => { this.movieList = resp});
    }
}
