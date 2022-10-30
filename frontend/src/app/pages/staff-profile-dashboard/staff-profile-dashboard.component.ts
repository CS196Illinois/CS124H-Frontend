import { Component, OnInit, NgModule, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})

@Component({
  selector: 'app-staff-profile-dashboard',
  templateUrl: './staff-profile-dashboard.component.html',
  styleUrls: ['./staff-profile-dashboard.component.scss']
})

export class StaffProfileDashboardComponent implements OnInit {
  profile;
  isSubmit;
  split_skills;
  name = new FormControl('')
  bio = new FormControl('')
  technical_areas = new FormControl('')
  languages = new FormControl('')
  picture = new FormControl('')
  pictureSource: string;

  loadProfile() {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
      this.profile = JSON.parse(profileData)
    }

    this.isSubmit = profileData
  }
  setPictureSource() {
    let id = this.name.value.split(" ");
    for (let i = 0; i < id.length; i++) {
      id[i] = id[i][0].toUpperCase() + id[i].substr(1);
    }
    this.pictureSource = id.join("");
  }
  setProfile() {
    this.setPictureSource();
    let profileData = { 'name': this.name.value, 'bio': this.bio.value, 'technical_areas': this.technical_areas.value, 'languages': this.languages.value, 'picture': this.pictureSource }
    localStorage.setItem('profile-data', JSON.stringify(profileData));
    this.loadProfile()
  }
  submitProfile() {
    // TODO: do some stuff to post profile-data to backend and persist in DB
    console.log('sending staff profile data to DB!')
    this.profile = null;
    localStorage.removeItem('profile-data');
  }
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadProfile()
  }
}
