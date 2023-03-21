import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayImageService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string
  ) {}

  getImage(imagename: string) {

    console.log(`${this.baseUrl}/users/profile-image/${imagename}`);
    
    return this.http.get(
      `${this.baseUrl}/users/profile-image/${imagename}`,
      {
        responseType: 'blob',
      }
    );
  }
}
