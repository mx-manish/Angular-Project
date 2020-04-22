import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storege.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile;
  constructor(private routing: Router, private storage: StorageService) { }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.userProfile.age = moment().diff(moment(this.userProfile.dob, 'YYYY-MM-DD'), 'years');
  }

  logoutUser() {
    this.storage.clearStorage();
    this.routing.navigateByUrl('/login');
  }

}
