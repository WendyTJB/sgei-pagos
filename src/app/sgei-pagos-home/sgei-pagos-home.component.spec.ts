import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgeiPagosHomeComponent } from './sgei-pagos-home.component';

describe('SgeiPagosHomeComponent', () => {
  let component: SgeiPagosHomeComponent;
  let fixture: ComponentFixture<SgeiPagosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgeiPagosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgeiPagosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
