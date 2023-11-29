import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


declare var responsiveVoice: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isPlaying: boolean = false;
  isOpenMenu: boolean = false;
  isOptionsOpen: boolean = false;
  title!: string;
  textToRead!: string;
  isPublic: boolean = false;
  isDivVisible = false;
  isPublicDivVisible = false;
  selectedLanguage: string = 'fr-FR';
  selectedVoice: string = 'French Female';
  speed: number = 200;
  texts: any[] = [];

  isLanguageSelectionVisible = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    try {
      this.http
        .get('https://apitest-psi.vercel.app/texts/')
        .subscribe((data: any) => {
          this.texts = data.data;
          this.texts.forEach((text: any) => {
            console.log(text);
          });
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }

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

  setTextToRead(content: string): void {
    this.textToRead = content;
  }

  addNewText() {
    this.textToRead = '';
  }

  saveNewText() {
    let text = {
      title: this.title,
      content: this.textToRead,
    };
    try {
      this.http
        .post('https://apitest-psi.vercel.app/texts/', text)
        .subscribe((res) => {
          console.log('Saved');
        });
    } catch (error: any) {
      console.log(error.message);
    }
    this.isDivVisible = !this.isDivVisible;
  }

  saveNewPublicText() {
    let text = {
      title: this.title,
      content: this.textToRead,
      isPublic: (this.isPublic = true),
    };
    try {
      this.http
        .post('https://apitest-psi.vercel.app/texts/', text)
        .subscribe((res) => {
          console.log('Saved');
        });
    } catch (error: any) {
      console.log(error.message);
    }
    this.isPublicDivVisible = !this.isPublicDivVisible;
  }

  speak() {
    this.isPlaying = !this.isPlaying;

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

  openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  toggleLanguageSelection() {
    this.isLanguageSelectionVisible = !this.isLanguageSelectionVisible;
  }

  closeModals(){
    this.isOpenMenu = false;
    this.isOptionsOpen = false;
    this.isPublicDivVisible = false;
  }

  optionsTextOpen(event: MouseEvent) {
    event.stopPropagation();
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  writeTitle() {
    // Handle input click event if needed
  }

  toggleDivVisibility() {
    this.isDivVisible = !this.isDivVisible;
  }

  togglePublicDivVisibility() {
    this.isPublicDivVisible = !this.isPublicDivVisible;
  }

  async triggerSpeak() {
    if (this.isPlaying) {
      return;
    }

    this.isPlaying = true;

    await this.speak();

    this.isPlaying = false;
  }

  onStart(): void {
    responsiveVoice.setVoice(this.selectedVoice);
    responsiveVoice.setLanguage(this.selectedLanguage);
  }

  onEnd() {
    this.isPlaying = false;
  }

  pause(): void {
    this.isPlaying = false;

    responsiveVoice.pause();
  }

  stop(): void {
    this.isPlaying = false;

    responsiveVoice.cancel();
  }
}
