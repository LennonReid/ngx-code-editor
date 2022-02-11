# ngx-code-editor
The version of Angular based on [monaco-editor](https://www.npmjs.com/package/monaco-editor) and [monaco-ace-tokenizer](https://www.npmjs.com/package/monaco-ace-tokenizer)
```
npm i ngx-code-editor monaco-editor monaco-ace-tokenizer
```
or
```
yarn add  ngx-code-editor monaco-editor monaco-ace-tokenizer
```
## get-started

### 1. Project. Json or angular.json of the required app

Add it to assets

```json

{
  "glob": "**/*",
  "input": "./node_modules/monaco-editor",
  "output": "monaco-editor/"
},
{
"glob": "**/*",
"input": "./node_modules/monaco-ace-tokenizer",
"output": "monaco-ace-tokenizer/"
}
```

examples:

```json
{
  "projectType": "application",
  "root": "apps/dev-code-editor",
  "sourceRoot": "apps/dev-code-editor/src",
  "prefix": "app",
  "targets": {
    "build": {
      "executor": "@angular-devkit/build-angular:browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/apps/dev-code-editor",
        "index": "apps/dev-code-editor/src/index.html",
        "main": "apps/dev-code-editor/src/main.ts",
        "polyfills": "apps/dev-code-editor/src/polyfills.ts",
        "tsConfig": "apps/dev-code-editor/tsconfig.app.json",
        "inlineStyleLanguage": "scss",
        "assets": [
          "apps/dev-code-editor/src/favicon.ico",
          "apps/dev-code-editor/src/assets",
+          {
+            "glob": "**/*",
+            "input": "./node_modules/monaco-editor",
+            "output": "monaco-editor/"
+          },
+          {
+            "glob": "**/*",
+            "input": "./node_modules/monaco-ace-tokenizer",
+            "output": "monaco-ace-tokenizer/"
+          }
        ],
        "styles": ["apps/dev-code-editor/src/styles.scss"],
        "scripts": []
      },
      "configurations": {
        "production": {
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "500kb",
              "maximumError": "1mb"
            },
            {
              "type": "anyComponentStyle",
              "maximumWarning": "2kb",
              "maximumError": "4kb"
            }
          ],
          "fileReplacements": [
            {
              "replace": "apps/dev-code-editor/src/environments/environment.ts",
              "with": "apps/dev-code-editor/src/environments/environment.prod.ts"
            }
          ],
          "outputHashing": "all"
        },
        "development": {
          "buildOptimizer": false,
          "optimization": false,
          "vendorChunk": true,
          "extractLicenses": false,
          "sourceMap": true,
          "namedChunks": true
        }
      },
      "defaultConfiguration": "production"
    },
    "serve": {
      "executor": "@angular-devkit/build-angular:dev-server",
      "configurations": {
        "production": {
          "browserTarget": "dev-code-editor:build:production"
        },
        "development": {
          "browserTarget": "dev-code-editor:build:development"
        }
      },
      "defaultConfiguration": "development"
    },
    "extract-i18n": {
      "executor": "@angular-devkit/build-angular:extract-i18n",
      "options": {
        "browserTarget": "dev-code-editor:build"
      }
    },
    "lint": {
      "executor": "@nrwl/linter:eslint",
      "options": {
        "lintFilePatterns": ["apps/dev-code-editor/src/**/*.ts", "apps/dev-code-editor/src/**/*.html"]
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "outputs": ["coverage/apps/dev-code-editor"],
      "options": {
        "jestConfig": "apps/dev-code-editor/jest.config.js",
        "passWithNoTests": true
      }
    }
  },
  "tags": ["angular-app"]
}
```

These variables are used when the module is loaded.

### 2. Import in required modules

examples:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CodeEditorAppModule } from 'ngx-code-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, +FormsModule, +CodeEditorAppModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### 3. in html file

examples:

```html
<ngx-code-editor-app (contentChange)="contentChange($event)"></ngx-code-editor-app>
```

### 4. in ts file

