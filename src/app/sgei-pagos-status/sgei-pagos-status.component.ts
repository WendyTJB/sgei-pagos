import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { SgeiPagosContextService } from '../services/sgei-pagos-context.service';



@Component({
  selector: 'app-sgei-pagos-status',
  providers: [DatePipe],
  imports: [CommonModule, MatIconModule],
  templateUrl: './sgei-pagos-status.component.html',
  styleUrl: './sgei-pagos-status.component.css'
})
export class SgeiPagosStatusComponent implements OnInit{

  stateData = {} as {cardHolder: string ,
  entryTime: string ,
  exitTime: string ,
  amountToPay: number}
  pdfData: SafeResourceUrl | null = null;

  @ViewChild('pdfModal') pdfModal!: TemplateRef<any>;

  constructor(private dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private router: Router,
              private pagosContextService: SgeiPagosContextService,
              private http: HttpClient,
              private datePipe: DatePipe) {}

  ngOnInit(): void {

    const paymentData = this.pagosContextService.getPaymentData();
    if (paymentData) {
      this.stateData.cardHolder = paymentData.cardHolder;
      this.stateData.entryTime = paymentData.entryTime;
      this.stateData.exitTime = paymentData.exitTime;
      this.stateData.amountToPay = paymentData.amountToPay;
    } else {
      console.error('No se encontraron datos en el contexto');
    }
  }

  openPdf() {
    this.generatePdf('logo_big.png');
    this.dialog.open(this.pdfModal);
  }

  generatePdf(imagePath: string) {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6'
    });
    const docStyleImage = new jsPDF().GState({opacity: 0.2});
    const docStyleDefault = new jsPDF().GState({opacity: 1});

    doc.setGState(docStyleImage);

    // Cargar la imagen (puede ser base64 o URL convertida a base64)
    this.http.get(imagePath, { responseType: 'blob' }).subscribe((blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string; // Aquí tienes la imagen en base64

        // Agregar la imagen como fondo
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Tamaño de la imagen
        const imgWidth = 100; // Cambia según el tamaño que quieras
        const imgHeight = 50; // Relación de aspecto de tu imagen

        // Coordenadas para centrar
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        const formattedEntryTime = this.datePipe.transform(this.stateData.entryTime, 'yyyy-MM-dd HH:mm:ss');
        const formattedExitTime = this.datePipe.transform(this.stateData.exitTime, 'yyyy-MM-dd HH:mm:ss');

        // Agregar la imagen
        doc.addImage(base64Image, "PNG", x, y, imgWidth, imgHeight);
        doc.setGState(docStyleDefault);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('RECIBO SGEI', 35, 10);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombres: ${this.stateData.cardHolder}`, 10, 25);
        doc.text(`Tiempo de Entrada: ${formattedEntryTime}`, 10, 35);
        doc.text(`Tiempo de Salida: ${formattedExitTime}`, 10, 45);
        doc.text(`Total: $${this.stateData.amountToPay}`, 10, 55);
        const footerText = 'Sistema de Gestion de Estacionamiento Inteligente';
        doc.setFontSize(8);
        doc.text(footerText, 20, pageHeight - 10);
        const pdfBase64 = doc.output('datauristring');
        this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(pdfBase64);
      };
      reader.readAsDataURL(blob);
    });
  }

  goBack(): void {
    this.router.navigate(['']);
  }
}
