import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionViewComponent } from './components/transaction-view/transaction-view.component';
import { WalletViewComponent } from './components/wallet-view/wallet-view.component';

const routes: Routes = [
  { 
    path: '', redirectTo: '/setupWallet', pathMatch: 'full' 
  },
  {
    path: 'setupWallet', component: WalletViewComponent,
  },
  {
    path: 'transactions', component: TransactionViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
