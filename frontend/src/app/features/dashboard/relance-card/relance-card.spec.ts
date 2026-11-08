import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelanceCard } from './relance-card';

describe('RelanceCard', () => {
  let component: RelanceCard;
  let fixture: ComponentFixture<RelanceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelanceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RelanceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
