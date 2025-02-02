import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgeiPagosNotFoundComponent } from './sgei-pagos-not-found.component';

describe('SgeiPagosNotFoundComponent', () => {
  let component: SgeiPagosNotFoundComponent;
  let fixture: ComponentFixture<SgeiPagosNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgeiPagosNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgeiPagosNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
