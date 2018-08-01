import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DocksModule } from '../modules/docks/docks.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DocksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
