import { Component, OnInit } from "@angular/core";
import { MovieDatabaseService } from '../../services/movie-database.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(private movieSvc:MovieDatabaseService){
        this.movieSvc.getMovies().subscribe(res=>{
          console.log(res);
        })
      }
      
    ngOnInit(): void {
        console.log("Se cargó el componente");
    }
}
