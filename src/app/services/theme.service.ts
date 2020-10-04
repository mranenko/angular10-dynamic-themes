import {Injectable} from '@angular/core';

/* App services */
import {ColorService} from './color.service';
import {RootService} from './root.service';
import {StorageService} from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly key = {
    colorPrimary: '--color-primary',
    colorAccent: '--color-accent',
  };

  colorPrimary: string = '';
  colorAccent: string = '';

  constructor(private colorService: ColorService,
              private rootService: RootService,
              private storageService: StorageService) {
  }

  initializeTheme(): void {
    this.colorPrimary = this.getColor(this.key.colorPrimary);
    this.colorAccent = this.getColor(this.key.colorAccent);

    /* set primary/accent colors and contrast colors */
    this.setColorAndContrast(this.key.colorPrimary, this.colorPrimary);
    this.setColorAndContrast(this.key.colorAccent, this.colorAccent);

    /* set primary/accent color scales and contrast colors */
    this.setColorScaleAndContrast(this.key.colorPrimary, this.colorPrimary);
    this.setColorScaleAndContrast(this.key.colorAccent, this.colorAccent);
  }

  getColor(key: string): string {
    return this.storageService.get(key) || this.rootService.get(key);
  }

  setColorAndContrast(key: string, value: string): void {
    this.rootService.set(key, value);
    this.rootService.set(`${key}-contrast`, this.colorService.contrast(value));
  }

  setColorScaleAndContrast(key: string, value: string): void {
    const scale = {
      50: this.colorService.level(value, 50),
      100: this.colorService.level(value, 100),
      200: this.colorService.level(value, 200),
      300: this.colorService.level(value, 300),
      400: this.colorService.level(value, 400),
      500: this.colorService.level(value, 500),
      600: this.colorService.level(value, 600),
      700: this.colorService.level(value, 700),
      800: this.colorService.level(value, 800),
      900: this.colorService.level(value, 900),
    };

    this.setColorAndContrast(`${key}-50`, scale[50]);
    this.setColorAndContrast(`${key}-100`, scale[100]);
    this.setColorAndContrast(`${key}-200`, scale[200]);
    this.setColorAndContrast(`${key}-300`, scale[300]);
    this.setColorAndContrast(`${key}-400`, scale[400]);
    this.setColorAndContrast(`${key}-500`, scale[500]);
    this.setColorAndContrast(`${key}-600`, scale[600]);
    this.setColorAndContrast(`${key}-700`, scale[700]);
    this.setColorAndContrast(`${key}-800`, scale[800]);
    this.setColorAndContrast(`${key}-900`, scale[900]);
  }

  updateColorPrimary(value: string): void {
    this.colorPrimary = value;
    this.setColorAndContrast(this.key.colorPrimary, value);
    this.setColorScaleAndContrast(this.key.colorPrimary, value);
  }

  updateColorAccent(value: string): void {
    this.colorAccent = value;
    this.setColorAndContrast(this.key.colorAccent, value);
    this.setColorScaleAndContrast(this.key.colorAccent, value);
  }

  reset(): void {
    /* clear saved theme colors */
    this.storageService.remove(this.key.colorPrimary);
    this.storageService.remove(this.key.colorAccent);

    /* clear calculated root theme colors */
    this.rootService.clear();

    /* re-initialize theme colors */
    this.initializeTheme();
  }

  save(): void {
    this.storageService.set(this.key.colorPrimary, this.colorPrimary);
    this.storageService.set(this.key.colorAccent, this.colorAccent);
  }
}
