import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SgeiPagosValidatorsService {

  constructor() { }

  luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    // Recorremos los números de derecha a izquierda
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9; // Sumar los dígitos del número
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0; // Si la suma es múltiplo de 10, es válido
  }

  creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null; // Si el campo está vacío, no es necesario validar
      }

      // Expresión regular para validar entre 13 y 19 dígitos
      const validFormat = /^\d{13,19}$/.test(value);

      // Verificar si el formato es válido y si pasa la validación del algoritmo de Luhn
      if (validFormat && this.luhnCheck(value)) {
        return null; // La tarjeta tiene un formato válido y pasa el algoritmo de Luhn
      }

      return { invalidCard: true }; // Si no cumple con la validación
    };
  }

  expirationDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/; // Formato MM/YY

      if (!value || !regex.test(value)) {
        return { invalidExpirationDate: true }; // Fecha de expiración inválida
      }

      const [month, year] = value.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString().slice(2, 4);
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(year, 10) < parseInt(currentYear, 10)) {
        return { expired: true }; // La tarjeta ya ha expirado
      } else if (parseInt(year, 10) === parseInt(currentYear, 10) && parseInt(month, 10) < currentMonth) {
        return { expired: true }; // La tarjeta ha expirado este mes
      }

      return null; // Fecha válida
    };
  }

  cvvValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^[0-9]{3,4}$/; // El CVV debe tener 3 o 4 dígitos

      if (!value || !regex.test(value)) {
        return { invalidCVV: true }; // CVV inválido
      }

      return null; // CVV válido
    };
  }
}
