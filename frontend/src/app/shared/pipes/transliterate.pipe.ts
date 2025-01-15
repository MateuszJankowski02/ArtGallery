import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transliterate'
})
@Injectable({
  providedIn: 'root'
})
export class TransliteratePipe implements PipeTransform {

  private diacriticsMap: { [key: string]: string } = {
    // Lowercase letters
    'ą': 'a',
    'ć': 'c',
    'ę': 'e',
    'ł': 'l',
    'ń': 'n',
    'ó': 'o',
    'ś': 's',
    'ź': 'z',
    'ż': 'z',
    // Uppercase letters
    'Ą': 'A',
    'Ć': 'C',
    'Ę': 'E',
    'Ł': 'L',
    'Ń': 'N',
    'Ó': 'O',
    'Ś': 'S',
    'Ź': 'Z',
    'Ż': 'Z',
  };

  transform(value: string): string {
    if (!value) return '';

    return value
      .normalize('NFD') // Decompose combined letters into base letters and diacritics
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
      .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => this.diacriticsMap[match] || match) // Replace specific Polish characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .toLowerCase(); // Convert to lowercase
  }

}
