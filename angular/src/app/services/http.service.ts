import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  /**
   * 
   * @param userData user Data
   */
  userLogin(userData) {
    return this.httpClient.post(`${URL.apiURL}/users/login`, userData)
  }

  /**
   * 
   * @param userData Updated profile data.
   */
  updateprofile(userData) {
    return this.httpClient.post(`${URL.apiURL}/users/profile`, userData)
  }

  /**
   * 
   * @param userData Updated profile data.
   */
  updatePassword(password, userId, oldPassword) {
    const header = new HttpHeaders({
      useragentId: `${userId}`,
      passToken: password,
      oldPassword
    });
    return this.httpClient.post(`${URL.apiURL}/users/password`, {}, { headers: header })
  }

  /**
   * 
   * @param userData Updated profile data.
   */
  uploadAvatar(formData, userId) {
    const header = new HttpHeaders({
      useragentId: `${userId}`,
    });
    return this.httpClient.post(`${URL.apiURL}/users/avatar`, formData, { headers: header })
  }
}

