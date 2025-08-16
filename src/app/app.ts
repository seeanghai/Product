import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './component/navbar/navbar';
import {CartComponent} from './component/cart';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // <-- fixed typo here
})
export class App {
  protected readonly title = signal('Sv2_todo-ng');
}
