import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {


  myProducts: Product[] = []
  

  constructor(private ProductSvc: ProductService) { }

  ngOnInit(): void {
   this.getMyProducts()

  }

  getMyProducts(): void{
    this.ProductSvc.getMyProducts().subscribe(prod => {
      this.myProducts = [...prod]
    })
  }


  deleteMyProduct($event: string): void{
    this.myProducts = this.myProducts.filter(c => c._id !== $event)
    this.ProductSvc.removeProduct($event).subscribe(res => {
      return this.ProductSvc.getMyProducts().subscribe(prod => {
        return this.myProducts = prod
      })

    })
  }

}
