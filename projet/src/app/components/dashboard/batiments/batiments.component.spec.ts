import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatimentsComponent } from './batiments.component';

describe('BatimentsComponent', () => {
  let component: BatimentsComponent;
  let fixture: ComponentFixture<BatimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatimentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
