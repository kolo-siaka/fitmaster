import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementsPage } from './abonnements-page';

describe('AbonnementsPage', () => {
  let component: AbonnementsPage;
  let fixture: ComponentFixture<AbonnementsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
