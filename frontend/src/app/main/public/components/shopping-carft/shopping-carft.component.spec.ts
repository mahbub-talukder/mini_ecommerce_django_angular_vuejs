import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCarftComponent } from './shopping-carft.component';

describe('ShoppingCarftComponent', () => {
  let component: ShoppingCarftComponent;
  let fixture: ComponentFixture<ShoppingCarftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCarftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCarftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
