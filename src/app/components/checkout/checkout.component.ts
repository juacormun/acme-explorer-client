import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  protected paypalConfig ?: IPayPalConfig;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initConfig();
  }

  initConfig() {
    const total = this.route.snapshot.queryParams['total'];
    this.paypalConfig = {
      currency: 'EUR',
      clientId: 'Ab__u9GW7QdCsUcMTjNUZhuY1Nj6KQptxT6_tkZW7RkhaWpVvF4n9hcx4SZuS6SH2Pc3xo0V2-F_w9BH',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: 'EUR',
                value: '9.99'
              }
          }]
      },
      advanced: {
          commit: 'true'
      },
      style: {
          label: 'paypal',
          layout: 'vertical'
      },
      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);

      },
      onError: err => {
          console.log('OnError', err);
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
      }
    }
  };
}
