import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {

  public transactions = [];

  constructor(private walletService: WalletService) { }

    ngOnInit(): void {
        this.getTransactions();
    }

    async getTransactions(){
      this.transactions = [];
      this.transactions = await this.walletService.getTransactions(localStorage.getItem('walletId'))
    }

}
