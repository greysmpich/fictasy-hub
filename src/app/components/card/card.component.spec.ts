import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
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
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster.png', 
      title: 'Prueba',
      release_date: '2023-12-12', 
      genre_ids: [14], 
      id: 121223,
      overview: 'Esta es una prueba',
      vote_average: 9.2
     }

     expect(component.getReleaseYear()).toEqual('2023');
  })

  it('should return null for missing release date', () => {
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster.png', 
      title: 'Prueba',
      release_date: '', 
      genre_ids: [14], 
      id: 231212,
      overview: 'Esta es una prueba',
      vote_average: 9.2
     }

     expect(component.getReleaseYear()).toBeNull();
  })

  it('should return "Ciencia ficción" for id 878', () => {
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster2.png', 
      title: 'Prueba2',
      release_date: '2024-01-01', 
      genre_ids: [878], 
      id: 240101,
      overview: 'Esta es una prueba',
      vote_average: 9.9
     }

     expect(component.getGenre()).toEqual('Ciencia ficción');
  })

  it('should return "Fantasía" for id 14', () => {
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster.png', 
      title: 'Prueba',
      release_date: '23-12-12', 
      genre_ids: [14], 
      id: 121223,
      overview: 'Esta es una prueba',
      vote_average: 9.2
     }

     expect(component.getGenre()).toEqual('Fantasía');
  })

  it('should return null for empty array of genre id', () => {
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster3.png', 
      title: 'Prueba3',
      release_date: '', 
      genre_ids: [], 
      id: 0,
      overview: 'Esta es una prueba',
      vote_average: 0.2
     }

     expect(component.getGenre()).toBeNull();
  })

  it('should return null for an unknown genre', () => {
    const component = new CardComponent();
    component.movie = { 
      poster_path: 'ruta/poster4.png', 
      title: 'Prueba4',
      release_date: '', 
      genre_ids: [123], 
      id: 501236,
      overview: 'Esta es una prueba',
      vote_average: 0.2
     }

     expect(component.getGenre()).toBeNull();
  })
});
