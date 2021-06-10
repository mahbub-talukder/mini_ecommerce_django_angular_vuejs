import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
const noAuthHeaders = new HttpHeaders({'No-Auth': 'True'});
noAuthHeaders.append('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }
  allproductList(): Observable<any> {
    return this.http.get(environment.allproductList, { headers: noAuthHeaders });
  }
  create_products(data: any): Observable<any> {
    return this.http.post(environment.create_products, data, { headers: headers });
  }
  getproductbyId(id: number): Observable<any> {
    return this.http.get(environment.getproductbyId + '/' + id, { headers: headers });
  }
  update_products(data: any,id: number): Observable<any> {
    return this.http.put(environment.update_products + '/' + id, data, { headers: headers });
  }
  product_delete(id: number): Observable<any> {
    return this.http.delete(environment.product_delete + '/' + id, { headers: headers });
  }
  

}
