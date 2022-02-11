import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent {
  @Input() placeholder: string = 'need professionals help';
  @Input() contentWidth: number = 800;
  @Input() contentHeight: number = 600;
  constructor() {}
}
