import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public url: string = 'http://localhost:3000/api' //'https://wallet-system.up.railway.app/api';

  constructor(private httpClient: HttpClient) { }

  async setupWallet(walletName: string, curBalance: number = 0) {
    let payload = { balance: curBalance, name: walletName }
    return await this.httpClient.post(this.url + `/setup`, payload, {observe: 'response'}).toPromise()
  }

  async getWallet(walletId: string) {
    return await this.httpClient.get(this.url + `/wallet/${walletId}`).toPromise();
  }

  async payment(walletId: string, amount: number = 0, description: string) {
    let payload = { amount: amount, description: description }
    return await this.httpClient.post(this.url + `/transact/${walletId}`, payload, {observe: 'response'}).toPromise()
  }

  async getTransactions(walletId: string) {
    return await this.httpClient.get<any>(this.url + `/transactions?walletId=${walletId}`).toPromise();
  }
}
