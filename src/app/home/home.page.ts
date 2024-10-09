import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  component = DashboardComponent;
  constructor(private navCntrl : NavController) {}

  // openChaptersList(book : string){
  //   if(book === 'vol1'){
  //     this.navCntrl.push(DashboardComponent,)
  //   }
  // }
  ngOnInit(){
  }

}
