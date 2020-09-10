import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * all of the call requests are application/json type
 */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems = [];
  public _cartTotal = 0;
  private _product: Product = new Product();

  constructor(private http: HttpClient) { }

  /**
   * post products quantities to api
   * @param data 
   */
  proceedOrder(data) {
    let body = JSON.stringify(data);
    return this.http.post('/server/api/v1/products/order', body, httpOptions)
  }

  get cartItems(): any[] {
    return this._cartItems;
  }
  set cartItems(value: any[]) {
    this._cartItems = value;
  }

  get cartTotal(): number {
    return this._cartTotal;
  }
  set cartTotal(value: number) {
    this._cartTotal = value;
  }

  public get product(): Product {
    return this._product;
  }
  public set product(value: Product) {
    this._product = value;
  }

}
