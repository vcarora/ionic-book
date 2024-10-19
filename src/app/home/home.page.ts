import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavController, ToastController } from '@ionic/angular';
import { AdmobAds, BannerPosition, BannerSize } from "capacitor-admob-ads";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  component = DashboardComponent;
  isAdLoaded : boolean = false;
  constructor(private navCntrl : NavController,private toastController: ToastController) {}
  ngOnInit(){
  }

  showBanner(){
    if(!this.isAdLoaded){
      AdmobAds.showBannerAd({ adId: "ca-app-pub-3940256099942544/9214589741", 
        isTesting: false, 
        adSize: BannerSize.BANNER,
        adPosition: BannerPosition.BOTTOM }).then(() => {
        this.isAdLoaded = true;
     }).catch(err => {
       this.isAdLoaded = false
     });
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
}
