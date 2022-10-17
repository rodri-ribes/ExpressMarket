import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card-my-product',
  templateUrl: './card-my-product.component.html',
  styleUrls: ['./card-my-product.component.scss']
})
export class CardMyProductComponent implements OnInit {


  @Input() product!: Product
  @Output() productDelete = new EventEmitter<string>();

  constructor(private ProductSvc: ProductService) { }

  ngOnInit(): void {
  }

  deleteMyProduct(id: string): void{
    this.productDelete.emit(id)
  }
}
