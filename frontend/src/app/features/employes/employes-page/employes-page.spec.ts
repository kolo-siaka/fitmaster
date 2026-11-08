import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployesPage } from './employes-page';

describe('EmployesPage', () => {
  let component: EmployesPage;
  let fixture: ComponentFixture<EmployesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
