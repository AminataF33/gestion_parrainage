import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    AccueilComponent
  ]
})
export class AppModule { }
