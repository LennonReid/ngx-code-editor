import {
  Component,
  EventEmitter, Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {LoadMonacoEditor} from "../utils/load-monaco-editor";
import {getBaseMonacoUrl} from "../utils/base-url";
import {BehaviorSubject} from "rxjs";
import {ICodeEditorOptions, NGX_CODE_EDITOR} from "../interfaces/code-editor.interface";
import {LocationStrategy} from "@angular/common";

let loader: LoadMonacoEditor;

@Component({
  selector: 'ngx-code-editor-app',
  templateUrl: './code-editor-app.component.html',
  styleUrls: ['./code-editor-app.component.scss']
})
export class CodeEditorAppComponent implements OnInit, OnDestroy {
  /* default path */
  @Input() baseUrl?: string;
  /**
   * According to current browser to get current language
   * @example  'de' | 'es' | 'fr' | 'it' | 'ja' | 'ko' | 'ru' | 'zh-cn' | 'zh-tw'
   */
  @Input() localizeCode?: string;
  /* default code language */
  language$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _language = '';
  get language() {
    return this._language;
  }

  @Input() set language(language: string) {
    this.language$.next(language);
    this._language = language;
  }

  /* default theme */
  theme$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _theme = 'vs';
  get theme() {
    return this._theme;
  }

  @Input() set theme(theme: string) {
    this.theme$.next(theme);
    this._theme = theme;
  }

  /* default code value */
  defaultValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _defaultValue = '';
  get defaultValue() {
    return this._defaultValue;
  }

  @Input() set defaultValue(defaultValue: string) {
    this.defaultValue$.next(defaultValue);
    this._defaultValue = defaultValue;
  }

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
  /* customize the selelection Area */
  @Input() selection?: TemplateRef<any>;

  constructor(
    private locationStrategy: LocationStrategy
  ) {
  }

  ngOnDestroy() {
    this.language$?.unsubscribe();
    this.theme$?.unsubscribe();
    this.defaultValue$?.unsubscribe();
  }

  async ngOnInit() {
    const win = window as any;
    const baseUrl = getBaseMonacoUrl(this.baseUrl || this.locationStrategy.getBaseHref());
    if (!loader) {
      loader = new LoadMonacoEditor(baseUrl, this.language, this.theme, this.defaultValue, this.localizeCode);
    }
    await loader.load();
    // call function to create code-editor every time
    loader.createMonacoEditor();

    // listen changes of the conetnt and emit the current value
    win.rgCodeEditor?.onDidChangeModelContent((res: any) => {
      this.contentChange.next(this.getValue());
    });

    this.language$.subscribe(language => {
      this.languageChange(language);
    });
    this.theme$.subscribe(theme => {
      this.themeChange(theme);
    });
    this.defaultValue$.subscribe(defaultValue => {
      this.setValue(defaultValue);
    });
  }

  /**
   * switch theme
   */
  themeChange(theme: string) {
    const win = window as any;
    win.monaco?.editor?.setTheme(theme || this.theme);
  }

  /**
   * switch code language
   */
  languageChange(language: string) {
    const win = window as any;
    win.monaco?.editor?.setModelLanguage(win.ngxCodeEditor?.getModel(), language || this.language);
  }

  /**
   * get current code value
   */
  getValue(): string {
    const win = window as any;
    const value = win.ngxCodeEditor?.getValue();
    return value;
  }

  /**
   * set the value of content
   */
  setValue(value?: string) {
    const win = window as any;
    win.ngxCodeEditor?.setValue(value || this.defaultValue);
  }
}
