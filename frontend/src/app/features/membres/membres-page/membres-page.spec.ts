import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembresPage } from './membres-page';

describe('MembresPage', () => {
  let component: MembresPage;
  let fixture: ComponentFixture<MembresPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembresPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MembresPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
