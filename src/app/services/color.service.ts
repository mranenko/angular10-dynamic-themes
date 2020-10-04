import {Injectable} from '@angular/core';


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

  constructor() {
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

    /* convert decimal -> hex and hex -> decimal */
    const decToHex = (dec) => dec.toString(16);
    const hexToDec = (hex) => parseInt(hex, 16);

    let colorMix = '#';

    /* loop through 3 hex pairs: red, green, and blue */
    for (let i = 0; i < 6; i += 2) {
      const dec1 = hexToDec(color1.substr(i, 2));
      const dec2 = hexToDec(color2.substr(i, 2));

      let hex = decToHex(Math.round(dec2 + (dec1 - dec2) * (percentage / 100.0)));

      /* prepend a '0' if h has only one digit */
      hex = (hex.length < 2) ? `0${hex}` : hex;

      colorMix += hex;
    }

    return colorMix;
  }

  contrast(colorHex, colorBlackHex, colorWhiteHex): string {
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
