import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageoisComponent } from './villageois.component';

describe('VillageoisComponent', () => {
  let component: VillageoisComponent;
  let fixture: ComponentFixture<VillageoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageoisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VillageoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
