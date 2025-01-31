import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ViajesPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'some-value' } }, 
            queryParams: of({ id: 1 }) 
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
