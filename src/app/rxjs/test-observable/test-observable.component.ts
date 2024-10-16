import { Component, inject, OnDestroy } from "@angular/core";
import { Observable, Subscription, filter, map } from "rxjs";
import { ToastrService } from "ngx-toastr";
// export type nombreOuChaine = number | string;
// export type Status = 'success' | 'completed' | 'failed';
@Component({
  selector: 'app-test-observable',
  templateUrl: './test-observable.component.html',
  styleUrls: ['./test-observable.component.css'],
})
export class TestObservableComponent {
  firstObservable$: Observable<number>;
  toastr = inject(ToastrService);
  constructor(private toaster: ToastrService) {
    this.firstObservable$ = new Observable((observer) => {
      let i = 5;
      const index = setInterval(() => {
        if (!i) {
          observer.complete();
          clearInterval(index);
        }
        observer.next(i--);
      }, 1000);
    });

    this.firstObservable$.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    // setTimeout(() => {
      this.firstObservable$
      .pipe(
        map( valeur => valeur * 3)
      )
      .subscribe({
        next: (data) => {
         this.toastr.info('' + data);
        },
        complete: () => this.toastr.error('BOOOM !!!!!!')
      });
    // }, 3000)
  }
}
