import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  public passwordData: FormGroup;
  @Input() usedId: number;
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.initFormControl();
  }

  ngOnInit(): void {
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
    this.httpService.updatePassword(this.passwordData.value.newPassword, this.usedId).subscribe((response: any) => {
      if(response.code===200){
        this.passwordData.reset();
      }
    }, (err) => {
      console.log(err);
    })
  }

}
