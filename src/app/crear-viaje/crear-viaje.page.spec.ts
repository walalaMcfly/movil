import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearViajePage } from './crear-viaje.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrearViajePage', () => {
  let component: CrearViajePage;
  let fixture: ComponentFixture<CrearViajePage>;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;  

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CrearViajePage],
      
    }).compileComponents();

    fixture = TestBed.createComponent(CrearViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
