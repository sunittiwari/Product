import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient,private _authservice: AuthService) { }
  getProducts()
  {
    return this._http.get('http://localhost:3000/getproducts')
   /*To pass token along with header by adding it to header
   CheckloggedIn has not been defined in that authservice
   {
     headers:new HttpHeaders().set('authorization',this._authservice.checkLoggedIn())
    });*/
  }

  getDetails(params){
    return this._http.post('http://localhost:3000/getdetails',params);
  }
}
