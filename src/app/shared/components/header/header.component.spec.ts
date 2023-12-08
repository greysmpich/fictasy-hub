import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach( async() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    })

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one <img>, one <p> and one <hr> inside a <div>', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div')).toBeTruthy();
    expect(compiled.querySelector('img')).toBeTruthy();
    expect(compiled.querySelector('p')).toBeTruthy();
    expect(compiled.querySelector('hr')).toBeTruthy();
  });

  it('sholud have a valid URL in the "src" of the <img> element' , () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const img: HTMLElement = compiled.querySelector('img');
    expect(img.getAttribute('src')).toBe('../../../../assets/images/fictasy-hub-logo.png');
  })

  it('sholud have the correct text in <p> elment', ( )=> {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const p: HTMLElement = compiled.querySelector('p');
    expect(p.textContent).toContain('Tu portal a nuevos universos');
  })

});
