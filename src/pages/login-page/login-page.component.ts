import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent{

  pseudo: string = ''
    password: string = ''

    constructor(){}

    login() {
      if (this.pseudo && this.password) {
        // Effectuez ici votre logique de connexion
        console.log('Pseudo:', this.pseudo);
        console.log('Mot de passe:', this.password);
      }
    }
  }
