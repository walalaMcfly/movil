import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('RegisterPage', () => {
  let component: RegistroPage ;
  let fixture: ComponentFixture<RegistroPage >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage ],
      imports: [HttpClientModule]
    })
    fixture = TestBed.createComponent(RegistroPage );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
