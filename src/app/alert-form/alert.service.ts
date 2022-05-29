import { Injectable } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable({ providedIn: 'root' })

export class AlertFormService {


  constructor(private modalService: NgbModal) { }

  openAlertModal(comp: any) {
    const modalRef = this.modalService.open(comp);

    modalRef.result.then((result) => {
      result
     // console.log(result);
    }).catch((error) => {
      error
      // console.log(error);
    });
  } }
