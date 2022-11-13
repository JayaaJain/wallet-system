import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public url: string = 'https://wallet-system.up.railway.app/api';
  

  constructor(private httpClient: HttpClient) { }

  setupWallet(walletName: string, curBalance: number = 0) {
    let payload = { balance: curBalance, name: walletName }
    return this.httpClient.post(this.url + `/setup`, payload, {observe: 'response'})
    .pipe(map((res) => {
      return res;
    }));
  }

  getWallet(walletId: string) {
    return this.httpClient.get(this.url + `/wallet/${walletId}`)
    .pipe(map((res) => {
      return res;
    }));
  }
}
