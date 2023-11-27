import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username!: string;
  password!: string;

  constructor(
    private router: Router,
    //private http: HttpClient
   ) { }

  ngOnInit() {


  }

  login(){
    this.router.navigateByUrl('/home');
    console.log("fxykcutlyfgiuh");

  }

  redirectTo(urlChemin: string) {

    this.router.navigate([urlChemin]).then(x=>console.log(x));
    // this.router.navigateByUrl(urlChemin);
  }

}
