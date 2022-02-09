import { Component, OnInit, ViewChild } from '@angular/core';
import {CodeEditorAppComponent} from "@ngx-code-editor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(CodeEditorAppComponent) codeEditorApp?: CodeEditorAppComponent;

  constructor() {}

  async ngOnInit() {
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
