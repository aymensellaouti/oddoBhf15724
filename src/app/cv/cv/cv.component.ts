import { Component, inject } from "@angular/core";
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";
import { EMPTY, Observable, catchError, of } from "rxjs";
import { TodoService } from "src/app/todo/service/todo.service";
@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs: Cv[] = [];
  selectedCv: Cv | null = null;
  /*   selectedCv: Cv | null = null; */
  date = new Date();
  logger = inject(LoggerService)
  toastr =  inject(ToastrService);
  cvService =  inject(CvService);
  todoService = inject(TodoService);
  constructor() {
    this.cvService.getCvs().subscribe({
      next: (cvs) => {
        this.cvs = cvs;
      },
      error: () => {
        this.cvs = this.cvService.getFakeCvs();
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      },
    });
    // this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
  onForwardCv(cv: Cv) {
    this.selectedCv = cv;
  }
}
