import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'test',
        loadChildren: () =>
            import('./pages/component/test/test.module').then((m) => m.TestModule),
        data: {
            preload: true,
        },
    },
    { path: '**', redirectTo: '' },];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
