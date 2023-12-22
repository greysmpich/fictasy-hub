import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { mockMovieDbSvc } from '../../services/database/mock.movie-database.service';
import { MovieDatabaseService } from '../../services/database/movie-database.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ], 
      providers: [
        { provide: MovieDatabaseService, useValue: mockMovieDbSvc }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should emit genre change on onGenreClick', () => {
    const genre = 'Fantasy';

    component.onGenreClick(genre);

    expect(mockMovieDbSvc.selectedGenre).toBe(genre);
    expect(mockMovieDbSvc.filterGenreChange$.emit).toHaveBeenCalledWith(genre);
    expect(mockMovieDbSvc.setFilterSelectedState).toHaveBeenCalledWith(true);
    expect(mockMovieDbSvc.pageReset$.emit).toHaveBeenCalled();
  });

  it('should clear filters on onAllMoviesClick', () => {
    const genre = 'Fantasy';

    component.onAllMoviesClick();

    expect(mockMovieDbSvc.clearFilters).toHaveBeenCalled();
    expect(mockMovieDbSvc.setFilterSelectedState).toHaveBeenCalledWith(true);
    expect(mockMovieDbSvc.pageReset$.emit).toHaveBeenCalled();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    expect(mockMovieDbSvc.setFilterSelectedState).toHaveBeenCalledWith(true);
    expect(mockMovieDbSvc.clearFilters).toHaveBeenCalled();
  });
});
