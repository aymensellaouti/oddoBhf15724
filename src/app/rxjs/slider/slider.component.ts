import { HttpClient } from "@angular/common/http";
import { Component, inject, Input } from "@angular/core";
import { Observable, combineLatest, map, startWith, timer } from "rxjs";

export interface ImageApi {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() timer = 1000;
  http = inject(HttpClient);
  photosApi$ = this.http.get<ImageApi[]>('https://jsonplaceholder.typicode.com/photos');
  @Input() imagePaths = [
    'as.jpg',
    'cv.png',
    'rotating_card_profile.png',
    'rotating_card_profile2.png',
    'rotating_card_profile3.png',
  ];

  /* Todo : Créer le flux permettant de générer les images à afficher dans le slider */
  // paths$: Observable<string> = timer(0, this.timer).pipe(
  //   // 0 1 2 3 4 5 6 7 8 9 10
  //   map((index) => this.imagePaths[index % this.imagePaths.length])
  //   // taswira1, taswira2, ..., taswiraLekhra, taswiraLoula, ....
  // );
  paths$: Observable<ImageApi> = combineLatest([timer(0, this.timer), this.photosApi$]).pipe(
    map(([index, photos]) => photos[index % photos.length])
  )
}
