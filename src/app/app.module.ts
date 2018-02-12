import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatToolbarModule, MatSnackBarModule } from '@angular/material';
import { MultiselectModule } from './multiselect/multiselect.module';

import { CryptoService } from './crypto.service';
import { MainContainerComponent } from './main-container/main-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MultiselectModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
