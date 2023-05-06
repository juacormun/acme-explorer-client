import { Component, OnInit } from '@angular/core';
import { FormValidation } from 'src/app/models/form-validation';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.scss']
})
export class TripCreateComponent implements OnInit, FormValidation {

  constructor() { }

  ngOnInit(): void {
  }

  isFormValid() {
    return true;
  };

}
