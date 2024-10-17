import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs";
import { CvService } from "../services/cv.service";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get('search')!;
  }
  form = this.formBuilder.group({ search: [''] });
  /**
   * Le flux des cvs à afficher dans l'autcomplete
   */
  cvs$ = this.search.valueChanges.pipe(
    tap(() => console.log(this.search.value))
  )
  constructor() {}
}
