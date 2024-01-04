import { TestBed } from '@angular/core/testing';

import { ClickedMovieService } from './clicked-movie.service';

describe('ClickedMovieService', () => {
  let service: ClickedMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickedMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get clicked movie ID', () => {
    const movieId = 1206;
    
    service.setClickedMovieId(movieId);

    let result: number | null = null;
    service.getClickedMovieId().subscribe((id) => {
      result = id;
    })

    expect(result).toEqual(movieId);
  });
});
