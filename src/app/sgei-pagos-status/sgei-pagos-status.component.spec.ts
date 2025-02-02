import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgeiPagosStatusComponent } from './sgei-pagos-status.component';

describe('SgeiPagosStatusComponent', () => {
  let component: SgeiPagosStatusComponent;
  let fixture: ComponentFixture<SgeiPagosStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgeiPagosStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgeiPagosStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
