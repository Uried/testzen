import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.username = params['pseudo'] || '';
      this.password = params['phone'] || '';
    });
  }

  login() {
    this.router.navigateByUrl('/home');
  }

  redirectTo(urlChemin: string) {
    this.router.navigate([urlChemin]).then((x) => console.log(x));
    // this.router.navigateByUrl(urlChemin);
  }
}
