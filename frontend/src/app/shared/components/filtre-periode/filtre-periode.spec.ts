import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrePeriode } from './filtre-periode';

describe('FiltrePeriode', () => {
  let component: FiltrePeriode;
  let fixture: ComponentFixture<FiltrePeriode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrePeriode],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltrePeriode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
