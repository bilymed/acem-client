import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userForm: FormGroup;
  cartItems = [];
  cartTotal = 0;

  constructor(private cartService: CartService,
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cartItems;
    this.cartTotal = this.cartService.cartTotal;

    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      cartForm: this.formBuilder.array([
        this.addItemFormGroup()
      ])
    });
    this.addDynamicForm();
  }

  addDynamicForm() {
    (<FormArray>this.userForm.get('cartForm')).clear();
    for (let i in this.cartItems) {
      (<FormArray>this.userForm.get('cartForm')).push(
        this.addItemFormGroup(
          this.cartItems[i].productId,
          this.cartItems[i].productImage,
          this.cartItems[i].productTitle,
          this.cartItems[i].quantity,
          this.cartItems[i].productQty
        )
      );
    }
  }

  addItemFormGroup(productId?, image?, title?, quantity?, productQty?): FormGroup {
    let formGroup = this.formBuilder.group({
      id: [''],
      title: [''],
      image: [''],
      quantity: ['', [Validators.min(1), Validators.max(productQty), Validators.required]]
    });
    if (productId && quantity) {
      formGroup.patchValue({
        id: productId,
        title: title,
        quantity: quantity,
        image: image
      });
    }
    return formGroup;
  }

  onBuy(): void {
    const order: Order = new Order();
    order.email = this.userForm.value.email;;
    order.items = this.userForm.value.cartForm;
    this.cartService.proceedOrder(order).subscribe(
      data => {
        this.userForm.reset();
        this.router.navigate(['/inventory']);
        return true;
      },
      error => {
        return Observable.throw(error);
      }
    )
    console.log(order);
  }

}
