import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetailComponent } from './home-detail.component';

describe('HomeCreateComponent', () => {
  let component: HomeDetailComponent;
  let fixture: ComponentFixture<HomeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
