import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationModel } from 'src/models/location.model';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  location = new LocationModel()

  colors: string[] = [
    "red",
    "green"
  ]

  onSubmit(alertForm:any){
    console.log(alertForm.value)
  }

  closeModal() {
    this.activeModal.close();
  }
}
