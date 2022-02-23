import { InjectionToken } from '@angular/core';

export interface ICodeEditorOptions {
  resourcesUrl: string;
  production?: boolean;
}

export const NGX_CODE_EDITOR = new InjectionToken<ICodeEditorOptions>('NGX_CODE_EDITOR');
