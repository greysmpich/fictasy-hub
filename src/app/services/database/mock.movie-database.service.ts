  export const mockMovieDbSvc = {
    filterGenreChange$: { emit: jest.fn(), subscribe: jest.fn() },
    selectedGenre: '',
    filterClear$: { emit: jest.fn(), subscribe: jest.fn() },
    isAFilterSelected: false,
    isAFilterSelected$: { emit: jest.fn(), subscribe: jest.fn(), next: jest.fn() },
    selectedOption: '',
    pageReset$: { emit: jest.fn(), subscribe: jest.fn() },
    setFilterSelectedState: jest.fn(),
    clearFilters: jest.fn(),
  };