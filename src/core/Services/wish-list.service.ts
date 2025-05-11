import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishListCounter: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  addProductToWishList(productId: string): Observable<any> {
    if (!this.isBrowser()) return of(null);
    return this._HttpClient.post(baseUrl + "api/v1/wishlist", { productId });
  }

  DeleteProductFromWishList(productId: string): Observable<any> {
    if (!this.isBrowser()) return of(null);
    return this._HttpClient.delete(baseUrl + `api/v1/wishlist/${productId}`);
  }

  getLoggedUserWishList(): Observable<any> {
    if (!this.isBrowser()) return of(null);
    return this._HttpClient.get(baseUrl + "api/v1/wishlist");
  }
}