import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SgeiPagosContextService {

  constructor() { }

  private storageKey = 'paymentData';

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  setPaymentData(data: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
  }

  getPaymentData(): any {
    if (this.isBrowser()) {
      const storedData = localStorage.getItem(this.storageKey);
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  }

  clearPaymentData(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.storageKey);
    }
  }
}
