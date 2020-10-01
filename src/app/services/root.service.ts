import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class RootService {
  constructor() {
  }

  get(property: string): string {
    property = property || '';

    return property ? getComputedStyle(document.documentElement).getPropertyValue(property) : '';
  }

  set(property, value): void {
    property = property || '';
    value = value || '';

    if (property) {
      document.documentElement.style.setProperty(property, value);
    }
  }

  clear(): void {
    document.documentElement.removeAttribute('style');
  }
}
