import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sgei-pagos-home',
  imports: [MatIconModule],
  templateUrl: './sgei-pagos-home.component.html',
  styleUrl: './sgei-pagos-home.component.css'
})
export class SgeiPagosHomeComponent {

  constructor(private router: Router) {}

   pagar():void {
    this.router.navigate(['/pagos']);
  }
}
