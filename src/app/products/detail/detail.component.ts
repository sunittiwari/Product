import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  param: any;
  details : any = {}
  constructor(private _route: ActivatedRoute, private _productsService:ProductsService) { }

  ngOnInit() {
    this._route.params.subscribe((data)=>{
      this._productsService.getDetails(data).subscribe((resp)=>{
        this.details = resp;
      });
      
    });
   
    
  }

}
