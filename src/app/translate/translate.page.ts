import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.page.html',
  styleUrls: ['./translate.page.scss'],
})
export class TranslatePage implements OnInit {
  textToTranslate!: string;
  selectedLanguage: string = 'fr-FR';
  translatedText!: string;

  constructor() {}

  ngOnInit() {}

  translate() {
    // Appeler votre service de traduction ici
    // Utilisez this.textToTranslate pour obtenir le texte à traduire
    // Utilisez this.selectedLanguage pour obtenir la langue de traduction sélectionnée
    // Assurez-vous d'attribuer le résultat de la traduction à this.translatedText
  }

  saveTranslation() {
    // Logique pour sauvegarder le résultat de la traduction
    // Utilisez this.translatedText pour obtenir le texte traduit à enregistrer
  }
}
