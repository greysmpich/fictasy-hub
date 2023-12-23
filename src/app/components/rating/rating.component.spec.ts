import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate filledStars on ngOnChanges', () => {
    component.voteAverage = 7;
    component.maxStars = 5;

    component.ngOnChanges();

    expect(component.filledStars).toEqual(Math.round((component.voteAverage / 10) * component.maxStars));
  });

  
  it('should calculate filledStars on ngOnChanges', () => {
    component.maxStars = 5;
    const starsArray = component.stars;

    expect(starsArray.length).toEqual(component.maxStars);
    expect(starsArray.every((value) => value === 0)).toBe(true);
  });

});
