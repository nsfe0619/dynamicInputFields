import { FormArray, FormGroup } from "@angular/forms";
// import { TranslateService } from "@ngx-translate/core";

export abstract class BaseComponent
{
    validateForm: FormGroup; // 共用表單名稱
    isSubmit: boolean = false;

    constructor(
        // protected translateService: TranslateService
    )
    {

    }

    getErrorMessage(controlName: string): string
    {
        // console.log('this.isSubmit',this.isSubmit)
        // console.log('this.validateForm',this.validateForm)
        // console.log('this.validateForm.get(controlName)',this.validateForm.get(controlName))
        if (!this.isSubmit || !this.validateForm || !this.validateForm.get(controlName)) return undefined;
        let control = this.validateForm.get(controlName);
        if (control.invalid)
        {
            let errors = control.errors;
            let errorsList = Object.keys(control.errors);
            if (errorsList.find(e => e == 'required'))
            {
                return 'CHECK.EMPTY';
                // return this.translateService.instant('CHECK.EMPTY');
            }
            else
            {
                return errorsList[0];
                // return this.translateService.instant(errorsList[0]);

            }
        } else
        {
            return ""
        }
    }

    // getErrorMessageByList(controlName: string, index: number): string
    // {
    //     // console.log('this.isSubmit',this.isSubmit)
    //     // console.log('this.validateForm',this.validateForm)
    //     // console.log('this.validateForm.get(controlName)',this.validateForm[index].get(controlName))
    //     let validateFormList = this.validateForm.get('innerList') as FormArray
    //     if (!this.isSubmit || !this.validateForm || !validateFormList?.controls[index]?.get(controlName)) return undefined;
    //     let control = validateFormList.controls[index]?.get(controlName);
    //     if (control.invalid)
    //     {
    //         let errors = control.errors;
    //         let errorsList = Object.keys(control.errors);
    //         if (errorsList.find(e => e == 'required'))
    //         {
    //             return 'CHECK.EMPTY';
    //             // return this.translateService.instant('CHECK.EMPTY');
    //         }
    //         else
    //         {
    //             return errorsList[0];
    //             // return this.translateService.instant(errorsList[0]);

    //         }
    //     } else
    //     {
    //         return ""
    //     }
    // }
}