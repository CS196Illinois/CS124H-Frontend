import { Component, OnInit, NgModule } from '@angular/core';
import { LecturesComponent } from '../lectures/lectures.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

declare var getVideoID: any;

@NgModule({
  imports: [CommonModule]
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lecture;
  isSubmit;
  loadLecture() {
    let lectureData = localStorage.getItem('lecture-data')
    if (lectureData) {
      this.lecture = JSON.parse(lectureData)
      this.lecture.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.lecture.link)
    }
    this.isSubmit = lectureData
  }
  setLecture(title, date, link, commentary) {
    link = new getVideoID(link)
    let lectureData = { 'title': title, 'date': date, 'link': link, 'msg': commentary }
    localStorage.setItem('lecture-data', JSON.stringify(lectureData));
    this.loadLecture()
  }
  submitLecture() {
    // TODO: do some stuff to post lecture-data to backend and persist in DB
    console.log('sending lecture data to DB!')
    this.lecture = null;
    localStorage.removeItem('lecture-data');
  }
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadLecture()
  }

}
