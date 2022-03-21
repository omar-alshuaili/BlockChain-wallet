import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellAndBuyComponent } from './sell-and-buy.component';

describe('SellAndBuyComponent', () => {
  let component: SellAndBuyComponent;
  let fixture: ComponentFixture<SellAndBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellAndBuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellAndBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
