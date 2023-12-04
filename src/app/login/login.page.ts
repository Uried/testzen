import { Component, OnInit } from '@angular/core';
import { tap, catchError,map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  pseudo!: string;
  phone!: string;
  jId!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
     private modalController: ModalController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.pseudo = params['pseudo'];
      this.phone = params['phone'];
      this.jId = params['jId'];
    });

    if (this.jId && this.phone && this.pseudo) {
      this.login(this.pseudo, this.phone);
    } else {
      this.router.navigateByUrl('/login');
    }
   }

  login(pseudo: string, phone: string) {
    let credentials = {
      pseudo: this.pseudo,
      phone: this.phone,
    };

    this.authService
      .login(credentials)
      .pipe(
        map((res) => res.token), // Extraction du token de la réponse
        tap((token) => {
          if (token) {
            this.show()
            localStorage.setItem('token', token); // Sauvegarde du token dans le localStorage
            this.router.navigateByUrl('/home', { replaceUrl: true });
            console.log('Connected');
          } else {
            console.log('Token not found in the response.');
          }
        }),
        catchError((error) => {
          console.log(error.message);
          return throwError(() => error);
        })
      )
      .subscribe();
  }


show(){
    this.loadingCtrl.create({
     message: "Patientez svp..."
    }).then(loading =>{
     loading.present();

     setTimeout(()=> {
      loading.dismiss();
     },3000);
    })
   }

  }
