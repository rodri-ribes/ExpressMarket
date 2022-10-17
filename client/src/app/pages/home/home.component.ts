import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products!: Product[]

  constructor(private readonly productSvc: ProductService) { }

  ngOnInit(): void {
    this.productSvc.getProducts().subscribe(prod => {
        this.products = [...prod]
    })
  }

}
