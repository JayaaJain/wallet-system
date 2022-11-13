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
    this.helperService.walletId='13b00980-fb1c-44b1-b968-63e42148ec30'
    this.getWallet()
  }

  getWallet() {
    if(this.helperService.walletId.length) {
      this.isWalletExists = true;
      this.walletService.getWallet(this.helperService.walletId).subscribe((res) => {
        console.log(res);
      })
    } else {
      this.isWalletExists = false;
    }
  }

  setupWallet() {
    let walletName = this.addWalletForm.controls['walletName'].value;
    this.walletService.setupWallet(walletName).subscribe((res) => {
      // localStorage.setItem(this.helperService.walletId, res.id)
      console.log(res);
    })
  }

}
