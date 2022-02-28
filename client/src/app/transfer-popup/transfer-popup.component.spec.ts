import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPopupComponent } from './transfer-popup.component';

describe('TransferPopupComponent', () => {
  let component: TransferPopupComponent;
  let fixture: ComponentFixture<TransferPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
