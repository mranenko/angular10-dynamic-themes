import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-theme-color-picker',
  templateUrl: './theme-color-picker.component.html',
  styleUrls: ['./theme-color-picker.component.scss']
})
export class ThemeColorPickerComponent implements OnInit {
  colorPrimary: string = '#297373';
  colorAccent: string = '#ff8552';

  constructor() {
  }

  ngOnInit(): void {
  }


  /*
    Event handlers
   */

  onColorPrimaryInput(event: Event): void {

  }

  onColorAccentInput(event: Event): void {

  }

  onThemeReset(event: Event): void {

  }

  onThemeSave(event: Event): void {

  }
}
