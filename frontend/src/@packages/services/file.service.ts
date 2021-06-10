import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const headers = new HttpHeaders();

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private http: HttpClient
    ) { }

    uploadFile(fileData: any): Observable<any> {
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const fileAsformData = new FormData();
        Object.keys(fileData).forEach((key) => {
            fileAsformData.append(key, fileData[key]);
        });
        return this.http.post<any>(environment.fileUploadApi, fileAsformData, { headers: headers });
    }
}
