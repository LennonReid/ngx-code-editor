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
  @Input() baseUrl: string = environment.production ? '/ngx-code-editor' : '';
  /* default language */
  language: string = 'javascript';
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
    setTimeout(() => {
      this.defaultValue = 'let data = [1,2,3,4,5];\n' +
        'console.log(...data);\n' +
        '// --> 1 2 3 4 5\n' +
        'let data2 = [6,7,8,9,10];\n' +
        'let combined = [...data, ...data2];\n' +
        'console.log(...combined);\n' +
        '// --> 1 2 3 4 5 6 7 8 9 10\n' +
        'console.log(Math.max(...combined));\n' +
        '// --> 10';
    }, 2000);
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
