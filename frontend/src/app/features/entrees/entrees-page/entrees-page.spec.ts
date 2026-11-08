import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntreesPage } from './entrees-page';

describe('EntreesPage', () => {
  let component: EntreesPage;
  let fixture: ComponentFixture<EntreesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntreesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EntreesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
