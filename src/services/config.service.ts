import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  id!: string;
  pseudo!: string;
  phone!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  initializeApp(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.route.queryParams.subscribe((params) => {
        this.id = params['id'] || '';
        this.pseudo = params['pseudo'] || '';
        this.phone = params['phone'] || '';
      });

      resolve();
    });
  }
}

