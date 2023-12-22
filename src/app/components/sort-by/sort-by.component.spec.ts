import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortByComponent } from './sort-by.component';
import { mockMovieDbSvc } from '../../services/database/mock.movie-database.service';
import { MovieDatabaseService } from '../../services/database/movie-database.service';


describe('SortByComponent', () => {
  let component: SortByComponent;
  let fixture: ComponentFixture<SortByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortByComponent ],
      providers: [
        { provide: MovieDatabaseService, useValue: mockMovieDbSvc }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and subscribe to isAFilterSelected$', () => {
    expect(mockMovieDbSvc.isAFilterSelected$.subscribe).toHaveBeenCalled();
    if(mockMovieDbSvc.isAFilterSelected$.next(true)){
      expect(component.selectedOption).toBe('popularity.desc');
    } 
  });

  it('should emit sortByChangeEvent on sort change', () => {
    const selectedValue = 'primary_release_date';
    const emitSpy = jest.spyOn(component.sortByChangeEvent, 'emit');
    component.onSortByChange({ target: { value: selectedValue } });
    expect(emitSpy).toHaveBeenCalledWith(selectedValue);
  });
});
