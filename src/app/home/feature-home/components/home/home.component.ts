import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fx-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink],
})
export class HomeComponent {}
