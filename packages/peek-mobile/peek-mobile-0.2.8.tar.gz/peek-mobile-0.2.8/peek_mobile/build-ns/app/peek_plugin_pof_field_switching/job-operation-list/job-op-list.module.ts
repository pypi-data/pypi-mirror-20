import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JobOperationListComponent} from "./job-op-list.component";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";

@NgModule({
    imports: [
        CommonModule,
        PeekModuleFactory.RouterModule,
        ...PeekModuleFactory.FormsModules
    ],
    exports: [JobOperationListComponent],
    declarations: [JobOperationListComponent]
})
export class JobOperationListModule {
}
