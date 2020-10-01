import {Component, OnInit} from '@angular/core';

/* App services */
import {RootService} from '../../services/root.service';


@Component({
  selector: 'app-theme-color-picker',
  templateUrl: './theme-color-picker.component.html',
  styleUrls: ['./theme-color-picker.component.scss']
})
export class ThemeColorPickerComponent implements OnInit {
  colorPrimary: string;
  colorAccent: string;

  constructor(private rootService: RootService) {
  }

  ngOnInit(): void {
    this.colorPrimary = this.rootService.get('--color-primary');
    this.colorAccent = this.rootService.get('--color-accent');
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
