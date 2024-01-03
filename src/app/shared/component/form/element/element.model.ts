import { FormGroup } from "@angular/forms";

export interface ColumnSetting
{
    group1: string,
    group2: string,
    group3: string,
    name: string,
    cname: string,
    inputType: string,
    listType: string,
    placeholder: string,
    tips: string,
    defaultValue: string,
    optionType: string,
    options: Object[],
    required: boolean,
    prefix?: string,
    suffix?: string,
    setting: any,
    disabled?: boolean,
    validator?: string[],
    maxLength?: number,
}
export interface FormSetting
{
    inputForm: FormGroup;
    columnSettings: ColumnSetting[];
    isInputMode?: boolean;
    isSubmit?: boolean;
};