import { Component, Input, OnInit } from '@angular/core';
import { FormSetting } from '../element.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit
{

    @Input() formSetting: FormSetting;
    innerForm: FormGroup;

    constructor() { }

    ngOnInit(): void
    {
        this.innerForm = this.formSetting.inputForm;
        console.log('formSetting', this.formSetting);
    }

}
