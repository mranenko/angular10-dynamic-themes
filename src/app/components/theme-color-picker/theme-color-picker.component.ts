import {Component, OnInit} from '@angular/core';

/* App services */
import {ThemeService} from '../../services/theme.service';


@Component({
  selector: 'app-theme-color-picker',
  templateUrl: './theme-color-picker.component.html',
  styleUrls: ['./theme-color-picker.component.scss']
})
export class ThemeColorPickerComponent implements OnInit {
  colorPrimary: string;
  colorAccent: string;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.initializeColorInputs();
  }


  /*
    Event handlers
   */

  onColorPrimaryInput(): void {
    this.themeService.updateColorPrimary(this.colorPrimary);
  }

  onColorAccentInput(): void {
    this.themeService.updateColorAccent(this.colorAccent);
  }

  onThemeReset(event: Event): void {
    event.preventDefault();
    this.themeService.reset();
    this.initializeColorInputs();
  }

  onThemeSave(event: Event): void {
    event.preventDefault();
    this.themeService.save();
  }


  /*
    Private methods
   */

  private initializeColorInputs(): void {
    this.colorPrimary = this.themeService.colorPrimary;
    this.colorAccent = this.themeService.colorAccent;
  }
}
