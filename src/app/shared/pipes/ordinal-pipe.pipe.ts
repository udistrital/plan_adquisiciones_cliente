import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalPipe'
})
export class OrdinalPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value < 0 || value > 99) {
      return '';
    } else {
      const decenas = Math.trunc(value / 10);
      const unidades = value - decenas;
      return this.DevolverDecena(decenas) + ' ' + this.DevolverUnidad(unidades);
    }
  }

  DevolverUnidad(numero: any) {
    switch (numero) {
      case 1:
        return 'Primera';
      case 2:
        return 'Segunda';
      case 3:
        return 'Tercera';
      case 4:
        return 'Cuarta';
      case 5:
        return 'Quinta';
      case 6:
        return 'Sexta';
      case 7:
        return 'Septima';
      case 8:
        return 'Octava';
      case 9:
        return 'Novena';
      default:
        return '';
    }
  }
  DevolverDecena(numero: any) {
    switch (numero) {
      case 1:
        return 'Decimo';
      case 2:
        return 'Vigesimo';
      case 3:
        return 'Trigesimo';
      case 4:
        return 'Cuadragesimo';
      case 5:
        return 'Quicuagesimo';
      case 6:
        return 'Sexagesimo';
      case 7:
        return 'Septuagesimo';
      case 8:
        return 'Octogesimo';
      case 9:
        return 'Nonagesimo';
      default:
        return '';
    }
  }
}
