import { Component, Inject } from '@angular/core';
import { Logger_Token } from './tokens/logger.token';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  constructor(@Inject(Logger_Token) private myLoggers: LoggerService[]) {
    this.myLoggers.forEach(myLogger => myLogger.logger('cc') )
  }
}
