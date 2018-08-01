import { Component } from '@angular/core';
declare function require(path: string);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'docks-angular';
  docs = require('../../docks/docks.json')
}
