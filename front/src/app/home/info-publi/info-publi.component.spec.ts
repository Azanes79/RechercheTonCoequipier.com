import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPubliComponent } from './info-publi.component';

describe('InfoPubliComponent', () => {
  let component: InfoPubliComponent;
  let fixture: ComponentFixture<InfoPubliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPubliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
