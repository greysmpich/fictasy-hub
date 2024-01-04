import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetails } from '../../shared/interfaces/movie';
import { of } from 'rxjs';

const mockMovieDetails: MovieDetails = {
  poster_path: '/poster.jpg',
  title: 'Mock movie',
  release_date: new Date('2024/01/03') || null,
  genres: [
   { id: 878, name: 'Science Fiction' } ,
   { id: 14, name: 'Fantasy'}
  ],
  id: 1132,
  runtime: 120,
  overview:'This is a mock overview',
  vote_average: 8.5,
  vote_count: 2000,
}

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ MovieDetailComponent, BackButtonComponent, RatingComponent ],
      providers: [ MovieDatabaseService, ClickedMovieService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load details when movieId is provided', () => {
    const movieDbSvc = TestBed.inject(MovieDatabaseService);
    const clickedMovieSvc = TestBed.inject(ClickedMovieService);

    jest.spyOn(clickedMovieSvc, 'getClickedMovieId').mockReturnValue(of(mockMovieDetails.id));
    jest.spyOn(movieDbSvc, 'getDetails').mockReturnValue(of( mockMovieDetails ))

    component.ngOnInit();

    expect(component.movieId).toEqual(1132);
    expect(movieDbSvc.getDetails).toHaveBeenCalled();

  })

  it('should return the correct image URL when movieDetails is defined', () => {
   
    component.movieDetails = mockMovieDetails;
    const imageUrl = component.getImageUrl();

    const expectedImageUrl = `https://image.tmdb.org/t/p/w300/${component.movieDetails.poster_path}`

    expect(imageUrl).toEqual(expectedImageUrl);

  })

  it('should return the correct year when movieDetails is defined', () => {
   
    component.movieDetails = mockMovieDetails;
    const year = component.getYear();

    expect(year).toEqual('2024');

  })

  it('should return Null when release date is not available', () => {
   
    component.movieDetails = {...mockMovieDetails, release_date: null };
    const year = component.getYear();

    expect(year).toBeNull();

  })

  it('should return the date formatted in reverse starting with dd/mm/yyyy', () => {
   
    component.movieDetails = mockMovieDetails;
    const reverseReleaseDate = component.reverseReleaseDate();

    expect(reverseReleaseDate).toBeTruthy();
  })

  it('should return Null when release date is not available', () => {
   
    component.movieDetails = {...mockMovieDetails, release_date: null };
    const reverseReleaseDate = component.reverseReleaseDate();

    expect(reverseReleaseDate).toBeNull();

  })

  it('should return the runtime in hours and minutes', () => {
   
    component.movieDetails = mockMovieDetails;
    const minutesAndHours = component.minutesToHours(mockMovieDetails.runtime);

    expect(minutesAndHours).toEqual({ hours: 2, minutes: 0 });

  })
});
