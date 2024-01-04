import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { mockMovieDbSvc } from '../../services/database/mock.movie-database.service';
import { MovieDatabaseService } from '../../services/database/movie-database.service';
import { ClickedMovieService } from '../../services/clicked-movie/clicked-movie.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterComponent } from '../../components/filter/filter.component';
import { SortByComponent } from '../../components/sort-by/sort-by.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, NgxPaginationModule, FormsModule, RouterTestingModule],
            declarations: [HomeComponent, FilterComponent, SortByComponent, PaginatorComponent],
            providers: [
                { provide: MovieDatabaseService, useValue: mockMovieDbSvc },
                ClickedMovieService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call saveState and loadMovies on ngOnInit', () => {
        const currentState = { genre: '', option: 'popularity.desc', page: 1 };
        mockMovieDbSvc.saveState.mockReturnValue(currentState);

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });

        component.ngOnInit();

        expect(mockMovieDbSvc.saveState).toHaveBeenCalled();
        expect(component.loadMovies).toHaveBeenCalledWith('', 'popularity.desc', 1);
    });

    it('should call navigate and restoreState on onCardClick', () => {
        const navigateSpy = jest.spyOn(router, 'navigate');
        const testMovieId = 1422;
        const currentState = { genre: 'Fantasy', option: 'primary_release_date.desc', page: 5 };
        
        mockMovieDbSvc.saveState.mockReturnValue(currentState);

        component.onCardClick(testMovieId);

        expect(mockMovieDbSvc.saveState).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(['/movie-detail', testMovieId]);
        expect(mockMovieDbSvc.restoreState).toHaveBeenCalledWith(currentState);
    });

    it('should loadMovies whith selectedGenre on loadMoviesWithfilter', () => {
        component.selectedGenre = '14';
        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });

        component.loadMoviesWithFilter(component.selectedGenre, component.option)

        expect(component.loadMovies).toHaveBeenCalledWith(component.selectedGenre, component.option, component.p);
    })

    it('should load movies with filter when changing page with selected genre and selected option onPageChange', () => {
        component.selectedGenre = '878';
        component.selectedOption = 'primary_release_date.asc';

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        

        component.onPageChange(5);

        expect(component.loadMovies).toHaveBeenCalledWith(component.selectedGenre, component.selectedOption, 5);
        expect(mockMovieDbSvc.currentPage).toBe(5);
    })

    it('should load movies with filter when changing page with selected genre onPageChange', () => {
        component.selectedGenre = '878';

        jest.spyOn(component, 'loadMoviesWithFilter').mockImplementation(() => { });
        

        component.onPageChange(3);

        expect(component.loadMoviesWithFilter).toHaveBeenCalledWith(component.selectedGenre, component.option);
        expect(mockMovieDbSvc.currentPage).toBe(3);
    })

    it('should load movies with filter when changing page with selected option onPageChange', () => {
        component.selectedOption = 'primary_release_date.asc';

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        

        component.onPageChange(4);

        expect(component.loadMovies).toHaveBeenCalledWith(component.genres, component.selectedOption, 4);
        expect(mockMovieDbSvc.currentPage).toBe(4);
    })

    it('should load movies when changing page without filters onPageChange', () =>{
        component.selectedGenre = '';
        component.selectedOption = '';

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        
        component.onPageChange(2);

        expect(component.loadMovies).toHaveBeenCalledWith(component.genres, component.option, 2);
        expect(mockMovieDbSvc.currentPage).toBe(2);
    })

    it('should load movies with sort option selected onSortByChange', () => {
        component.selectedOption = 'primary_release_date.asc';

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        

        component.onSortByChange(component.selectedOption);

        expect(component.loadMovies).toHaveBeenCalledWith(component.genres, component.selectedOption, component.p);
        expect(mockMovieDbSvc.selectedOption).toBe('primary_release_date.asc');
    })

    it('should load movies with sort option selected and genre selected onSortByChange', () => {
        component.selectedOption = 'primary_release_date.asc';
        component.selectedGenre = mockMovieDbSvc.selectedGenre = '14';

        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        

        component.onSortByChange(component.selectedOption);

        expect(component.loadMovies).toHaveBeenCalledWith(component.selectedGenre, component.selectedOption, component.p);
        expect(mockMovieDbSvc.selectedOption).toBe('primary_release_date.asc');
        expect(mockMovieDbSvc.selectedGenre).toBe('14');
    })

    it('should call clear filters, return to page 1 and call loadMovies on onAllMoviesClick', () => {
        const currentPage = mockMovieDbSvc.currentPage = 1;

        jest.spyOn(component, 'onClearFilters').mockImplementation(() => { });
        jest.spyOn(component, 'loadMovies').mockImplementation(() => { });
        
        component.onAllMoviesClick();
        
        expect(component.onClearFilters).toHaveBeenCalled();
        expect(component.loadMovies).toHaveBeenCalledWith(component.genres, component.option, currentPage);
        
    });

    it('should clear filters and sort option on onClearFilters', () => {
        component.onClearFilters();

        expect(component.selectedGenre).toEqual('');
        expect(component.selectedOption).toEqual('popularity.desc');
    });

});
