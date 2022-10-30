import { Component, OnInit, NgModule } from '@angular/core';
import { LecturesComponent } from '../lectures/lectures.component';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LectureService } from "src/app/services/lecture.service";
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { throwToolbarMixedModesError } from '@angular/material';

@NgModule({
  imports: [CommonModule]
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  lecture = null;
  isSubmit = null;
  tableView = true;
  lectureData;
  lectureStringify;
  title = new FormControl('')
  slide = new FormControl('')
  link = new FormControl('')
  comment = new FormControl('')
  getNewLectureData() {
    console.log(this.title.value, this.slide.value)
    this.lecture = { 'LectureID': this.lectureData[this.lectureData.length - 1].LectureID + 1, 'Title': this.title.value, 'Slide': this.slide.value, 'Link': this.link.value, 'Comment': this.comment.value }
    this.lectureData.push(this.lecture)
    this.lectureStringify = JSON.stringify(this.lectureData)
  }

  clearForm() {
    this.title.setValue('')
    this.slide.setValue('')
    this.link.setValue('')
    this.comment.setValue('')
  }

  deleteLecturePrompt(id) {
    let del = confirm("You are trying to delete an old lecture, are you sure you want to delete it?")
    if (del) {
      this.LectureService.delete(this.lectureData[this.lectureData.length - 1 - id].LectureID)
      location.reload()
    }
  }
  getVideoLink(text) {
    if (!text.includes('http')) {
        var intro = "http://"
        text = intro.concat(text);
    }
    // regex from http://stackoverflow.com/a/5831191/1614967
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)[?=&+%\w.-]*/ig;
    var id = text.replace(re,'$1');
    if (id.includes('#')) {
        id = id.split('#')[0];
    }
    var starting_url = "https://youtube.com/embed/"
    full_embedded_link = starting_url.concat(id)
    return full_embedded_link;
  }

  toggleTableView() {
    if (this.tableView) {
      this.getNewLectureData()
      this.tableView = false
    } else {
      this.lectureData.pop()
      this.tableView = true
    }
    this.isSubmit = null;
  }

  submitLecturePrompt() {
    // TODO: do some stuff to post lecture-data to backend and persist in DB
    if (this.title.value && this.link.value) {
      let submit = confirm("Are you sure you want to save your change?")
      if (submit) {
        this.getNewLectureData()
        console.log(this.lecture)
        this.LectureService.submit(this.lecture)
        console.log('sending lecture data to DB!')
        this.isSubmit = this.lecture;
        this.lecture = null;
        this.lectureData.pop()
        location.reload()
      }
    } else {
      window.alert("Title and Link fields are required. Please fill them in before submitting!")
    }
  }

  constructor(private sanitizer: DomSanitizer, private LectureService: LectureService) { }

  ngOnInit() {
    this.LectureService.getLectures().subscribe((data) => {
      this.lectureData = data['Lectures']
      console.log(this.lectureData)
      this.lectureStringify = JSON.stringify(this.lectureData)
      console.log(this.lectureStringify)
    })
  }

}
