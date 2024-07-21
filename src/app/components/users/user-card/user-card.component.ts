import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({required: true}) user!: User;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<User>()

  public userDelete(): void {
    this.deleteEvent.emit(this.user.id)
  }

  public userEdit(): void {
    this.editEvent.emit(this.user)
  }
}
