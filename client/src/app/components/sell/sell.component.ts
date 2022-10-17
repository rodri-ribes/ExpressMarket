import { ProductService } from './../../services/product.service';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})



export class SellComponent implements OnInit {

  //creacion del form

  formCreateProduct!: FormGroup;

  imageProduct!: any

  loading: boolean = false

  @ViewChild('selectImage') selectImage!: ElementRef

  categorySelect: string = ""

  error = {
    error: false,
    visible: false,
    message: ""
  }

  constructor(private readonly fb: FormBuilder,
    private upload: UploadImageService,
    private productSvc: ProductService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.formCreateProduct = this.initForm();
  }
  
  // async uploadImage($event: any): Promise<void>{
  //   const file = $event.target.files[0];
  //   console.log(file)

  //   let image = this.upload.uploadFile(file)

  // }

  noRepeat(): boolean{
    
    let datoSelectOne = this.formCreateProduct.get("datoSelectOne")?.value.split(',')[0]
    let datoSelectTwo = this.formCreateProduct.get("datoSelectTwo")?.value.split(',')[0]
    let datoSelectThree = this.formCreateProduct.get("datoSelectThree")?.value.split(',')[0]
    let datoSelectFour = this.formCreateProduct.get("datoSelectFour")?.value.split(',')[0]

    if(datoSelectOne !== datoSelectTwo && 
      datoSelectThree !== datoSelectOne && 
      datoSelectTwo !== datoSelectThree && 
      datoSelectOne !== datoSelectFour && 
      datoSelectTwo !== datoSelectFour && 
      datoSelectThree !== datoSelectFour && 
      !this.formCreateProduct.invalid){
      return false
    }else{
      return true
    }
  }


  async onSubmit(): Promise<void>{
    this.loading = true
    console.log("lo q hay en el state", this.selectImage.nativeElement.files[0])

    let datoSelectOne = this.formCreateProduct.get("datoSelectOne")?.value.split(',')[0]
    let datoSelectTwo = this.formCreateProduct.get("datoSelectTwo")?.value.split(',')[0]
    let datoSelectThree = this.formCreateProduct.get("datoSelectThree")?.value.split(',')[0]
    let datoSelectFour = this.formCreateProduct.get("datoSelectFour")?.value.split(',')[0]


    if(datoSelectOne !== datoSelectTwo &&
      datoSelectThree !== datoSelectOne &&
      datoSelectTwo !== datoSelectThree &&
      datoSelectTwo !== datoSelectFour &&
      datoSelectOne !== datoSelectFour &&
      datoSelectThree !== datoSelectFour       
      ){
      
      let image = await this.upload.uploadFile(this.selectImage.nativeElement.files[0])

      const userString = localStorage.getItem("user")
      let user;

      if(userString){
        user = JSON.parse(userString)
      }

      const newProduct = {
        title: this.formCreateProduct.get("title")?.value,
        content: this.formCreateProduct.get("content")?.value,
        isNewProduct: this.formCreateProduct.get("isNewProduct")?.value,
        image: image[1],
        imageName: image[0],
        price: this.formCreateProduct.get("price")?.value,
        stock: this.formCreateProduct.get("stock")?.value,
        user: this.cookieService.get("id"),
        category: this.formCreateProduct.get("category")?.value,
        datos: {
          [this.formCreateProduct.get("datoSelectOne")?.value.split(',')[0]]: this.formCreateProduct.get("datoTextOne")?.value,
          [this.formCreateProduct.get("datoSelectTwo")?.value.split(',')[0]]: this.formCreateProduct.get("datoTextTwo")?.value,
          [this.formCreateProduct.get("datoSelectThree")?.value.split(',')[0]]: this.formCreateProduct.get("datoTextThree")?.value,
          [this.formCreateProduct.get("datoSelectFour")?.value.split(',')[0]]: this.formCreateProduct.get("datoTextFour")?.value,
        }
      }

      this.productSvc.createProduct(newProduct)
      .subscribe((res) => {
        
        this.error = {
          error: false,
          visible: true,
          message: "Product published successfully"
        }
      }, error => {
        console.log(error)
        this.loading = false
        this.error = {
          error: false,
          visible: true,
          message: error.error.text
        }
        this.formCreateProduct.patchValue({
          datoTextThree: " ",
          datoSelectThree: " ",
          datoTextTwo: " ",
          datoSelectTwo: " ",
          datoTextOne: " ",
          datoSelectOne: " ",
          category: " ",
          price: 0,
          image: "",
          isNewProduct: " ",
          content: " ",
          title: " ",
          stock: 0
        })
        this.categorySelect = ""
        const contador = timer(3000);
  
        contador.subscribe(() => {
          this.error = {
            error: false,
            visible: false,
            message: ""
          }
        })
      })
    }else{
      
      this.error = {
        error: true,
        visible: true,
        message: "You selected an item of interest more than once"
      }
      const contador = timer(5000);
      contador.subscribe(() => {
        this.error = {
          error: false,
          visible: false,
          message: ""
        }
      })
    }

  }



  initForm(): FormGroup{
    return this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      isNewProduct: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      category: ['', [Validators.required]],
      datoSelectOne: ['', [Validators.required]],
      datoTextOne: ['', [Validators.required]],
      datoSelectTwo: ['', [Validators.required]],
      datoTextTwo: ['', [Validators.required]],
      datoSelectThree: ['', [Validators.required]],
      datoTextThree: ['', [Validators.required]],
      datoSelectFour: ['', [Validators.required]],
      datoTextFour: ['', [Validators.required]],
    })
  }
}
