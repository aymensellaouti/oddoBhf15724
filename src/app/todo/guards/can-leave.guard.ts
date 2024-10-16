import { CanDeactivateFn } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

export const canLeaveGuard: CanDeactivateFn<TodoComponent> = (component, currentRoute, currentState, nextState) => {
  return true;
};
