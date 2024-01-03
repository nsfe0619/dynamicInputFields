import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { ElementModule } from 'src/app/shared/component/form/element/element.module';


@NgModule({
    declarations: [
        TestComponent
    ],
    imports: [
        CommonModule,
        ElementModule,
        TestRoutingModule
    ]
})
export class TestModule { }
