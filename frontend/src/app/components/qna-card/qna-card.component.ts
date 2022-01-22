import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qna-card',
  templateUrl: './qna-card.component.html',
  styleUrls: ['./qna-card.component.scss']
})
export class QnaCardComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
