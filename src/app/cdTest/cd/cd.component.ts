import { Component } from '@angular/core';
import { ConnectedUserDto } from 'src/app/auth/dto/connected-user.dto.ts';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.css'],
})
export class CdComponent {
  name = 'aymen';
  user: ConnectedUserDto = {
    id: 1,
    email: 'aymen@gmail.com',
  };

  changeUser(newEmail: string) {
    this.user = {
      ...this.user,
      email: newEmail
    }
  }
}
