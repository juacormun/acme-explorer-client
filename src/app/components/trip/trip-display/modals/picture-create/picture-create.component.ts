import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/models/picture';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-picture-create',
  templateUrl: './picture-create.component.html',
  styleUrls: ['./picture-create.component.scss']
})
export class PictureCreateComponent implements OnInit {

  picture: Picture;

  @Input() trip: Trip = new Trip();

  constructor() {
    this.picture = new Picture();
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
