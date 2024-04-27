import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../_api/api.service';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-forms-fields',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule],
  templateUrl: './forms-fields.component.html',
  styleUrl: './forms-fields.component.scss',
})
export class FormsFieldsComponent implements OnInit {
  constructor() {}
  createEmployee : boolean = true;
  patchedRecords : any;
  private readonly formBuilder = inject(FormBuilder);
  private readonly Router = inject(Router);
  private readonly fakeApiService = inject(ApiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  studentForm: FormGroup = this.formBuilder.group({
    parentFirstName: [''],
    parentLastName: [''],
    studentFirstName: [''],
    studentLastName: [''],
    studentGradeLevel: [''],
    studentEmail: [''],
    studentPresentAddress: [''],
  });
  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe({
        next : (res: any)=>{
          console.log('res', res);
          if(res.studentId){
            this.fakeApiService.getStudentbyId(res.studentId).subscribe({
              next : (res: any)=>{
                console.log(res);
                 this.patchedRecords = res;
                 console.log('patchrecords',this.patchedRecords);
                this.studentForm.patchValue(this.patchedRecords);
                this.createEmployee = false;
              },error : (err : HttpErrorResponse) =>{
                console.log(err);
              }
            })
          }
        }
      })
    //   const id = this.activatedRoute.snapshot.paramMap.get('id');
    //   console.log(id)
    //   if(id){
    //     this.fakeApiService.getStudentbyId(id).subscribe({
    //        next : (res: any)=>{
    //         this.createEmployee = false;
    //         console.log(res);
    //         this.patchedRecords = res;
    //         this.studentForm.patchValue(this.patchedRecords);
    //         console.log('patchrecord', this.patchedRecords);
    //        }
    //     })
    //   }
    // console.log(this.studentForm.value);
  }

  public onStudentSubmit(): void {
    if(this.createEmployee){
      this.fakeApiService.createStudentRecord(this.studentForm.value).pipe().subscribe({
        next : (res: any)=>{
          console.log('studentsRecords',res);
        } ,error : (err : HttpErrorResponse)=>{
           console.log(err);
        }
       });
    } else {
      this.createEmployee = false;
      this.fakeApiService.updateStudentRecords(this.studentForm.value, this.patchedRecords.id).subscribe({
        next : (res: any)=>{
          console.log(res);
        }, error : (err : HttpErrorResponse) =>{
          console.log(err);
        }
      })
    }
    this.Router.navigate(['/student-table']);
  } 

  resetFrom() : void {
    this.studentForm.reset();
    this.Router.navigate(['/student-form']);
  }
}
