import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { forkJoin } from 'rxjs';
import { throwError, map } from 'rxjs';
import { franc } from '/home/fongang/test_project_OS/readForMe/node_modules/franc-min/index';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../login/services/auth.service';


declare var responsiveVoice: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pseudo!: string;
  phone!: string;
  jId!: string;
  isPlaying: boolean = false;
  isOpenMenu: boolean = false;
  isOptionsOpen: boolean = false;
  isSearchBarOpened: boolean = false;
  selectedTextId!: string;
  contentOfSavedText!: string;
  title!: string;
  searchTerm!: string;
  textToRead: string = '';
  isPublic: boolean = false;
  isDivVisible = false;
  isPublicDivVisible = false;
  selectedLanguage: string = 'fr-FR';
  selectedVoice: string = '';
  speed: number = 200;
  alertEmptyContent: boolean = false;
  texts: any[] = [];
  searchResults: any[] = [];
  showLanguageSelection = false;
  showModalDelete: boolean = false;
  isLanguageSelectionVisible = false;
  remainingText: string = '';
  currentPosition: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
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

    try {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const textsRequest = this.http.get(
        `https://apitest-psi.vercel.app/texts/${this.jId}`,
        { headers }
      );
      const publicTextsRequest = this.http.get(
        'https://apitest-psi.vercel.app/publictexts/'
      );

      forkJoin([textsRequest, publicTextsRequest]).subscribe(
        (results: any[]) => {
          const textsData = results[0].data;
          const publicTextsData = results[1].publicText;

          this.texts = [...textsData, ...publicTextsData];
        }
      );
    } catch (error: any) {
      console.log(error.message);
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

  login(pseudo: string, phone: string) {
    let credentials = {
      pseudo: this.pseudo,
      phone: this.phone,
    };
    this.authService
      .login(credentials)
      .pipe(
        map((res: any) => res.token), // Extraction du token de la réponse
        tap((token: any) => {
          if (token) {
            localStorage.setItem('token', token); // Sauvegarde du token dans le localStorage
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
     const token = localStorage.getItem('token');
     const headers = new HttpHeaders({
       Authorization: `Bearer ${token}`,
     });

     const textsRequest = this.http.get(
       `https://apitest-psi.vercel.app/${this.jId}`,
       { headers }
     );
     const publicTextsRequest = this.http.get(
       'https://apitest-psi.vercel.app/publictexts/'
     );

     forkJoin([textsRequest, publicTextsRequest]).subscribe(
       (results: any[]) => {
         const textsData = results[0].data;
         const publicTextsData = results[1].publicText;

         this.texts = [...textsData, ...publicTextsData];
       }
     );
   } catch (error: any) {
     console.log(error.message);
   }
  }

  getPublicTexts() {
    try {
      this.http
        .get('https://apitest-psi.vercel.app/publictexts/')
        .subscribe((data: any) => {
          const publicTexts = data.publicText;
          this.texts = this.texts.concat(publicTexts);
          this.texts.forEach((text: any) => {});
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  searchTitles(): void {
    this.http
      .get<string[]>(
        `https://apitest-psi.vercel.app/search?term=${encodeURIComponent(
          this.searchTerm
        )}&jId=${encodeURIComponent(this.jId)}`
      )
      .subscribe(
        (texts) => {
          this.searchResults = texts;
          this.searchResults.forEach((searchResults: any) => {});
          console.log(this.searchResults);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadTextSearched(textSearchedContent: string) {
    this.textToRead = textSearchedContent;
    this.isSearchBarOpened = !this.isSearchBarOpened;
  }

  closeSaveNewTextModal() {
    this.isDivVisible = false;
  }

  openSearchBar() {
    this.isSearchBarOpened = !this.isSearchBarOpened;
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
    this.getFirstFiveWords();

    if (!this.textToRead) {
      this.isDivVisible = !this.isDivVisible;
      this.alertEmptyContent = !this.alertEmptyContent;
    } else {
      let text = {
        title: this.title,
        content: this.textToRead,
        jId: this.jId,
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
  }

  saveNewPublicText() {
    this.getFirstFiveWords();
    if (!this.textToRead) {
      this.isDivVisible = !this.isDivVisible;
      this.alertEmptyContent = !this.alertEmptyContent;
    } else {
      let text = {
        title: this.title,
        content: this.textToRead,
        jId: this.jId,
        isPublic: (this.isPublic = true),
      };

      try {
        this.http
          .post('https://apitest-psi.vercel.app/texts/', text)
          .subscribe((res) => {
            this.getMyTexts();
          });
      } catch (error: any) {
        console.log(error.message);
      }
      this.isDivVisible = !this.isDivVisible;
    }
  }

  getFirstFiveWords(): void {
    const words = this.textToRead.split(' ');
    this.title = words.slice(0, 3).join(' ');
  }

  closeSaveNewPublicTextModal() {
    this.isPublicDivVisible = false;
  }

  speak() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      if (this.remainingText !== '') {
        responsiveVoice.resume();
      } else {
        let detectedLanguage = franc(this.textToRead);
        this.selectedVoice = this.getVoiceForLanguage(detectedLanguage);
        responsiveVoice.speak(this.textToRead, this.selectedVoice, {
          onend: () => {
            this.onEnd();
          },
        });
      }
    } else {
      responsiveVoice.pause();
    }
  }

  closeAlertEmptyContentModal() {
    this.alertEmptyContent = false;
  }

  getVoiceForLanguage(languageCode: string): string {
    // Correspondance entre les codes de langue et les voix disponibles
    const voiceMap: { [key: string]: string } = {
      eng: 'US English Female',
      fra: 'French Female',
      spa: 'Spanish Female',
      deu: 'Deutsch Female',
      ita: 'Italian Female',
      nld: 'Dutch Female',
      por: 'Brazilian Portuguese Female',
      rus: 'Russian Female',
      swe: 'Swedish Female',
      dan: 'Danish Female',
      nor: 'Norwegian Female',
      fin: 'Finnish Female',
      pol: 'Polish Female',
      tur: 'Turkish Female',
      ell: 'Greek Female',
      hun: 'Hungarian Female',
      ces: 'Czech Female',
      zho: 'Chinese Female',
      jpn: 'Japanese Female',
    };
    return voiceMap[languageCode];
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
    this.alertEmptyContent = false;
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
    if (this.isPlaying) {
      responsiveVoice.cancel();
      this.isPlaying = false; // Réinitialiser l'état de lecture
      this.remainingText = '';
      console.log('Texte restant à lire:', this.remainingText);
      this.isPlaying = false;
    }
  }

  pause(): void {
    this.isPlaying = false;

    responsiveVoice.pause();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  stop(): void {
    this.isPlaying = false;

    responsiveVoice.cancel();
  }
}
