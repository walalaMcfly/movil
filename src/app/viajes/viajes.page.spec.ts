import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Para simular el valor de ActivatedRoute

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViajesPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'some-value' } }, // Simulamos un valor en paramMap
            queryParams: of({ id: 1 }) // O puedes simular otros parámetros
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
