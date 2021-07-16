import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-ui-template',
  templateUrl: './block-ui-template.component.html',
  styleUrls: ['./block-ui-template.component.scss']
})
export class BlockUiTemplateComponent implements OnInit {

  @Input() message:string;
  constructor() { }

  ngOnInit(): void {
  }

}
