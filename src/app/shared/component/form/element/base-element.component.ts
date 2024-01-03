import { FormControl, FormGroup } from "@angular/forms";
import { ColumnSetting, FormSetting } from "./element.model";
import { BaseComponent } from "../../base.component";

export abstract class BaseElementComponent extends BaseComponent
{

    formSetting: FormSetting = {
        inputForm: new FormGroup({}),
        columnSettings: [],
        isSubmit: false
    };
    innerForm: FormGroup;

    constructor()
    {
        super();
        this.validateForm = this.innerForm;
    }
    // 取得標題
    getFormTitle()
    {
        return this.formSetting.inputForm.get('title')?.value;
    }

    getFormList()
    {
        return Object.keys(this.formSetting.inputForm.value)
    }

    // 用type取得setting
    getSettingByType(type)
    {
        let setting = this.formSetting.columnSettings?.find(obj => obj.listType.endsWith(type))
        if (!setting)
        {
            // console.error('缺少『' + type + '』columnSetting', this.formSetting.columnSettings.map(col => col.listType));
            return { cname: null, name: null, options: [], required: null } as ColumnSetting;
        } else
        {
            return setting;
        }

    }
    // 用name取得setting
    getSettingByName(name)
    {
        let setting = this.formSetting.columnSettings?.find(obj => obj.name == name)
        if (!setting)
        {
            // console.error('缺少『' + name + '』columnSetting', this.formSetting.columnSettings.map(col => col.name));
            return { cname: null, name: null, options: [], required: null } as ColumnSetting;
        } else
        {
            return setting;
        }
    }

    // 取得inputForm by type
    getFromByType(type)
    {
        // console.log('this.getSettingByType(type)', this.getSettingByType(type), type)
        return this.formSetting.inputForm.get(this.getSettingByType(type)?.name) as FormControl
    }

    // 依選單值取得文字
    getLabelByValue(option, value)
    {
        let labelObj = option.find(opt => opt.code == value);
        return value ? (labelObj ? labelObj.name : '') : '';
    }

    // getValidator(setting) 
    // {
    //     if (!setting) return;
    //     let validatorList = [];
    //     if (setting.validator && setting.validator.length > 0)
    //     {
    //         validatorList = setting.validator.map(m => ValidatorUtil[m]());
    //     }
    //     return validatorList;
    // }
}