import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {CodeEditorAppModule} from "@ngx-code-editor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, CodeEditorAppModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
