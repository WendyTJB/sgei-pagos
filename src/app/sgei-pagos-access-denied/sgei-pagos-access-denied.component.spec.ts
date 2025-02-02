import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgeiPagosAccessDeniedComponent } from './sgei-pagos-access-denied.component';

describe('SgeiPagosAccessDeniedComponent', () => {
  let component: SgeiPagosAccessDeniedComponent;
  let fixture: ComponentFixture<SgeiPagosAccessDeniedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgeiPagosAccessDeniedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgeiPagosAccessDeniedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
