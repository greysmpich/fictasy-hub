import { TestBed } from '@angular/core/testing';
import { MovieDatabaseService } from './movie-database.service';
import { HttpClientModule } from '@angular/common/http';

describe('MovieDatabaseService', () => {
  let service: MovieDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(MovieDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
