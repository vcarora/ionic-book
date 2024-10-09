import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ChaptersComponent } from './chapters/chapters.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [
    HomePage,
    DashboardComponent,
    ChaptersComponent

  ]
})
export class HomePageModule {}
