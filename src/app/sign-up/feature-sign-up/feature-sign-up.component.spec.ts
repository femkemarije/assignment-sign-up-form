import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSignUpComponent } from './feature-sign-up.component';

describe('FeatureSignUpComponent', () => {
  let component: FeatureSignUpComponent;
  let fixture: ComponentFixture<FeatureSignUpComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
