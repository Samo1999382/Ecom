import { Pipe, PipeTransform } from '@angular/core';
import { products } from '../interface/products/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products:products[], searchValue:string): products[] {
    return products.filter(product => {
      return product.title.toUpperCase().includes(searchValue.toUpperCase());
    });
  }

}
