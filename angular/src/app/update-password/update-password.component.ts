import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { StorageService } from '../services/storege.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  public passwordData: FormGroup;
  @Input() usedId: number;
  errMessage = '';
  successMsg = '';
  showLoader = false;
  constructor(private fb: FormBuilder, private httpService: HttpService, private storage: StorageService) {
    this.initFormControl();
  }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    const userData = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.usedId = userData.Id;
  }

  initFormControl() {
    this.passwordData = this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      newPassword: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      cnfPassword: this.fb.control('', [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * @description Password updated
   */
  updatePassword() {
    this.showLoader = true;
    this.httpService.updatePassword(this.passwordData.value.newPassword, this.usedId, this.passwordData.value.password).subscribe((response: any) => {
      this.showLoader = false;
      if (response.code === 200) {
        this.passwordData.reset();
        this.successMsg = response.message;
        this.dismissAlert();
      } else {
        this.errMessage = response.message;
        this.dismissAlert();
      }

    }, (err) => {
      this.showLoader = false;
      this.errMessage = 'Somthing went wrong please try again later !';
      this.dismissAlert();
    })
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
