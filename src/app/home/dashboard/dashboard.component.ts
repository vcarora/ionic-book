import { Component, OnInit } from '@angular/core';
import { NavParams, ToastController } from '@ionic/angular';
import { ChaptersComponent } from '../chapters/chapters.component';
import { StorageService } from 'src/app/services/storage.service';
import { AdmobAds, BannerPosition, BannerSize } from "capacitor-admob-ads";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {

  book : string = 'vol1';
  storedKeys : string[] = [];

  constructor(private navParams: NavParams, private storage : StorageService, private toastController: ToastController) {
    this.book = this.navParams.get('book')
   }
   chapterComponent = ChaptersComponent;
   

   vol1Chapters : Book[] =[
    {code : 'HC01', name :'Introduction To Physics', downloaded : false},
    {code : 'HC02', name :'Physics and Mathematics', downloaded : false},
    {code : 'HC03', name :'Rest and Motion Kinematics', downloaded : false},
    {code : 'HC04', name :'The Force', downloaded : false},
    {code : 'HC05', name :'Newtons Law of Motion', downloaded : false},
    {code : 'HC06', name :'Friction', downloaded : false},
    {code : 'HC07', name :'Circular Motion', downloaded : false},
    {code : 'HC08', name :'Work and Energy', downloaded : false},
    {code : 'HC09', name :'Centre of Mass, Linear Momentum, Collision', downloaded : false},
    {code : 'HC10', name :'Rotational Mechanics', downloaded : false},
    {code : 'HC11', name :'Gravitation', downloaded : false},
    {code : 'HC12', name :'Simple Harmonics Motion', downloaded : false},
    {code : 'HC13', name :'Fluid Mechanics', downloaded : false},
    {code : 'HC14', name :'Some Mechanical Properties of Matter', downloaded : false},
    {code : 'HC15', name :'Waves Motion and Waves on a String', downloaded : false},
    {code : 'HC16', name :'Sound Waves', downloaded : false},
    {code : 'HC17', name :'Light Waves', downloaded : false},
    {code : 'HC18', name :'Geometrical Optics', downloaded : false},
    {code : 'HC19', name :'Optical Instruments', downloaded : false},
    {code : 'HC20', name :'Dispersion and Spectra', downloaded : false},
    {code : 'HC21', name :'Speed of Light', downloaded : false},
    {code : 'HC22', name :'Photometry', downloaded : false}
   ];

   vol2Chapters : Book[] =[
    {code : 'HC23', name : 'Heat and Temperature', downloaded : false},
    {code : 'HC24' , name : 'Kinetic Theory of Gases', downloaded : false},
    {code : 'HC25', name : 'Calirometry Chapter', downloaded : false},
    {code : 'HC26', name : 'Laws of Thermodynamics', downloaded : false},
    {code : 'HC27', name : 'Specific Heat Capacities of Gases', downloaded : false},
    {code : 'HC28', name : 'Heat Transfer', downloaded : false},
    {code : 'HC29', name : 'Electric Field and Potential', downloaded : false},
    {code : 'HC30', name : 'Gauss Law', downloaded : false},
    {code : 'HC31', name : 'Capacitors', downloaded : false},
    {code : 'HC32', name : 'Electric Current in Conductors', downloaded : false},
    {code : 'HC33', name : 'Thermal and Chemical Effect of Current', downloaded : false},
    {code : 'HC34', name : 'Magnetic Field', downloaded : false},
    {code : 'HC35', name : 'Magnetic Field due to a Current', downloaded : false},
    {code : 'HC36', name : 'Permanent Magnets', downloaded : false},
    {code : 'HC37', name : 'Magnetic Properties of Matter', downloaded : false},
    {code : 'HC38', name : 'Electromagnetic Induction', downloaded : false},
    {code : 'HC39', name : 'Alternating Current', downloaded : false},
    {code : 'HC40', name : 'Electromagnetic Waves', downloaded : false},
    {code : 'HC41', name : 'Electric Current through Gases', downloaded : false},
    {code : 'HC42', name : 'Photoelectric Effect and Wave Particle Duality', downloaded : false},
    {code : 'HC43', name : "Bohr's Model and Physics of Atom", downloaded : false},
    {code : 'HC44', name : 'X-rays', downloaded : false},
    {code : 'HC45', name : 'Semiconductors and Semiconductor Devices', downloaded : false},
    {code : 'HC46', name : 'The Nucleus', downloaded : false},
    {code : 'HC47', name : 'The Special Theory of Relativity', downloaded : false}
   ];
   tempVol1Chapters : Book[] = this.vol1Chapters;
   tempVol2Chapters : Book[] = this.vol2Chapters;
   isDeleteOpen : boolean = false;
   selectedBook : string = '';
   isDeleteAllOpen : boolean = false;
   alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.updateChaptersArray(this.selectedBook)
       this.isDeleteOpen = false;
      },
    },
  ];
  deleteAllAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.deleteAll()
      },
    },
  ];

  ngOnInit() {
    this.storage.init()
    this.storage.getAllFromStorage().subscribe({
      next : data => {
        if(data.length>0){
          if(this.book === 'vol1'){
            this.tempVol1Chapters = this.vol1Chapters.map(c =>{
              if(data.includes(c.code)){
                return {
                  ...c,
                  downloaded : true
                }
              }else{
                return c
              }
            })
          }else{
            this.tempVol2Chapters = this.vol2Chapters.map(c =>{
              if(data.includes(c.code)){
                return {
                  ...c,
                  downloaded : true
                }
              }else{
                return c
              }
            })
          }
          this.storedKeys = data
        }
      },
      error : err => {}
    })      
  }

  openDeleteAlert(isDelete : boolean, bookCode? : string){
    this.isDeleteOpen = isDelete;
    this.selectedBook = bookCode ?? '';
  }

  updateChaptersArray(selectedBook : string){
    this.storage.removeSingleKey(selectedBook);

    if(this.book === 'vol1'){
      this.tempVol1Chapters = this.tempVol1Chapters.map(c =>{
        if(c.code === selectedBook ){
          return {
            ...c,
            downloaded : false
          }
        }else{
          return c
        }
      })
    }else{
      this.tempVol2Chapters = this.tempVol2Chapters.map(c =>{
        if(c.code === selectedBook){
          return {
            ...c,
            downloaded : false
          }
        }else{
          return c
        }
      })
    }
    this.selectedBook = '';
  }

  deleteAll(){
    this.storage.clearAllRecords();
    this.isDeleteAllOpen = false
    if(this.book === 'vol1'){
      this.tempVol1Chapters = this.vol1Chapters;
    }else{
      this.tempVol2Chapters = this.vol2Chapters
    }
  }

  async displayToast(s : any) {
    const toast = await this.toastController.create({
      message: s,
      duration: 2500,
      position: 'middle',
    });

    await toast.present();
  }

  showBanner(){
  
    AdmobAds.showBannerAd({ adId: "ca-app-pub-3940256099942544/9214589741", isTesting: true, adSize: BannerSize.BANNER, adPosition: BannerPosition.BOTTOM }).then(() => {
   }).catch(err => {
   });
  }

  loadInterAd(){
    AdmobAds.loadInterstitialAd({ adId: "ca-app-pub-3940256099942544/1033173712", isTesting: true }).then(() => {
    
   }).catch(err => {
     
   });
  }

  showInterAd(){
    AdmobAds.showInterstitialAd().then(()=>{
    }).catch(err => {
   });
  }
  
}

 

interface Book {
  code : string,
  name : string,
  downloaded : boolean
}
