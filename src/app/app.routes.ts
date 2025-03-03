import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';
import { ProductDetailsComponent } from './features/pages/product-details/product-details.component';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, canActivate: [checkTokenGuard], children: [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'}
  ]},
  {path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'productDetails/:id', component: ProductDetailsComponent, title: 'Product Details'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'Cart'},
    {path: 'products', component: ProductsComponent, title: 'Products'},
    {path: 'brands', component: BrandsComponent, title: 'Brands'},
    {path: 'categories', component: CategoriesComponent, title: 'Categories'},

  ]}
];
