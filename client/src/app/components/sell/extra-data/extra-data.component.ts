import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-extra-data',
  templateUrl: './extra-data.component.html',
  styleUrls: ['./extra-data.component.scss']
})
export class ExtraDataComponent implements OnInit, OnChanges {

  constructor(private readonly fb: FormBuilder) { }

  @Input() formCreateProduct!:  FormGroup
  @Input() categorySelect: string = "" 
  @ViewChild('datoSelect') datoSelect!: ElementRef
  
  typeSelect: string[] = []

  datosFilter: any = [];
  
  detailsExtras = [
    "waist", "color", "totalArea", "rooms", "bathrooms", "age", "location", "weight", "power", "wireless", "voltage", "rolled", "frameSize"
  ]

  dataExtra = [
    {dato: ["brand", "Text"], category: "Vehicles, Fashion, Technology, Home, Tools, SportAndFitness"},
    {dato: ["model", "Text"], category: "Vehicles, Fashion, Technology, Home, Tools, SportAndFitness"},
    {dato: ["year", "Number"], category: "Vehicles"},
    {dato: ["cylinderCapacity", "Number"], category: "Vehicles"},
    {dato: ["kilometres", "Number"], category: "Vehicles"},
    {dato: ["gender", "Text"], category: "Fashion, SportAndFitness"},
    {dato: ["typeOfGarment", "Text"], category: "Fashion, SportAndFitness"},
    {dato: ["waist", "Text"], category: "Fashion,  SportAndFitness"},
    {dato: ["color", "Text"], category: "Vehicles, Fashion, Home, SportAndFitness"},
    {dato: ["totalArea", "Number"], category: "Estate"},
    {dato: ["rooms", "Number"], category: "Estate"},
    {dato: ["bathrooms", "Number"], category: "Estate"},
    {dato: ["age", "Number"], category: "Estate"},
    {dato: ["location", "Text"], category: "Estate"},
    {dato: ["power", "Number"], category: "Technology, Tools"},
    {dato: ["wireless", "Text"], category: "Technology, Tools"},
    {dato: ["voltage", "Number"], category: "Technology, Home, Tools"},
    {dato: ["rolled (Bike)", "Number"], category: "SportAndFitness"},
    {dato: ["frameSize (Bike)", "Number"], category: "SportAndFitness"},
  ]
  

  ngOnInit(): void {
    // this.formCreateProductData = this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["categorySelect"] && changes["categorySelect"].currentValue){
      this.datosFilter = this.dataExtra.filter(c => c.category.includes(this.categorySelect))
      console.log(this.datosFilter)
    }
  }


}
