import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Router } from '@angular/router';
import { SgeiPagosContextService } from '../services/sgei-pagos-context.service';
import { SgeiPagosValidatorsService } from '../services/sgei-pagos-validators.service';




@Component({
  selector: 'app-sgei-pagos-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTimepickerModule,
    MatDatepickerModule,],
  templateUrl: './sgei-pagos-form.component.html',
  styleUrl: './sgei-pagos-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SgeiPagosFormComponent implements OnInit{

  paymentForm: FormGroup;
  isLoading = false;
  totalTime: string = '';
  entryDate: Date | null = null;
  entryTime: string = '';
  exitDate: Date | null = null;
  exitTime: string = '';
  amountToPay: string = '0';
  hourlyRate: number = 1; // Costo por hora
  fractionRate: number = this.hourlyRate / 60;
  errorMessageTime: string = '';



  constructor(
              private fb: FormBuilder,
              private router: Router,
              private pagosContextService: SgeiPagosContextService,
              private pagosValidatorsService:SgeiPagosValidatorsService) {
    this.paymentForm = this.fb.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, this.pagosValidatorsService.creditCardValidator()]],
      expirationDate: ['', [Validators.required, this.pagosValidatorsService.expirationDateValidator()]],
      cvv: ['', [Validators.required, this.pagosValidatorsService.cvvValidator()]]
    });
  }
  ngOnInit(): void {
    this.paymentForm.disable();
  }

    onSubmit() {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false; // Oculta la animación de carga
        const paymentData = {
              cardHolder: formData.cardHolder,
              entryTime:this.entryTime,
              exitTime:this.exitTime,
              amountToPay: this.amountToPay
        };

    // Guardar los datos en el servicio (y por ende en localStorage)
    this.pagosContextService.setPaymentData(paymentData);
        this.router.navigate(['/pagoEstado']);
      }, 3000);
    }
  }

  goBack(): void {
    this.router.navigate(['']);
  }

  get timeDifference(): string {
    if (this.entryDate && this.entryTime && this.exitDate && this.exitTime) {
      const entryDateTime = this.combineDateTime(this.entryDate, this.entryTime);
      const exitDateTime = this.combineDateTime(this.exitDate, this.exitTime);

      if (entryDateTime && exitDateTime) {
        let diffInMs = exitDateTime.getTime() - entryDateTime.getTime();

        if (diffInMs < 0) {
          this.paymentForm.disable();
          this.errorMessageTime = 'Error: La fecha de salida debe ser mayor a la de entrada'
          return '00:00';
        }

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        this.paymentForm.enable();
        // Cálculo del valor a pagar basado en la diferencia de tiempo
        this.calculatePayment(diffInMinutes);
        this.errorMessageTime ='';
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    }
    this.paymentForm.disable();
    return '00:00';
  }

  private combineDateTime(date: Date, time: any): Date | null {
    if (!date || !time) return null;

    let hours = 0, minutes = 0;

    if (typeof time === 'string' && time.includes(':')) {
      [hours, minutes] = time.split(':').map(Number);
    } else if (time instanceof Date) {
      hours = time.getHours();
      minutes = time.getMinutes();
    } else {
      console.error('Formato de hora no reconocido:', time);
      return null;
    }

    const combinedDate = new Date(date);
    combinedDate.setHours(hours, minutes, 0);
    return combinedDate;
  }

  private calculatePayment(diffInMinutes: number) {
    const totalHours = diffInMinutes / 60;

    // Si es menos de 1 hora, se paga 1 dólar
    if (totalHours < 1) {
      this.amountToPay = this.hourlyRate.toString();
    } else {
      // Si es más de 1 hora, calcular el valor proporcional
      const totalCost = totalHours * this.hourlyRate;
      this.amountToPay = totalCost.toFixed(2); // Dos decimales
    }
  }


}
