import { Routes } from '@angular/router';
import { FormsFieldsComponent } from './components/FormsField/forms-fields/forms-fields.component';
import { TableRowsComponent } from './components/TableRows/table-rows/table-rows.component';
import { BooksArrayComponent } from './components/books-array/books-array.component';

export const routes: Routes = [
    {
        path : 'student-form',
        component : FormsFieldsComponent,
    },
    {
        path : 'student-form/:id',
        component: FormsFieldsComponent,
    },
    {
        path : 'student-table',
        component : TableRowsComponent,
    },
    {
        path : 'array',
        component : BooksArrayComponent
    },
    {
        path :'**', redirectTo : 'student-form', pathMatch : 'full',
    }
];
