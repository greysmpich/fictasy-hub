import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    component.onPageChange(1);
    expect(pageChangeSpy).toHaveBeenCalledWith(1);
  });

  it('should emit clearFilters event', () => {
    const clearFiltersSpy = jest.spyOn(component.clearFilters, 'emit');
    component.onClearFilters();
    expect(clearFiltersSpy).toHaveBeenCalled();
  })
});
