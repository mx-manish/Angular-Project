import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storege.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileData: FormGroup;
  errMessage = '';
  successMsg = '';
  showLoader = false;
  @Input() userData: any;
  @Output() profileUpdated = new EventEmitter();
  constructor(private fb: FormBuilder, private httpService: HttpService, private service: StorageService, private storage: StorageService) {
    this.initializeFormController();
  }

  initializeFormController() {
    this.profileData = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      mobile: this.fb.control('', [Validators.required, Validators.minLength(10)]),
      city: this.fb.control('', [Validators.required]),
      dob: this.fb.control('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    this.userData = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.profileData.controls.name.setValue(this.userData.name);
    this.profileData.controls.email.setValue(this.userData.email);
    this.profileData.controls.mobile.setValue(this.userData.mobile);
    this.profileData.controls.city.setValue(this.userData.city);
    // const dob = new DatePipe('en-US').transform(this.userData.dob, 'yyyy-MM-dd')
    this.profileData.controls.dob.setValue(this.userData.dob);
  }

  updateProfile() {
    this.showLoader = true;
    this.profileData.value.user_id = this.userData.Id;
    this.httpService.updateprofile(this.profileData.value).subscribe((response: any) => {
      this.showLoader = false;
      if (response.code === 200) {
        this.userData.email = this.profileData.value.email;
        this.userData.name = this.profileData.value.name;
        this.userData.mobile = this.profileData.value.mobile;
        this.userData.city = this.profileData.value.city;
        this.userData.dob = this.profileData.value.dob;
        this.service.setData('user', JSON.stringify(this.userData));
        this.successMsg = response.message;
        this.dismissAlert();
        this.profileUpdated.emit(this.userData);
      } else {
        this.errMessage = response.message;
        this.dismissAlert();
      }
    }, (err) => {
      this.showLoader = false;
      console.log('Error', err);
    });
  }

  /**
   * @description dismiss alert after 3 sec.
   */
  dismissAlert() {
    setTimeout(() => {
      this.successMsg = '';
      this.errMessage = '';
    }, 2000)
  }

}
