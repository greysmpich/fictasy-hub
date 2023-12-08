import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render two elements <p>, one <a> and one <img> inside a <div>', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div')).toBeTruthy();
    expect(compiled.querySelectorAll('p').length).toBe(2);
    expect(compiled.querySelector('a')).toBeTruthy();
    expect(compiled.querySelector('img')).toBeTruthy();
  });

  it('sholud have the correct text in <p> elments', ( )=> {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const allP = compiled.querySelectorAll('p');
    expect(allP[0].textContent).toContain('Página desarrollada por Grecia Mendieta |');
    expect(allP[1].textContent).toContain('| 2023');
  })

  it('sholud have a valid URL in the "src" of the <img> element' , () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.getAttribute('src')).toBe('../../../../assets/images/github.png');
  })

  it('sholud have a valid URL in the "href" of the <a> element' , () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');
    expect(link.getAttribute('href')).toBe('https://github.com/greysmpich');
  })

  it('should have "target" attribute in the link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('should trigger mouse over event', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const link = compiled.querySelector('a');
    
    const mouseOverSpy = jest.spyOn(link, 'dispatchEvent');
  
    const mouseOverEvent = new MouseEvent('mouseover');
    link.dispatchEvent(mouseOverEvent);
  
    expect(mouseOverSpy).toHaveBeenCalledWith(mouseOverEvent);
  });
  
});
