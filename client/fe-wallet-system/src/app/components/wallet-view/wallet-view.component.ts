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
  public paymentForm: UntypedFormGroup;
  public isWalletExists: boolean = false;
  public walletdetails: any;
  public isCredit: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private helperService: HelperService,
    private walletService: WalletService) {
    this.addWalletForm = this.formBuilder.group({
      walletName: ['', Validators.required],
      balance: [0, Validators.pattern('^[+-]?([0-9]*[.])?[0-9]+$')]
    });
    this.paymentForm = this.formBuilder.group({
      amount: ['', Validators.compose([Validators.pattern('^([0-9]*[.])?[0-9]+$'), Validators.required])],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getWallet();
  }

  async getWallet() {
    if (localStorage.getItem('walletId')) {
      this.isWalletExists = true;
      this.walletdetails = await this.walletService.getWallet(localStorage.getItem('walletId'))
      this.addWalletForm.patchValue({
        walletName: this.walletdetails.name,
        balance: this.walletdetails.balance
      })
    } else {
      this.isWalletExists = false;
    }
  }

  async setupWallet() {
    let walletName = this.addWalletForm.controls['walletName'].value;
    let balance = this.addWalletForm.controls['balance'].value;

    this.walletdetails = await this.walletService.setupWallet(walletName, balance)
    if (this.walletdetails?.body) {
      localStorage.setItem('walletId', this.walletdetails.body['id']);
      this.getWallet();
    }
  }

  async payment() {
    let amount = this.paymentForm.controls['amount'].value;
    let description = this.paymentForm.controls['description'].value;
    amount = this.isCredit ? amount : (amount*-1);
    await this.walletService.payment(localStorage.getItem('walletId'), amount, description)
    this.walletdetails.balance = parseFloat(this.walletdetails.balance) + parseFloat(amount);
    this.addWalletForm.patchValue({
      balance: this.walletdetails.balance
    })
  }

  isFormInvalid(control: string) {
    return this.addWalletForm.get(control)?.touched && !this.addWalletForm.get(control)?.valid
  }

  isPayFormInvalid(control: string) {
    return this.paymentForm.get(control)?.touched && !this.paymentForm.get(control)?.valid
  }

  getType(value) {
    this.isCredit = !value; 
  }
}
