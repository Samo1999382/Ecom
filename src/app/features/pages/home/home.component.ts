import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, CarouselModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  constructor(private categoriesService: CategoriesService) {
    this.categories = this.getCategories()
  }

  getCategories() {
    return this.categoriesService.getAllCategories().subscribe({
      next: res => {
        this.categories = res.data
        console.log(this.categories)
      }
    })
  }
}
