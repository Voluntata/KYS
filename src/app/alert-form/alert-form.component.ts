import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.css']
})
export class AlertFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  location = new Location()

  colors: string[] = [
    "red",
    "green"
  ]

  onSubmit(alertForm:any){
    console.log(alertForm.value)
  }
}
