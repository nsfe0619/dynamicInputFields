import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ColumnSetting, FormSetting } from '../element/element.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit, OnChanges
{

    @Input() formSetting: FormSetting = {
        inputForm: null,
        columnSettings: null
    };
    innerForm: FormGroup;
    private destroy$: Subject<void> = new Subject<void>();
    needReturnValueType: any;

    get innerColumnSettings()
    {
        return this.formSetting.columnSettings
    }

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void
    {
    }

    ngOnChanges()
    {
        console.log('formSetting', this.formSetting);
        console.log('innerColumnSettings', this.innerColumnSettings);
        if (!this.innerForm)
        {
            this.initByColumnSetting();
        }
    }

    ngOnDestroy()
    {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private initByColumnSetting()
    {
        if (this.formSetting.isInputMode != false)
        {
            this.formSetting.isInputMode = true;
        }
        if (!this.innerColumnSettings) return;
        this.innerForm = this.fb.group({});
        this.innerColumnSettings?.forEach(setting =>
        {
            // console.log('setting', setting)
            // console.log('this.formSetting.inputForm', this.formSetting.inputForm)
            // let listTypeCompareAll = this.listTypes.find(obj => setting.inputType?.indexOf(obj) > -1)
            // let listTypeComparePrefix = this.needReturnValueType.find(obj => setting.listType?.indexOf(obj) > -1)
            if (setting.group1)
            {
                // 沒有Group1時產生Group1
                if (!this.innerForm.contains(setting.group1))
                {
                    let type: string = '';
                    if (!setting.group2)
                    {
                        // if (listTypeCompareAll)
                        // {
                        //     type = listTypeCompareAll;
                        // } else
                        //     if (listTypeComparePrefix)
                        //     {
                        //         type = listTypeComparePrefix;
                        //     }
                    }
                    let formGroup = this.fb.group({
                        title: [{ value: setting.group1, disabled: true }],
                        type: [{ value: type, disabled: true }],
                        isOpen: [{ value: true, disabled: true }]
                    })
                    this.innerForm.addControl(setting.group1, formGroup);
                }

                const group1 = this.innerForm.get(setting.group1) as FormGroup;
                if (setting.group2)
                {
                    // 沒有Group2時產生Group2
                    if (!group1.contains(setting.group2))
                    {
                        let type: string = '';
                        if (!setting.group3)
                        {
                            // if (listTypeCompareAll)
                            // {
                            //     type = listTypeCompareAll;
                            // } else
                            //     if (listTypeComparePrefix)
                            //     {
                            //         type = listTypeComparePrefix;
                            //     }
                        }
                        let formGroup = this.fb.group({
                            title: [{ value: setting.group2, disabled: true }],
                            type: [{ value: type, disabled: true }],
                        })
                        group1.addControl(setting.group2, formGroup);
                    }

                    const group2 = group1.get(setting.group2) as FormGroup;
                    if (setting.group3)
                    {
                        let type: string = '';
                        // if (listTypeCompareAll)
                        // {
                        //     type = listTypeCompareAll;
                        // } else
                        //     if (listTypeComparePrefix)
                        //     {
                        //         type = listTypeComparePrefix;
                        //     }
                        // 沒有Group3時產生Group3
                        if (!group2.contains(setting.group3))
                        {
                            let formGroup = this.fb.group({
                                title: [{ value: setting.group3, disabled: true }],
                                type: [{ value: type, disabled: true }],
                            })
                            group2.addControl(setting.group3, formGroup);
                        }
                        const group3 = group2.get(setting.group3) as FormGroup;
                        this.addFormControl(this.formSetting.inputForm, group3, setting);

                    } else
                    {
                        this.addFormControl(this.formSetting.inputForm, group2, setting);
                    }
                } else
                {
                    this.addFormControl(this.formSetting.inputForm, group1, setting);
                }
            }
        })
    }

    private addFormControl(inputForm, innerForm, setting: ColumnSetting)
    {
        console.log('inputForm', inputForm)
        console.log('innerForm', innerForm)
        console.log('setting', setting)
        if (!inputForm || !innerForm || !setting) return;
        if (setting.inputType == 'listTwoLevel')
        {
            innerForm.get('type').setValue('listTwoLevel');

            if (inputForm.get(setting.name))
            {
                innerForm.addControl(setting.name, this.fb.array(inputForm.get(setting.name)?.value || []));
            } else
            {
                innerForm.addControl(setting.name, this.fb.array([]));
                inputForm.addControl(setting.name, innerForm.get(setting.name));
            }
        } else if (innerForm.get('type')?.value == 'listTwoLevel')
        {
            // 組成list的group不處理
            return;
        }
        else if (setting.inputType == 'list')
        {
            // console.log('setting', setting.group2, setting.group3);
            // console.log('parent', innerForm.parent);
            if (innerForm.parent.get('type')?.value == 'listTwoLevel') return;
            innerForm.get('type').setValue('list');
            if (inputForm.get(setting.name))
            {
                innerForm.addControl(setting.name, this.fb.array(inputForm.get(setting.name).value || []));
            } else
            {
                // console.log('innerForm', innerForm)
                // console.log('innerForm', innerForm)
                innerForm.addControl(setting.name, this.fb.array([]));
                inputForm.addControl(setting.name, this.fb.array([]));
            }
            // console.log('list innerForm', innerForm);
            innerForm.get(setting.name).valueChanges
                .pipe(
                    takeUntil(this.destroy$),
                    distinctUntilChanged())
                .subscribe(v =>
                {
                    inputForm.get(setting.name).clear();
                    v.forEach((value) =>
                    {
                        (inputForm.get(setting.name) as FormArray).push(this.fb.group(value));
                    })
                })
        } else if (innerForm.get('type')?.value == 'list')
        {
            // 組成list的group不處理
            return;
        } else
            if (setting.listType?.startsWith('ocr'))
            {
                let innerGroupForm = this.innerForm.get(setting.group1) as FormGroup;
                // 沒有ocr時產生ocr
                if (!innerGroupForm.contains('ocr'))
                {
                    let formGroup = this.fb.group({
                        title: [{ value: setting.group1, disabled: true }],
                        type: [{ value: 'ocr', disabled: true }],
                    })
                    innerGroupForm.addControl('ocr', formGroup);
                }

                let innerOcrForm = innerGroupForm.get('ocr') as FormGroup;
                // innerForm僅供畫面顯示使用 inputForm會記錄值
                if (setting.group2)
                {
                    if (!innerOcrForm.contains(setting.group2))
                    {
                        let formGroup = this.fb.group({
                            title: [{ value: setting.group2, disabled: true }],
                            type: [{ value: setting.listType.indexOf('address') > -1 ? 'address' : '', disabled: true }],
                        })
                        innerOcrForm.addControl(setting.group2, formGroup);
                    }
                    console.log('setting', setting, setting.name)
                    if (inputForm.get(setting.name))
                    {
                        (innerOcrForm.get(setting.group2) as FormGroup).addControl(setting.name, new FormControl(inputForm.get(setting.name).value, this.getValidator(setting)));
                        inputForm.get(setting.name).setValidators(this.getValidator(setting));
                        inputForm.get(setting.name).updateValueAndValidity()
                    } else
                    {
                        (innerOcrForm.get(setting.group2) as FormGroup).addControl(setting.name, new FormControl(setting.defaultValue || '', this.getValidator(setting)));
                        inputForm.addControl(setting.name, new FormControl(setting.defaultValue || '', this.getValidator(setting)));
                    }
                    innerOcrForm.get(setting.group2).get(setting.name).valueChanges.pipe(
                        takeUntil(this.destroy$),
                        distinctUntilChanged())
                        .pipe(distinctUntilChanged()).subscribe(v =>
                        {
                            // console.log('name',setting.name,v)
                            if (inputForm.get(setting.name) != v)
                            {
                                inputForm.get(setting.name).setValue(v);
                            }
                        })
                } else
                {
                    if (inputForm.get(setting.name))
                    {
                        innerOcrForm.addControl(setting.name, new FormControl(inputForm.get(setting.name).value, this.getValidator(setting)));
                        inputForm.get(setting.name).setValidators(this.getValidator(setting));
                        inputForm.get(setting.name).updateValueAndValidity();
                    } else
                    {
                        innerOcrForm.addControl(setting.name, new FormControl(setting.defaultValue || '', this.getValidator(setting)));
                        inputForm.addControl(setting.name, new FormControl(setting.defaultValue || '', this.getValidator(setting)));
                    }
                    this.getInnerControl(innerOcrForm, setting.name).valueChanges.pipe(
                        takeUntil(this.destroy$),
                        distinctUntilChanged())
                        .pipe(distinctUntilChanged()).subscribe(v =>
                        {
                            // console.log('name',setting.name,v)
                            if (inputForm.get(setting.name) != v)
                            {
                                inputForm.get(setting.name).setValue(v);
                            }
                        })
                }

            } else if (innerForm.get('type')?.value == 'list')
            {
                // 組成list的group不處理
                return;
            }
            else if (setting.inputType == 'checkbox')
            {
                // innerForm僅供畫面顯示使用 inputForm會記錄值
                if (inputForm.get(setting.name))
                {
                    if (inputForm.get(setting.name).value)
                    {
                        innerForm.addControl(setting.name, new FormControl(inputForm.get(setting.name).value));
                    }
                    else
                    {
                        innerForm.addControl(setting.name, new FormControl(setting.options.map(() => '')));
                        inputForm.get(setting.name).setValue(setting.options.map(() => ''))
                    }
                } else
                {
                    innerForm.addControl(setting.name, new FormControl(setting.options.map(() => '')));
                    inputForm.addControl(setting.name, new FormControl(setting.options.map(() => '')));
                }
            } else if (setting.listType?.indexOf('radioInput') > -1)
            {
                // 沒有radioInput的時候新增
                let type: string = 'radioInput';
                if (!innerForm.contains(setting.listType))
                {
                    let formGroup = this.fb.group({
                        title: [{ value: setting.cname, disabled: true }],
                        type: [{ value: type, disabled: true }],
                    })
                    innerForm.addControl(setting.listType, formGroup);
                }
                // innerForm僅供畫面顯示使用 inputForm會記錄值
                if (inputForm.get(setting.name))
                {
                    innerForm.get(setting.listType).addControl(setting.name, new FormControl(inputForm.get(setting.name).value, []));
                } else
                {
                    innerForm.get(setting.listType).addControl(setting.name, new FormControl(setting.defaultValue || '', []));
                    inputForm.addControl(setting.name, new FormControl(setting.defaultValue || '', []));
                }
                innerForm.get(setting.listType).get(setting.name).valueChanges.pipe(
                    takeUntil(this.destroy$),
                    distinctUntilChanged())
                    .pipe(distinctUntilChanged()).subscribe(v =>
                    {
                        if (inputForm.get(setting.name) != v)
                        {
                            inputForm.get(setting.name).setValue(v);
                        }
                    })
            } else 
            {
                if (inputForm.get(setting.name))
                {
                    // innerForm.addControl(setting.name, new FormControl({ value: inputForm.get(setting.name).value, disabled: false }, this.getValidator(setting)));

                    innerForm.addControl(setting.name, new FormControl({ value: inputForm.get(setting.name).value, disabled: false }));
                    inputForm.get(setting.name).setValidators(this.getValidator(setting));
                    inputForm.get(setting.name).updateValueAndValidity();

                } else
                {
                    // innerForm.addControl(setting.name, new FormControl({ value: setting.defaultValue || '', disabled: false }, this.getValidator(setting)));
                    innerForm.addControl(setting.name, new FormControl({ value: setting.defaultValue || '', disabled: false }));

                    let isDisabled = (setting.inputType == "fixedValue")
                    // console.log('inputForm',inputForm);
                    // console.log('innerForm',innerForm);
                    // console.log('setting',setting);
                    inputForm.addControl(setting.name, new FormControl({ value: setting.defaultValue || '', disabled: isDisabled }, this.getValidator(setting)));

                }
            }

        // 組合欄位傳入innerForm 須將值更新到inputForm
        // if (this.needReturnValueType.find(obj => obj == innerForm.get('type').value))
        // {
        //     // console.log('getInnerControl',innerForm,setting.name);
        //     this.getInnerControl(innerForm, setting.name)?.valueChanges.pipe(
        //         takeUntil(this.destroy$),
        //         distinctUntilChanged())
        //         .pipe(distinctUntilChanged()).subscribe(v =>
        //         {
        //             if (inputForm.get(setting.name) != v)
        //             {
        //                 inputForm.get(setting.name).setValue(v);
        //             }
        //             if (innerForm.get('type')?.value == 'phone')
        //             {
        //                 innerForm.get(setting.name).setErrors(null);
        //                 innerForm.get(setting.name).updateValueAndValidity(); // 重新驗證以應用 Validator
        //                 if (innerForm.invalid)
        //                 {
        //                     innerForm.get(setting.name).setErrors(innerForm.errors);
        //                     inputForm.get(setting.name).setErrors(innerForm.errors);
        //                 } else
        //                 {
        //                     innerForm.get(setting.name).updateValueAndValidity(); // 重新驗證以應用 Validator
        //                     inputForm.get(setting.name).updateValueAndValidity(); // 重新驗證以應用 Validator
        //                 }
        //             }
        //         })
        // }

    }
    // 取得指定control
    getInnerControl(fg: FormGroup, controlName: string): FormControl
    {
        let control = fg.get(controlName) as FormControl;
        return control;
    }
    getValidator(setting) 
    {
        // if (!setting) return;
        // let validatorList = [];
        // if (setting.validator && setting.validator.length > 0)
        // {
        //     validatorList = setting.validator.map(m => ValidatorUtil[m]());
        // }
        // return validatorList;
        return null;
    }
}


