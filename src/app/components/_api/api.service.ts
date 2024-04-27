import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ObservedValuesFromArray, retry } from 'rxjs';
import { StudentI } from '../_model/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() { }
  private readonly http = inject(HttpClient);
  FAKE_BASE_URL : string = 'http://localhost:3000/studentForom';
 
 public createStudentRecord(student : StudentI): Observable<StudentI>{
    return  this.http.post<StudentI>(`${this.FAKE_BASE_URL}`, student);
  }
 public getallStudentRecords(): Observable<StudentI> {
    return this.http.get<StudentI>(`${this.FAKE_BASE_URL}`)
  }
 public getStudentbyId(studentid : any) : Observable<StudentI>{
    return this.http.get<StudentI>(`${this.FAKE_BASE_URL}/${studentid}`);
  }

 public updateStudentRecords(student : StudentI, id : any): Observable<StudentI>{
    return this.http.put<StudentI>(`${this.FAKE_BASE_URL}/${id}`, student);
  }
  public deleteStudentRecords(studentId : number): Observable<StudentI>{
    return this.http.delete<StudentI>(`${this.FAKE_BASE_URL}/${studentId}`);
  }
}
