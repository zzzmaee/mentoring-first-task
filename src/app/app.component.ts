import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink, RouterOutlet } from '@angular/router';
=======
import { RouterOutlet } from '@angular/router';
>>>>>>> c9f4d5053d7615469afc15de9277ecdae8f8fcb7

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, RouterLink],
=======
  imports: [RouterOutlet],
>>>>>>> c9f4d5053d7615469afc15de9277ecdae8f8fcb7
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';
}
