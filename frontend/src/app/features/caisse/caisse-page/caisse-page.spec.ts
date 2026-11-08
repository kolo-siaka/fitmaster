import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaissePage } from './caisse-page';

describe('CaissePage', () => {
  let component: CaissePage;
  let fixture: ComponentFixture<CaissePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaissePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CaissePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
