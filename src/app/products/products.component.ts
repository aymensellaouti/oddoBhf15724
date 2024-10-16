import { Component, inject } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
  tap,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  noMoreProducts = false;
  title = 'get more products';
  maxResponseLegth = 0;
  productService = inject(ProductService);
  setting: Settings = {
    limit: 12,
    skip: 0,
  };
  #settings$ = new BehaviorSubject(this.setting);
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
  products$: Observable<Product[]> = this.#settings$.pipe(
    // {0, 12}, {12,12}, {24;12}, ....
    // Madam 7achti bedenya el kol ou bel ordre ma tgedha kan ConcatMap
    concatMap((settings) => this.productService.getProducts(settings)),
    tap(productApiResponse => this.maxResponseLegth = productApiResponse.total ),
    map((productApiResponse) => productApiResponse.products),
    takeWhile((products) => {
    if (!!products.length) {
      this.noMoreProducts = true;
      this.title = 'no more products';
      return false;
    }
      return true;
    } ),
    scan((oldProducts, newProducts) => [...oldProducts, ...newProducts]),
  );
  constructor() {}

  moreProducts() {
    this.setting = {
      ...this.setting,
      skip: this.setting.skip + this.setting.limit,
    };
    this.#settings$.next(this.setting);
  }
}
