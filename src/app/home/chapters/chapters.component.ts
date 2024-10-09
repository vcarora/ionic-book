import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { BookDataService } from 'src/app/services/book-data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss'],
})
export class ChaptersComponent implements OnInit {
  b4!: string;
  chapter: string = 'HC01';
  chapterName : string = 'HC Verma Physics';
  isLoading : boolean = true;
  err : any

  constructor(private bookService: BookDataService, private navParams: NavParams,
     private storage: StorageService, private toastController: ToastController) {
    this.chapter = this.navParams.get('chapterCode')
    this.chapterName = this.navParams.get('chapterName')
    console.log('this.navParams.get): ', this.navParams.get('chapterCode'));
  }

  ngOnInit() {
    this.loadChapter() 
  }

  async loadChapter() {
    // Await the promise returned by this.storage.get
    const cachedData = await this.storage.get(this.chapter);
  
    if (cachedData) {
      this.b4 = this.formatBase64(cachedData);
      this.isLoading = false;
    } else {
      this.fetchAndStoreBookBase64();
    }
  }

   formatBase64(data: string): string {
    return `data:application/pdf;base64,${data}`;
  }
  
  fetchAndStoreBookBase64() {
    this.bookService.getBookBase64(this.chapter).subscribe({
      next : response => {
          const base64Data = response?.data?.base64;
          if (base64Data) {
            this.storage.set(this.chapter, base64Data);
            this.b4 = this.formatBase64(base64Data);
            this.isLoading = false;
          }
      },
      error : err => {
        this.isLoading = false;
        console.log(err)
        this.err = err
        this.displayToast()
      }
    });
      
  }

  async displayToast() {
    const toast = await this.toastController.create({
      message: 'Error while loading Chapter file. Please try again!',
      duration: 2500,
      position: 'middle',
    });

    await toast.present();
  }
  
}
