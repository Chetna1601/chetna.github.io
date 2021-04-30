import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WebEditor';
  htmlContent = '';
  showButton = true;
  historyText: Content[] = [];
  showhistory = false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  txtQuery: string; // bind this to input with ngModel
  txtQueryChanged: Subject<string> = new Subject<string>();

  constructor() {
    let changetext = this.txtQueryChanged.pipe(debounceTime(3000), distinctUntilChanged()).subscribe( model => {
      let text : Content = {content: model, time: new Date()}
      this.historyText.push(text);
    })
  }

  onFieldChange(query:string){
    this.txtQueryChanged.next(query);
  }

  onClick() {
    this.showButton = false;
  }

  showChangeHistory() {
    this.showhistory = true;
  }
}

export interface Content {
  content: string;
  time: Date;
}
