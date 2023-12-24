import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from './back-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackButtonComponent ],
      imports: [RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to Home when goBack is called', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
