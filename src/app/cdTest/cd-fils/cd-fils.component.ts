import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ConnectedUserDto } from 'src/app/auth/dto/connected-user.dto.ts';

@Component({
  selector: 'app-cd-fils',
  templateUrl: './cd-fils.component.html',
  styleUrls: ['./cd-fils.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CdFilsComponent {
  @Input() name = '';
  @Input() user: ConnectedUserDto = {
    id: 1,
    email: 'aymen@gmail.com',
  };
}
