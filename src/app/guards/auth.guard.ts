import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{


  firebaseSvc = inject(FirebaseService);
  UtilsSvc = inject(UtilsService);




  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):  Observable<boolean | UrlTree > | Promise<boolean | UrlTree> | boolean | UrlTree  {

      let user = localStorage.getItem('user');
      
    return new Promise((resolve) =>{

      this.firebaseSvc.getAuth().onAuthStateChanged((auth) =>{
        if(auth){
          if(user)  resolve(true);
        }
        else{
          this.UtilsSvc.routerLink('/auth');
          resolve(false);
        }
      })
    
    });
  }
}