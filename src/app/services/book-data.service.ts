import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor(private http : HttpClient) { }

  getBookBase64(bookCode: string): Observable<any> {
    let params = new HttpParams;
    params = params.set('book_code', bookCode)
    return this.http.get<any>(`https://serenegardenscapes.in/invoice/get-book.php`, { params });
  }
}
