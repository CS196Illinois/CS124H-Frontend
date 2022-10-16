import { Component, OnInit, NgModule } from '@angular/core';
import { LecturesComponent } from '../lectures/lectures.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

declare function getVideoID(text): any;

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
    console.log("Entered Set Lecture with link", link)
    //link = getVideoID(link)
    if (!link.includes('http')) {
        var intro = "http://"
        link = intro.concat(link);
    }
    // regex from http://stackoverflow.com/a/5831191/1614967
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)[?=&+%\w.-]*/ig;
    var id = link.replace(re,'$1');
    if (id.includes('#')) {
        id = id.split('#')[0];
    }
    var embed = "https://youtube.com/embed/"
    id = embed.concat(id)
    console.log("This should be the embedded linkL: ", id)
    let lectureData = { 'title': title, 'date': date, 'link': id, 'msg': commentary }
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
    console.log("Creating Dashboard: https://www.youtube.com/watch?v=qjD_yHJTU_U")
    this.loadLecture()
  }

}
