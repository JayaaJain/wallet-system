import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.scss']
})
export class WalletViewComponent implements OnInit {

  public addWalletForm: UntypedFormGroup;
  public isWalletExists: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private helperService: HelperService,
    private walletService: WalletService) {
    this.addWalletForm = this.formBuilder.group({
      walletName: ['', Validators.required],
      balance: ['', Validators.pattern('^[+-]?([0-9]*[.])?[0-9]+$')]
    });
  }

  ngOnInit(): void {
    this.getWallet();
  }

  async getWallet() {
    if (this.helperService.walletId.length) {
      this.isWalletExists = true;
      let res = await this.walletService.getWallet(this.helperService.walletId)
      console.log(res);
    } else {
      this.isWalletExists = false;
    }
  }

  async setupWallet() {
    let walletName = this.addWalletForm.controls['walletName'].value;
    let res = await this.walletService.setupWallet(walletName)
    if (res?.body) {
      localStorage.setItem('walletId', res.body['id']);
      this.helperService.walletId = res.body['id']
      this.getWallet();
      console.log(this.helperService.walletId);
    }
  }

}
