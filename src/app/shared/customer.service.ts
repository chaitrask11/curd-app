import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    location: new FormControl('')
  });


  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }


  insertCustomer(customer) {
    this.customerList.push({
      fullName: customer.fullName,
      location: customer.location
    });
  }

  populateForm(customer) {
    this.form.setValue(customer);
  }
  
   updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        fullName: customer.fullName,
        location: customer.location
      });
  }
  
   deleteCustomer($key: string) {
    this.customerList.remove($key);
  }

}
