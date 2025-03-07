import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { BrandsService } from '../../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  isLoading: boolean = true;
    brands: any;

    constructor(private brandsService: BrandsService) {
      this.getCategories()
    }

    getCategories() {
      this.brandsService.getAllBrands().subscribe({
        next: res => {
          this.brands = res.data
        },
        complete: () => {
          this.isLoading = false;
          console.log(this.brands)
        }
      })
    }
}
