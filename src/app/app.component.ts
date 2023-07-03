import { Component } from '@angular/core';
import { FeatureSignUpComponent } from './sign-up/feature-sign-up/feature-sign-up.component';
import { HeaderComponent } from "./core/components/header/header.component";

@Component({
  selector: 'fx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [FeatureSignUpComponent, HeaderComponent],
})
export class AppComponent {}
