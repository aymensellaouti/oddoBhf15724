import { CanDeactivateFn } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';

export const canLeaveGuard: CanDeactivateFn<TodoComponent> = (component, currentRoute, currentState, nextState) => {
  /**
   * Itha kan essayed bda iekteb
   * bech neselouh thab tokhrej walla la
   *
   * Sinon iethfadhel 3la rou7ou
   *
   */
  if (component.todo.name.trim() || component.todo.content.trim()) {
    return confirm('Are you sure you want to leave');
  }
  return true
};
