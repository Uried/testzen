import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textToRead: string = "";
  selectedLanguage: string = "";
  selectedVoice: SpeechSynthesisVoice | null = null;
  languages: { name: string, lang: string }[];
  voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.languages = [
      { name: 'English', lang: 'en-US' },
      { name: 'Français', lang: 'fr-FR' },
      // Ajoutez d'autres langues selon vos besoins
    ];
  }

  ionViewWillEnter() {
    this.loadVoices();
  }

  loadVoices() {
    this.voices = speechSynthesis.getVoices();
  }

  onLanguageChange() {
    this.selectedVoice = null;
    this.voices = speechSynthesis.getVoices().filter(voice => voice.lang === this.selectedLanguage);
  }

  speakText() {
    const speech = new SpeechSynthesisUtterance();
    speech.text = this.textToRead;
    speech.lang = this.selectedLanguage;
    speech.voice = this.selectedVoice;
    speechSynthesis.speak(speech);
  }
}

