import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ColumnSetting, FormSetting } from 'src/app/shared/component/form/element/element.model';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit
{

    columnSetting: ColumnSetting[] = [{
        "name": "cnamee",
        "cname": "英文名稱",
        "group1": "貸款資訊",
        "group2": null,
        "group3": null,
        "inputType": "text",
        "placeholder": "請輸入",
        "tips": null,
        "defaultValue": null,
        "options": null,
        "optionType": null,
        "listType": null,
        "setting": null,
        "prefix": null,
        "suffix": null,
        "required": true
    }];
    innerForm: FormGroup = new FormGroup({});
    formSetting: FormSetting = {
        inputForm: this.innerForm,
        columnSettings: this.columnSetting,
    }

    constructor() { }

    ngOnInit(): void
    {
    }

}
