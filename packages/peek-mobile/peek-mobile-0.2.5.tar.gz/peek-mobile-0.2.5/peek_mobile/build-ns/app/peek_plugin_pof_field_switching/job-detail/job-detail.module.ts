import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JobDetailComponent} from "./job-detail.component";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";
import {JobTransitionWithReasonComponent} from "./job-transition-with-reason/job-trans.component";

@NgModule({
    imports: [CommonModule,
        PeekModuleFactory.RouterModule,
        ...PeekModuleFactory.FormsModules],
    exports: [JobDetailComponent],
    declarations: [JobDetailComponent, JobTransitionWithReasonComponent]
})
export class JobDetailModule {
}
