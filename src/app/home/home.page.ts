import { Component } from '@angular/core';

declare var responsiveVoice: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isPlaying: boolean = false;
  textToRead!: string;
  selectedLanguage: string = 'fr-FR';
  selectedVoice: string = 'French Female';
  speed: number = 200;

  voiceOptions: { [key: string]: string[] } = {
    'fr-FR': ['French Female', 'French Male'],
    'en-US': ['English Female', 'English Male'],
    'ja-JP': ['Japanese Female', 'Japanese Male'],
    'es-ES': ['Spanish Female', 'Spanish Male'],
    'zh-CN': ['Chinese Female', 'Chinese Male'],
    'de-DE': ['German Female', 'German Male'],
    'it-IT': ['Italian Female', 'Italian Male'],
    // Ajoutez d'autres langues et options de voix selon vos besoins
  };


  speak() {
    this.isPlaying = !this.isPlaying;

    const ionContent = document.querySelector('ion-content')!;
    ionContent.classList.add('playing');

    return new Promise<void>((resolve) => {
      responsiveVoice.speed = this.speed;
      responsiveVoice.speak(this.textToRead, this.selectedVoice, {
        onend: () => {
          this.onEnd();
          resolve();
        },
      });
    });

  }

  async triggerSpeak() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    const ionContent = document.querySelector('ion-content')!;
    ionContent.classList.add('playing');

    await this.speak();

    this.isPlaying = false;
    ionContent.classList.remove('playing');
  }

  onStart(): void {
    responsiveVoice.setVoice(this.selectedVoice);
    responsiveVoice.setLanguage(this.selectedLanguage);
  }

  onEnd() {
    !this.isPlaying

    const ionContent = document.querySelector('ion-content')!;

    ionContent.classList.remove('playing');
  }

  pause(): void {
    this.isPlaying = false;
    const ionContent = document.querySelector('ion-content')!;
    if (this.isPlaying) {
      ionContent.classList.add('playing');
    } else {
      ionContent.classList.remove('playing');
    }

    responsiveVoice.pause();
  }

  stop(): void {
    this.isPlaying = false;
    const ionContent = document.querySelector('ion-content')!;

    ionContent.classList.remove('playing');

    responsiveVoice.cancel();
  }
}
