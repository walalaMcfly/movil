import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarPassPage } from './recuperar-pass.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa el módulo de pruebas HTTP
import { AuthService } from '../Servicios/auth.service';  // Asegúrate de importar el servicio de autenticación

describe('RecuperarPassPage', () => {
  let component: RecuperarPassPage;
  let fixture: ComponentFixture<RecuperarPassPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarPassPage],
      imports: [HttpClientTestingModule],  // Asegúrate de agregar HttpClientTestingModule aquí
      providers: [AuthService]  // Agrega el servicio AuthService como provider
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
