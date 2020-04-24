import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storege.service';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { USER } from '../definitions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userProfile: USER;
  constructor(private routing: Router, private storage: StorageService, private store: Store<{ userLogin: { user: USER } }>) { }

  ngOnInit(): void {
    // const storageData = this.storage.getData('user');
    // this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    // this.userProfile.age = moment().diff(moment(this.userProfile.dob, 'YYYY-MM-DD'), 'years');
    this.ngrxUserData();
  }

  logoutUser() {
    this.storage.clearStorage();
    this.routing.navigateByUrl('/login');
  }

  ngrxUserData() {
    this.store.select('userLogin')
      .subscribe((storageData) => {
        console.log("user", storageData);
        this.userProfile = storageData.user
        this.userProfile = {
          ...this.userProfile,
          age: moment().diff(moment(this.userProfile.dob, 'YYYY-MM-DD'), 'years')
        }
      });
  }
}
