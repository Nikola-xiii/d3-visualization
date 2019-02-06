import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMapDemoComponent } from './geo-map-demo.component';

describe('GeoMapDemoComponent', () => {
  let component: GeoMapDemoComponent;
  let fixture: ComponentFixture<GeoMapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoMapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoMapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
