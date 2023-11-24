import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textToRead: string = '';
  selectedLanguage: string = '';
  selectedVoice: SpeechSynthesisVoice | null = null;
  languages: { name: string; lang: string }[];
  voices: SpeechSynthesisVoice[] = [];
  speaking: boolean = false;
  currentSpeech: SpeechSynthesisUtterance | null = null;

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
    this.voices = speechSynthesis
      .getVoices()
      .filter((voice) => voice.lang === this.selectedLanguage);
  }

  speakText() {
    if (this.textToRead.trim() === '') {
      return;
    }

    if (this.speaking) {
      this.pauseSpeech();
      return;
    }

    const speech = new SpeechSynthesisUtterance();
    speech.text = this.textToRead;
    speech.lang = this.selectedLanguage;
    speech.voice = this.selectedVoice;
    this.currentSpeech = speech;
    this.speaking = true;

    speechSynthesis.speak(speech);

    speech.onend = () => {
      this.speaking = false;
      this.currentSpeech = null;
    };
  }

  pauseSpeech() {
    if (this.currentSpeech && this.speaking) {
      speechSynthesis.pause();
      this.speaking = false;
    }
  }

  stopSpeech() {
    if (this.currentSpeech) {
      speechSynthesis.cancel();
      this.speaking = false;
      this.currentSpeech = null;
    }
  }
}
