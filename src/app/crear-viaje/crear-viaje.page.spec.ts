import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearViajePage } from './crear-viaje.page';

describe('CrearViajePage', () => {
  let component: CrearViajePage;
  let fixture: ComponentFixture<CrearViajePage>;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;  // Ajustar tiempo de espera

    TestBed.configureTestingModule({
      declarations: [CrearViajePage],
      // Otros proveedores necesarios
    }).compileComponents();

    fixture = TestBed.createComponent(CrearViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