examples:

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeEditorAppComponent } from 'ngx-code-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(CodeEditorAppComponent) codeEditorApp?: CodeEditorAppComponent;

  constructor() {}

  /* Note that you must wait for the initialization to complete in the CodeEditorAppComponent, otherwise an error will be reported and it will be used before it is initialized。
  async ngOnInit() {
    await this.codeEditorApp?.ngOnInit();
  }

  /**
   * get value
   */
  getValue() {
    console.log(this.codeEditorApp?.getValue());
  }

  /**
   * Listen for content change values
   * @param res value
   */
  contentChange(res: string) {
    console.log(res);
  }
}
```

## content of repository

### core and function

#### core module

> - code-editor/
    >   > This folder is the core file, just render the code content area, not involve any other functions
    >   >
    >   > > Mainly involved in functions
    >   > >
    >   > > 1. height,default 800px
    >   > > 2. width,default 600px
    >   > > 3. placeholder----<i>not supported now</b>
> - utils/
    >   > The core algorithm files are in this folder
    >   >
    >   > > Mainly involved content
    >   > >
    >   > > 1. base-url => get default url
    >   > > 2. load-monaco-editor => moaco loader
    >   > > 3. urlJoin => join string path

#### function module

> code-editor-app/
>
> > directory for function，Business encapsulation of code-Editor
> >
> > > Main functions
> > >
> > > 1. customize the width and height of the code editor area
> > > 2. get timezone from browser
> > > 3. customize default language
> > > 4. customize default theme
> > > 5. listen the change of content value
> > > 6. get currnet value
> > > 7. switch languages and themes
> > >
> > > - supported code language

```html
<option value="java">java</option>
<option value="javascript">javascript</option>
<option value="json">json</option>
<option value="sql">sql</option>
<option value="groovy">groovy</option>
<option value="plaintext">plaintext</option>
<option value="abap">abap</option>
<option value="apex">apex</option>
<option value="azcli">azcli</option>
<option value="bat">bat</option>
<option value="bicep">bicep</option>
<option value="cameligo">cameligo</option>
<option value="clojure">clojure</option>
<option value="coffeescript">coffeescript</option>
<option value="c">c</option>
<option value="cpp">cpp</option>
<option value="csharp">csharp</option>
<option value="csp">csp</option>
<option value="css">css</option>
<option value="dart">dart</option>
<option value="dockerfile">dockerfile</option>
<option value="ecl">ecl</option>
<option value="elixir">elixir</option>
<option value="flow9">flow9</option>
<option value="fsharp">fsharp</option>
<option value="go">go</option>
<option value="graphql">graphql</option>
<option value="handlebars">handlebars</option>
<option value="hcl">hcl</option>
<option value="html">html</option>
<option value="ini">ini</option>
<option value="julia">julia</option>
<option value="kotlin">kotlin</option>
<option value="less">less</option>
<option value="lexon">lexon</option>
<option value="liquid">liquid</option>
<option value="lua">lua</option>
<option value="m3">m3</option>
<option value="markdown">markdown</option>
<option value="mips">mips</option>
<option value="msdax">msdax</option>
<option value="mysql">mysql</option>
<option value="objective-c">objective-c</option>
<option value="pascal">pascal</option>
<option value="pascaligo">pascaligo</option>
<option value="perl">perl</option>
<option value="pgsql">pgsql</option>
<option value="php">php</option>
<option value="pla">pla</option>
<option value="postiats">postiats</option>
<option value="powerquery">powerquery</option>
<option value="powershell">powershell</option>
<option value="proto">proto</option>
<option value="pug">pug</option>
<option value="python">python</option>
<option value="qsharp">qsharp</option>
<option value="r">r</option>
<option value="razor">razor</option>
<option value="redis">redis</option>
<option value="redshift">redshift</option>
<option value="restructuredtext">restructuredtext</option>
<option value="ruby">ruby</option>
<option value="rust">rust</option>
<option value="sb">sb</option>
<option value="scala">scala</option>
<option value="scheme">scheme</option>
<option value="scss">scss</option>
<option value="shell">shell</option>
<option value="sol">sol</option>
<option value="aes">aes</option>
<option value="sparql">sparql</option>
<option value="st">st</option>
<option value="swift">swift</option>
<option value="systemverilog">systemverilog</option>
<option value="verilog">verilog</option>
<option value="tcl">tcl</option>
<option value="twig">twig</option>
<option value="typescript">typescript</option>
<option value="vb">vb</option>
<option value="xml">xml</option>
<option value="yaml">yaml</option>
<option value="ada">ada</option>
<option value="cobol">cobol</option>
<option value="d">d</option>
<option value="dart">dart</option>
<option value="elixir">elixir</option>
<option value="erlang">erlang</option>
<option value="fortran">fortran</option>
<option value="haskell">haskell</option>
<option value="julia">julia</option>
<option value="ocaml">ocaml</option>
<option value="racket">racket</option>
<option value="sbcl">sbcl</option>
<option value="scala">scala</option>
```

> > > 8. Switch Current Theme
> > >
> > > - below is supported themes now(need extends to [demo](https://aeditor.bitwiser.in/))

```html
<option value="vs">VS</option>
<option value="vs-dark">VS Dark</option>
<option value="hc-black">High Contrast (Dark)</option>
```

## API

| Name            | Type     | Default | Output   | description                         |
| ----- | -------- | ------ | ------ | -------------- |
| [baseUrl]       | string   | ""     | ----   | assets default url     |
| [localizeCode]  | string   | ""     | ----   | localizeCode from browser |
| [language]      | string   | "java" | ----   | default language                     |
| [theme]         | string   | "vs"   | ----   | default theme                     |
| [defaultValue]  | string   | ""     | ----   | default code value                     |
| [contentWidth]  | number   | 800    | ----   | width of conetnt area need a fixed value               |
| [contentHeight] | number   | 600    | ----   | height of conetnt area need a fixed value               |
| (contentChange) | Function | ""     | string | Event when the value of conetnt change                 |
