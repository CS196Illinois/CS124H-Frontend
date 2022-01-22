import { Component, OnInit } from '@angular/core';
import * as data from "../../../assets/faq.json";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq = data.faq;
  constructor() { }

  ngOnInit() {
    console.log(this.faq[0].question);
  }

}
