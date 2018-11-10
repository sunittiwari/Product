import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

//Provide that service in the meta data
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers :[ProductsService]
})
export class ProductsComponent implements OnInit,OnDestroy {
  pageTitle: string='Sunit TIwari';
  data: any;
  products: any=[];
  productSubscription : any;
showHideImage:boolean = true;
toggleImage():void{
   // alert('Hello');
   this .showHideImage = !this.showHideImage;

  }

  ratingParentFn(ratingVal:string){
    console.log(ratingVal);
  }



//Can be used accros the class to be used. Thsi is creating an instance
  constructor(private _productService: ProductsService,private _route: ActivatedRoute) { }

  ngOnInit() {
   this.data =  this._route.params['id'];
   this.productSubscription=this._productService.getProducts().subscribe((resp)=>{
  this.products = resp; 
  });
  console.log(this.products);
  console.log(this.data);
  
    }
  ngOnDestroy(){
    this.productSubscription.unsubscribe();
  }  

}
