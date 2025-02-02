import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sgei-pagos-not-found',
  imports: [MatIconModule],
  templateUrl: './sgei-pagos-not-found.component.html',
  styleUrl: './sgei-pagos-not-found.component.css'
})
export class SgeiPagosNotFoundComponent {

  constructor(private router: Router) {}

  goBack():void {
    this.router.navigate(['']);
  }

}
