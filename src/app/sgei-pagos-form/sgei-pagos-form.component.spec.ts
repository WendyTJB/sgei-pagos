import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgeiPagosFormComponent } from './sgei-pagos-form.component';

describe('SgeiPagosFormComponent', () => {
  let component: SgeiPagosFormComponent;
  let fixture: ComponentFixture<SgeiPagosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgeiPagosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgeiPagosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
