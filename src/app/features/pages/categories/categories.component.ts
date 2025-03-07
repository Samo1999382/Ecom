import { Component } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  isLoading: boolean = true;
  categories: any;

  constructor(private categoies: CategoriesService) {
    this.getCategories()
  }

  getCategories() {
    this.categoies.getAllCategories().subscribe({
      next: res => {
        this.categories = res.data
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
