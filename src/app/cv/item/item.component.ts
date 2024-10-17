import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input({required: true}) cv!: Cv;
  @Input() size = 50;
  cvService = inject(CvService);
  // @Output() selectCv = new EventEmitter<Cv>();

  onSelectCv() {
    // if (this.cv) this.selectCv.emit(this.cv);
    this.cvService.selectCv(this.cv);
  }
}
