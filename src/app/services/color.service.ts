import {Injectable} from '@angular/core';

/* App services */
import {RootService} from './root.service';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  readonly colorInterval = {
    50: 88,
    100: 70,
    200: 50,
    300: 30,
    400: 15,
    500: 0,
    600: 13,
    700: 30,
    800: 46,
    900: 65,
  };

  constructor(private rootService: RootService) {
  }

  shade(color, percentage): string {
    return this.mix('#000000', color, percentage);
  }

  tint(color, percentage): string {
    return this.mix('#ffffff', color, percentage);
  }

  mix(color1, color2, percentage): string {
    /* remove leading '#' */
    color1 = color1.replace(/#/g, '');
    color2 = color2.replace(/#/g, '');

    /* decimal -> hex and hex -> decimal conversions */
    function d2h(d): string {
      return d.toString(16);
    }

    function h2d(h): number {
      return parseInt(h, 16);
    }

    let colorMix = '#';

    /* loop through 3 hex pairs: red, green, and blue */
    for (let i = 0; i < 6; i += 2) {
      const d1 = h2d(color1.substr(i, 2));
      const d2 = h2d(color2.substr(i, 2));

      let h = d2h(Math.round(d2 + (d1 - d2) * (percentage / 100.0)));

      /* prepend a '0' if h has only one digit */
      if (h.length < 2) {
        h = '0' + h;
      }

      colorMix += h;
    }

    return colorMix;
  }

  contrast(colorHex,
           colorBlackHex = this.rootService.get('--color-black'),
           colorWhiteHex = this.rootService.get('--color-white')): string {
    return this.lightness(colorHex) > 75 ? colorBlackHex : colorWhiteHex;
  }

  lightness(colorHex): number {
    const hexToRgb = (hex) => {
      return {
        red: 100 * (parseInt(`0x${hex[1]}${hex[2]}`, 16) / 255),
        green: 100 * (parseInt(`0x${hex[3]}${hex[4]}`, 16) / 255),
        blue: 100 * (parseInt(`0x${hex[5]}${hex[6]}`, 16) / 255)
      };
    };

    const {red, green, blue} = hexToRgb(colorHex);
    return Math.round((Math.max(red, green, blue) + Math.min(red, green, blue)) / 2);
  }

  level(colorHex, level): string {
    if (level > 500) {
      return this.shade(colorHex, this.colorInterval[level]);
    }
    else if (level < 500) {
      return this.tint(colorHex, this.colorInterval[level]);
    }
    else {
      return colorHex;
    }
  }
}
