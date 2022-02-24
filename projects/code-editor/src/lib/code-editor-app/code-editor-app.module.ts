import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeEditorAppComponent} from './code-editor-app.component';
import {FormsModule} from '@angular/forms';
import {CodeEditorModule} from "../code-editor.module";

@NgModule({
  declarations: [CodeEditorAppComponent],
  imports: [CommonModule, FormsModule, CodeEditorModule],
  exports: [CodeEditorAppComponent]
})
export class CodeEditorAppModule {
}
