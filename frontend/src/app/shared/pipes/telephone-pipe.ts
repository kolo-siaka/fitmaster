import { Pipe, PipeTransform } from '@angular/core';

// Affiche un numéro lisiblement : « 2250701112233 » → « 07 01 11 22 33 »
@Pipe({
  name: 'telephone',
})
export class TelephonePipe implements PipeTransform {
  transform(numero: string): string {
    // On enlève l'indicatif de la Côte d'Ivoire (225) s'il est présent
    const local = numero.startsWith('225') ? numero.slice(3) : numero;
    // On découpe en groupes de 2 chiffres, séparés par un espace
    return local.match(/.{1,2}/g)?.join(' ') ?? numero;
  }
}