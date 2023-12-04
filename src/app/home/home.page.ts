import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  selectedTextId!: string;
  contentOfSavedText!: string;
  title!: string;
  textToRead!: string;
  isPublic: boolean = false;
  isDivVisible = false;
  isPublicDivVisible = false;
  selectedLanguage: string = 'fr-FR';
  selectedVoice: string = 'French Female';
  speed: number = 200;
  texts: any[] = [];
  showLanguageSelection = false;
  showModalDelete: boolean = false;
  isLanguageSelectionVisible = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
    } else {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      try {
        this.http
          .get('https://apitest-psi.vercel.app/texts', { headers })
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
  }

  openDeleteModal() {
    this.showModalDelete = !this.showModalDelete;
    this.isOptionsOpen = false;
  }

  onLanguageChange() {
    // Modifier la voix en fonction de la langue sélectionnée
    switch (this.selectedLanguage) {
      case 'fr-FR':
        this.selectedVoice = 'French Female';
        break;
      case 'en-US':
        this.selectedVoice = 'US English Female';
        break;
      case 'es-ES':
        this.selectedVoice = 'Spanish Female';
        break;
      case 'de-DE':
        this.selectedVoice = 'Deutsch Female';
        break;
      case 'it-IT':
        this.selectedVoice = 'Italian Female';
        break;
      case 'nl-NL':
        this.selectedVoice = 'Dutch Female';
        break;
      case 'pt-BR':
        this.selectedVoice = 'Brazilian Portuguese Female';
        break;
      case 'ru-RU':
        this.selectedVoice = 'Russian Female';
        break;
      case 'sv-SE':
        this.selectedVoice = 'Swedish Female';
        break;
      case 'da-DK':
        this.selectedVoice = 'Danish Female';
        break;
      case 'nb-NO':
        this.selectedVoice = 'Norwegian Female';
        break;
      case 'fi-FI':
        this.selectedVoice = 'Finnish Female';
        break;
      case 'pl-PL':
        this.selectedVoice = 'Polish Female';
        break;
      case 'tr-TR':
        this.selectedVoice = 'Turkish Female';
        break;
      case 'el-GR':
        this.selectedVoice = 'Greek Female';
        break;
      case 'hu-HU':
        this.selectedVoice = 'Hungarian Female';
        break;
      case 'cs-CZ':
        this.selectedVoice = 'Czech Female';
        break;
      case 'zh-CN':
        this.selectedVoice = 'Chinese Female'; // Voix chinoise (ajustez selon les options disponibles)
        break;
      case 'ja-JP':
        this.selectedVoice = 'Japanese Female'; // Voix japonaise (ajustez selon les options disponibles)
        break;
      default:
        this.selectedVoice = 'Default Voice';
        break;
    }

    responsiveVoice.setVoice(this.selectedVoice);
    responsiveVoice.setLanguage(this.selectedLanguage);
  }

  setTextToRead(content: string): void {
    this.textToRead = content;
  }

  addNewText() {
    this.textToRead = '';
  }

  getMyTexts() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    try {
      this.http
        .get('https://apitest-psi.vercel.app/texts', { headers })
        .subscribe((data: any) => {
          this.texts = data.data;
          this.texts.forEach((text: any) => {});
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  closeSaveNewTextModal() {
    this.isDivVisible = false;
  }

  loadContentOfSavedText(savedTextContent: string) {
    this.contentOfSavedText = savedTextContent;
  }

  readTextSaved(textContent: string) {
    this.closeModals();
    this.textToRead = this.contentOfSavedText;
    textContent = this.contentOfSavedText;
    this.isPlaying = !this.isPlaying;
    return new Promise<void>((resolve) => {
      responsiveVoice.speed = this.speed;
      responsiveVoice.speak(this.contentOfSavedText, this.selectedVoice, {
        onend: () => {
          this.onEnd();
          resolve();
        },
      });
    });
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
          this.getMyTexts(); // actualiser la liste
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

  closeSaveNewPublicTextModal(){
    this.isPublicDivVisible = false
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
    this.showLanguageSelection = !this.showLanguageSelection;
  }

  closeModals() {
    this.isOpenMenu = false;
    this.isOptionsOpen = false;
    this.isPublicDivVisible = false;
  }

  optionsTextOpen(event: MouseEvent, idText: string) {
    event.stopPropagation();
    this.isOptionsOpen = !this.isOptionsOpen;
    this.selectedTextId = idText;
    const id = idText;
    console.log(id);
  }

  deleteText(textId: string) {
    const token = localStorage.getItem('token');
    textId = this.selectedTextId;
    console.log(textId);

    const url = `https://apitest-psi.vercel.app/texts/${textId}`;

    this.http
      .delete(url)
      .pipe(
        tap(() => {
          this.getMyTexts();
          console.log('Suppression réussie');
        }),
        catchError((error: any) => {
          console.log('Erreur lors de la suppression', error);
          return of(null);
        })
      )
      .subscribe();
    this.showModalDelete = !this.showModalDelete;
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
    // Modifier la voix en fonction de la langue sélectionnée
    switch (this.selectedLanguage) {
      case 'fr-FR':
        this.selectedVoice = 'French Female';
        break;
      case 'en-US':
        this.selectedVoice = 'US English Female';
        break;
      // Ajoutez d'autres cas pour les autres langues
    }

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
