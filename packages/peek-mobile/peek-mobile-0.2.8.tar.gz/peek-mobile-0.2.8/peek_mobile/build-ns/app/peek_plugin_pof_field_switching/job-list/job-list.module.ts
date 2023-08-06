import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JobListComponent} from "./job-list.component";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";

@NgModule({
    imports: [
        CommonModule,
        ...PeekModuleFactory.FormsModules
    ],
    exports: [JobListComponent],
    declarations: [JobListComponent]
})
export class JobListModule {
}
