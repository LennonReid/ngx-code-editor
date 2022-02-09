import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorAppComponent } from './code-editor-app.component';

describe('CodeEditorAppComponent', () => {
  let component: CodeEditorAppComponent;
  let fixture: ComponentFixture<CodeEditorAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CodeEditorAppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
