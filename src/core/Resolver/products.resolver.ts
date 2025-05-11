// src/app/resolvers/products.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductRoot } from '../interfaces/product';
import { ProductsService } from '../Services/products.service';

export const productsResolver: ResolveFn<ProductRoot> = (route, state) => {
  // نحصل على instance من الـ service باستخدام inject()
  const service = inject(ProductsService);
  // نرجع Observable أو Promise من الـ HTTP call
  return service.getProducts(2);
};