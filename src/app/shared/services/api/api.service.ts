import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient;

  constructor(private http: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  // post_form(body: any): Observable<any> {
  //   return this.http
  //     .post<any>(
  //       `${environment.form}?country_no=${this.country_no}&customer_id=${this.customer_id}`,
  //       body
  //     )
  //     .pipe(
  //       map((m) => {
  //         let data = m.data;
  //         let msg = m.message;
  //         return [data, msg];
  //       })
  //     );
  // }
}
