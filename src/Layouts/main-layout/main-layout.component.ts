import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { CartService } from '../../core/Services/cart.service';
import { WishListService } from '../../core/Services/wish-list.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  private _CartService = inject(CartService);
  private _WishListService = inject(WishListService);

  getCartItems() {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        const count = res?.numOfCartItems ?? 0;
        this._CartService.cartCounter.next(count);
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
        this._CartService.cartCounter.next(0);
      }
    });
  }

  getWishListItems() {
    this._WishListService.getLoggedUserWishList().subscribe({
      next: (res) => {
        const count = res?.count ?? 0;
        this._WishListService.wishListCounter.next(count);
      },
      error: (err) => {
        console.error('Error fetching wishlist items:', err);
        this._WishListService.wishListCounter.next(0);
      }
    });
  }

  ngOnInit(): void {
    this.getCartItems();
    this.getWishListItems();
  }
}