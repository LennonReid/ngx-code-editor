import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CodeEditorAppComponent} from "ngx-code-editor";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /* baseHref path */
  @Input() baseUrl: string = environment.production?'ngx-code-editor':'';
  /* default language */
  language: string = 'java';
  /* default theme */
  theme: string = 'vs';
  /* default value of the content */
  defaultValue = '';

  @ViewChild(CodeEditorAppComponent) codeEditorApp?: CodeEditorAppComponent;

  constructor() {
  }

  /**
   * switch the code language
   */
  languageChange() {
    this.defaultValue = '';
    this.codeEditorApp?.setValue('test');
  }

  async ngOnInit() {
    // optional
    await this.codeEditorApp?.ngOnInit();
  }

  /**
   * get current value
   */
  getValue() {
    console.log(this.codeEditorApp?.getValue());
  }

  /**
   * listen value changes
   * @param res value
   */
  contentChange(res: string) {
    console.log(res);
  }
}
