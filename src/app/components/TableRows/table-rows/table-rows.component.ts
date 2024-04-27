import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApiService } from '../../_api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentI } from '../../_model/student';
@Component({
  selector: 'app-table-rows',
  standalone: true,
  imports: [TableModule, RouterLink, ButtonModule],
  templateUrl: './table-rows.component.html',
  styleUrl: './table-rows.component.scss',
})
export class TableRowsComponent implements OnInit {
  constructor() {}
  studentRecordList: StudentI[] = [];
  private readonly router = inject(Router);
  private readonly fakeApiService = inject(ApiService);
  ngOnInit(): void {
    this.getStudentRecordsList();
  }

  public getStudentRecordsList(): void {
    this.fakeApiService
      .getallStudentRecords()
      .pipe()
      .subscribe({
        next: (res: any) => {
          this.studentRecordList = res;
          console.log('tableView', res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  public onEditInit(data: StudentI) : void{
    this.router.navigate(['/student-form'], {
      queryParams : {
        studentId : data.id
      }
    })
  }

  // public onEditInit(data : any): void {
  //   console.log(data.id)
  //   this.router.navigate(['/student-form', data.id])
  // }

  public onDeleteInit(studentId : any): void {
    console.log(studentId);
    this.fakeApiService.deleteStudentRecords(studentId).subscribe({
      next : (res: any)=>{
       this.getStudentRecordsList();
      }
    })
  }
}
