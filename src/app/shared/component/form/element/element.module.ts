import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from '../form-input/form-input.component';
import { ColumnComponent } from './column/column.component';
import { BaseTextComponent } from './base-text/base-text.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        FormInputComponent,
        ColumnComponent,
        BaseTextComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        FormInputComponent,
        ColumnComponent
    ]
})
export class ElementModule { }
