import { urlJoin } from './urlJoin';

// noinspection TypeScriptUnresolvedVariable
/**
 * moaco loader
 */
export class LoadMonacoEditor {
  #load?: Promise<void>;
  protected supportLanguages = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'ru', 'zh-cn', 'zh-tw'];

  constructor(
    private baseUrl: string,
    private language: string,
    private theme?: string,
    private defaultValue?: string,
    private localizeCode?: string
  ) {}

  /**
   * the language in current nation
   * @protected
   */
  protected currentLanguage() {
    try {
      const lang = navigator.language.toLocaleLowerCase();
      const findLang = this.supportLanguages.find(l => lang === l) || '';
      if (lang && !findLang) {
        console.error(`not support language ${lang}`);
      }
      return findLang;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  load() {
    if (!this.#load) {
      this.#load = new Promise<void>(resolve => {
        const win = window as any;
        // if (typeof win.monaco === 'object') {
        //   resolve();
        //   return;
        // }
        const onGotAMDLoader = () => {
          win.require.config({
            paths: {
              vs: 'monaco-editor/min/vs',
              tokenizer: 'monaco-ace-tokenizer/dist'
            },
            'vs/nls': {
              availableLanguages: {
                '*': this.localizeCode || this.currentLanguage()
              }
            }
          });
          win.require(
            ['vs/editor/editor.main', 'tokenizer/monaco-tokenizer', 'tokenizer/definitions/groovy'],
            (a: any, MonacoAceTokenizer: any, GroovyDefinition: any) => {
              win.monaco.languages.register({
                id: 'groovy'
              });
              MonacoAceTokenizer.registerRulesForLanguage('groovy', new GroovyDefinition.default());
              // /* To load All languages */
              // win.require(['vs/editor/editor.main', 'tokenizer/monaco-tokenizer'], (_: any, MonacoAceTokenizer: any) =>{
              //   MonacoAceTokenizer.AVAILABLE_LANGUAGES.forEach((lang: string) => {
              //     win.require(['tokenizer/definitions/' + lang], (LangDefinition: any) =>{
              //       win.monaco.languages.register({
              //         id: lang,
              //       });
              //       MonacoAceTokenizer.registerRulesForLanguage(lang, new LangDefinition.default);
              //     });
              //   });
              // });
              resolve();
            }
          );
        };
        if (!win.require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.id = 'ngx-code-editor-load-monaco-script';
          loaderScript.type = 'text/javascript';
          console.log(urlJoin(this.baseUrl, 'monaco-editor/min/vs/loader.js'));
          loaderScript.src = urlJoin(this.baseUrl, 'monaco-editor/min/vs/loader.js');
          console.log(urlJoin(this.baseUrl, 'monaco-editor/min/vs/loader.js'));
          loaderScript.addEventListener('load', onGotAMDLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAMDLoader();
        }
      });
    }
    return this.#load;
  }
  /**
   * create the monaco-edtior by the dom
   */
  createMonacoEditor() {
    const win = window as any;
    win.ngxCodeEditor = win.monaco.editor.create(document.getElementById('ngx-code-editor-container'), {
      // todo: options from params
      value: this.defaultValue,
      automaticLayout: true,
      wordWrap: 'on',
      autoClosingBrackets: 'beforeWhitespace',
      autoClosingQuotes: 'beforeWhitespace',
      smoothScrolling: true,
      suggestFontSize: 16,
      language: this.language,
      theme: this.theme
    });
  }
}
