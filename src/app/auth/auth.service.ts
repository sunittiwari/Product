import { Injectable } from '@angular/core';
import{Router} from '@angular/router';
import {Subject, BehaviorSubject} from 'rxjs';
import{CookieService} from 'ngx-cookie-service';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  $authCheck = new BehaviorSubject<any>(this.isLoggedIn);
 
constructor(private _router:Router,private _cookieService : CookieService,private _http:HttpClient) { }
  login(credentials){
    this._http.post('http://localhost:3000/authenticate',credentials)
    .subscribe((resp:any)=>{
        if(resp.isloggedin){
          this.$authCheck.next(true);
          this._cookieService.set('token',resp.token);
          this._router.navigate(['/home']);
        }
        else{
          alert("Wriong Creds!!");
        }
    });
    
    /*if(credentials.username== "admin"&& credentials.password == "admin"){
      this._cookieService.set('isloggedin','true');
     this.$authCheck.next(true); 
     this.isLoggedIn = true;
      this._router.navigate(['/home']);
    }else{
      alert("Wrong Creds!!!");
      this._router.navigate(['/Login']);
    }*/
  }
  logOut(){
    this._cookieService.delete('isloggedin');
    this.$authCheck.next(false);
    this.isLoggedIn = false;
  }

  checkLoggedIn(){
    return this._cookieService.get('token');
  }
}
