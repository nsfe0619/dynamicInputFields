import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [{
    path: '',
    component: TestComponent
},
{ path: '**', redirectTo: '' },];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TestRoutingModule { }
