import { Injectable } from '@angular/core';
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
export class InventoryService {

  constructor(private http: HttpClient) { }

  /**
   * get Product from api
   */
  getProducts() {
    return this.http.get('/server/api/v1/products');
  }
}
