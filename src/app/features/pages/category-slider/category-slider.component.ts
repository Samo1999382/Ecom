import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent {
  categories: any;
  isLoading: boolean = true;

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
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
