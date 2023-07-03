import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'fx-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink],
})
export class HeaderComponent {}
