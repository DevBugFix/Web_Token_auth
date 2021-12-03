import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() message: string;
  @Input() confirmTitle: string;
  @Input() declineTitle: string;

  public modalResponse:Subject<boolean>;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.modalResponse=new Subject();
  }
  confirm() {
    this.bsModalRef.hide();
    this.modalResponse.next(true);

  }
  decline() {
    this.bsModalRef.hide();
    this.modalResponse.next(false);
  }

}
