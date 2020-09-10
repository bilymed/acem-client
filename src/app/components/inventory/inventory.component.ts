import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'
import { Product } from 'src/app/models/product';
import { InventoryService } from 'src/app/services/inventory.service';
import { CartService } from 'src/app/services/cart.service';
import { from } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  products: Product[];
  product: Product;

  constructor
    (
      private inventoryService: InventoryService,
      private cartService: CartService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * get Items From service
   */
  getProducts() {
    let objArray: Array<Product> = new Array();
    this.inventoryService.getProducts().subscribe(
      data => { this.products = <Product[]>data },
      err => console.error(err),
      () => console.log('items loded')
    );
  }

  /**
   * get product by Id
   * @param id 
   */
  getProduct(id: number, i: number) {
    for (let product of this.products) {
      if (id === product.id) {
        this.product = product;
      }
    }
  }

  addItemToCart(product: Product): void {
    this.cartService.product = product;
  }

  /**
   * Add items to Cart
   * @param product 
   */
  addToCart(product: Product): void {

    let productExists = false

    for (let i in this.cartService.cartItems) {
      if (this.cartService.cartItems[i].productId === product.id) {
        this.cartService.cartItems[i].quantity++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      this.cartService.cartItems.push({
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        productQty: product.quantity,
        quantity: 1,
        price: product.price
      });
    }

    this.cartService.cartTotal = 0;
    this.cartService.cartItems.forEach(item => {
      this.cartService.cartTotal += (item.quantity * item.price);
    });
    this.router.navigate(['/cart']);
  }

}
