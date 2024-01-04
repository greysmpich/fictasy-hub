import { of } from 'rxjs';

export const mockMovieDbSvc = {
    filterGenreChange$: { emit: jest.fn(), subscribe: jest.fn() },
    selectedGenre: '',
    filterClear$: { emit: jest.fn(), subscribe: jest.fn() },
    isAFilterSelected: false,
    isAFilterSelected$: { emit: jest.fn(), subscribe: jest.fn(), next: jest.fn() },
    selectedOption: '',
    currentPage: 1,
    pageReset$: { emit: jest.fn(), subscribe: jest.fn() },
    buildApiUrl: jest.fn(),
    getMovies: jest.fn().mockReturnValue(of({ results: [] })),
    clearFilters: jest.fn(),
    setFilterSelectedState: jest.fn(),
    getImageUrl: jest.fn(),
    saveState: jest.fn().mockReturnValue({genre: '', option: '', page: 1}),
    restoreState: jest.fn().mockReturnValue({genre: '', option: '', page: 1})
  };