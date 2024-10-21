import { Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { tap, filter, catchError, EMPTY } from "rxjs";
import { APP_ROUTES } from "src/config/routes.config";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { APP_CONSTANTES } from "src/app/config/app_const.config";
import { uniqueCinValidator } from "src/app/async validators/unique-cin.validator";

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.css'],
})
export class AddCvComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  router = inject(Router);
  toastr = inject(ToastrService);
  form = this.formBuilder.group(
    {
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      path: [''],
      job: ['', Validators.required],
      cin: [
        '',
        {
          validators: [Validators.required, Validators.pattern('[0-9]{8}')],
          asyncValidators: [uniqueCinValidator(this.cvService)],
          updateOn: 'blur'
        },
      ],
      age: [
        0,
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    },
    {
      validators: [],
      asyncValidators: [],
    }
  );
  constructor() {
    // Gestion de la partie age
    /**
     * Bech nekhdmou kol ma ietbadel l'age
     * Itha kan l'age a9al men 18 bech ndisabli el path
     * Sinon bech nenablihb
     */
    //V1
    // this.age.valueChanges.subscribe({
    //   next: (age) => {
    //     if (age < 18) this.path?.disable()
    //     else this.path?.enable()
    //   }
    // })
    //V2
    this.age.valueChanges
      .pipe(
        tap((age) => {
          if (age < 18) this.path?.disable();
          else this.path?.enable();
        }, takeUntilDestroyed())
      )
      .subscribe();

    // La gestion du cache du formulaire
    /**
     * Bech nthabet doub ma tet7al el page :
     * 1- Itha kan 3andi un form mkhabi fel localStorage
     *    => bech npatchi el form mta3i bel valeur haki
     * 2- Sinon ma 3andi ma na3mel
     */

    /**
     * Je récupére le formulaire sauvgardé dans le local storage
     */
    const addCvForm = localStorage.getItem(APP_CONSTANTES.addCvForm);
    if (addCvForm) {
      this.form.patchValue(JSON.parse(addCvForm));
    }

    // Lazemni zada dima nthabet ki ietbadel el status ou howa validators
    // Nesta7fedh bel statuis (value) mta3 el fomr fel localstorage
    this.form.statusChanges
      .pipe(
        filter((_) => this.form.valid),
        tap(() =>
          localStorage.setItem(
            APP_CONSTANTES.addCvForm,
            JSON.stringify(this.form.value)
          )
        ),
        takeUntilDestroyed()
      )
      .subscribe();
  }
  addCv() {
    // this.cvService.addCv(this.form.value as Cv).subscribe({
    //   next: (cv) => {
    //     this.router.navigate([APP_ROUTES.cv]);
    //     this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
    //   },
    //   error: (err) => {
    //     this.toastr.error(`Une erreur s'est produite, Veuillez contacter l'admin`);
    //   },
    // });
    this.cvService
      .addCv(this.form.value as Cv)
      .pipe(
        tap((cv) => {
          // Kol ma nvalidi l'ajout je vide le localstorage
          localStorage.removeItem(APP_CONSTANTES.addCvForm);
          this.router.navigate([APP_ROUTES.cv]);
          this.toastr.success(`Le cv ${cv.firstname} ${cv.name}`);
        }),
        catchError((e) => {
          this.toastr.error(
            `Une erreur s'est produite, Veuillez contacter l'admin`
          );
          return EMPTY;
        })
      )
      .subscribe();
  }

  get name(): AbstractControl {
    return this.form.get('name')!;
  }
  get firstname() {
    return this.form.get('firstname');
  }
  get age(): AbstractControl {
    return this.form.get('age')!;
  }
  get job() {
    return this.form.get('job');
  }
  get path() {
    return this.form.get('path');
  }
  get cin(): AbstractControl {
    return this.form.get('cin')!;
  }
}
