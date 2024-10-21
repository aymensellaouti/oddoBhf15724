import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable,  Subscription,  debounce,  debounceTime, distinctUntilChanged, from, switchMap } from "rxjs";
import { CvService } from "../services/cv.service";
import { Router } from "@angular/router";
import { Cv } from "../model/cv.model";
import { APP_API } from "src/app/config/api.config";
import { APP_ROUTES } from "src/app/config/routes.config";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnDestroy {
  form!: FormGroup;
  cvs$!: Observable<Cv[]>;
  subscription!: Subscription;

  constructor(private cvService: CvService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({ name: new FormControl() });
    const nameInput = this.form.controls['name'];
    this.cvs$ = nameInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // les valeurs de l'input a, ay, aym, ayme, aymen
      switchMap((name) => this.cvService.getCvsByName(name))
    );
    this.subscription = this.cvService.selectCv$.subscribe((cv) =>
      this.router.navigate([`/${APP_ROUTES.cv}`, cv.id])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
