import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../../shared/interfaces/movie';

const mockMovie: Movie = {
  poster_path: 'ruta/poster.png', 
  title: 'Prueba',
  release_date: '2023-12-12', 
  genre_ids: [14], 
  id: 121223,
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CardComponent ],
      providers: [ MovieDatabaseService, ClickedMovieService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return release year', () => {
    component.movie = mockMovie;

    expect(component.getReleaseYear()).toEqual('2023');
  })

  it('should return null for missing release date', () => {
    component.movie = {...mockMovie, release_date: null };

    expect(component.getReleaseYear()).toBeNull();
  })

  it('should return "Ciencia ficción" for id 878', () => {
    component.movie = {...mockMovie, genre_ids: [878] };

    expect(component.getGenre()).toEqual('Ciencia ficción');
  })

  it('should return "Fantasía" for id 14', () => {
    component.movie = mockMovie;
    
    expect(component.getGenre()).toEqual('Fantasía');
  })

  it('should return null for empty array of genre id', () => {
    component.movie = {...mockMovie, genre_ids: [] };

     expect(component.getGenre()).toBeNull();
  })

  it('should return null for an unknown genre', () => {
    component.movie = {...mockMovie, genre_ids: [123] };

    expect(component.getGenre()).toBeNull();
  })

  it('should return "Ciencia ficción y Fantasía" if the movie includes both genres but appers first the sci-fi id in the genre-ids array', () => {
    component.movie = {...mockMovie, genre_ids: [878, 14] };

    expect(component.getGenre()).toEqual('Ciencia ficción y Fantasía');
  })

  it('should return "Fantasía y Ciencia ficción" if the movie includes both genres but appers first the fantasy id  in the genre-ids array', () => {
    component.movie = {...mockMovie, genre_ids: [14, 878] };

    expect(component.getGenre()).toEqual('Fantasía y Ciencia ficción');
  })

  it('should return a the poster path if exist in the api', () => {
    component.movie = mockMovie;
    const imageUrl = component.getImageUrl();

    const expectedImageUrl = `https://image.tmdb.org/t/p/w300/${component.movie.poster_path}`

    expect(imageUrl).toEqual(expectedImageUrl);

  })
  
  it('should return a default image path if the api throw an error for the poster path', () => {
    component.movie = {...mockMovie, poster_path: '' };
    const imageUrl = component.getImageUrl();

    const expectedImageUrl = '../../../assets/images/image-not-available.png'

    expect(imageUrl).toEqual(expectedImageUrl);
  })

  it('should call setClickedMovieId and log message on onCardClick', () => {
   const clickedMvSvc = TestBed.inject(ClickedMovieService);
    component.movie = mockMovie;
    
    const setClickedMovieIdSpy = jest.spyOn(clickedMvSvc, 'setClickedMovieId');

    component.onCardClick();

    expect(setClickedMovieIdSpy).toHaveBeenLastCalledWith(component.movie.id);
  })
 
});
