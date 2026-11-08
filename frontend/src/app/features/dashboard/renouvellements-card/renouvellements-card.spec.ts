import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenouvellementsCard } from './renouvellements-card';

describe('RenouvellementsCard', () => {
  let component: RenouvellementsCard;
  let fixture: ComponentFixture<RenouvellementsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenouvellementsCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RenouvellementsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
