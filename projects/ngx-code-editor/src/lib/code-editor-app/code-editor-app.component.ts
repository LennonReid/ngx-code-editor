import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {LoadMonacoEditor} from "../utils/load-monaco-editor";
import {getBaseMonacoUrl} from "../utils/base-url";

let loader: LoadMonacoEditor;

@Component({
  selector: 'ngx-code-editor-app',
  templateUrl: './code-editor-app.component.html',
  styleUrls: ['./code-editor-app.component.scss']
})
export class CodeEditorAppComponent implements OnInit {
  /* default path */
  @Input() baseUrl?: string;
  /**
   * According to current browser to get current language
   * @example  'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw'
   */
  @Input() localizeCode?: string;
  /* default code language */
  @Input() language: string = 'java';
  /* default theme */
  @Input() theme: string = 'vs';
  /* default code value */
  @Input() defaultValue?: string;
  /* width of conetnt area need a fixed value */
  @Input() contentWidth: number = 800;
  /* height of conetnt area need a fixed value */
  @Input() contentHeight: number = 600;
  // Event when the value of conetnt change
  @Output() contentChange = new EventEmitter<string>();
  /* the label of switch language */
  @Input() languageLabel: string = 'CodeLanguages';
  /* the label of switch theme */
  @Input() themeLabel: string = 'Themes';

  constructor() {}
  async ngOnInit() {
    const baseUrl = getBaseMonacoUrl(this.baseUrl);
    if (!loader) {
      loader = new LoadMonacoEditor(baseUrl, this.language, this.theme, this.defaultValue, this.localizeCode);
    }
    await loader.load();
    // listen the change of keyUp and output the value
    const win = window as any;
    win.rgCodeEditor.onKeyUp((res: any) => {
      this.contentChange.next(res?.target?.value);
    });
  }

  /**
   * switch theme
   */
  themeChange() {
    const win = window as any;
    win.monaco.editor.setTheme(this.theme);
  }

  /**
   * switch code language
   */
  languageChange() {
    const win = window as any;
    win.monaco.editor.setModelLanguage(win.rgCodeEditor.getModel(), this.language);
  }

  /**
   * get current code value
   */
  getValue(): string {
    const win = window as any;
    const value = win.rgCodeEditor.getValue();
    return value;
  }
}
