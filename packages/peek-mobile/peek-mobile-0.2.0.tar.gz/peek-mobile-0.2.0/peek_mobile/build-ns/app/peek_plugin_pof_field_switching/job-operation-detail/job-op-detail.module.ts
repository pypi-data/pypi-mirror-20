import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JobOperationDetailComponent} from "./job-op-detail.component";
import {OpConfirmComponent} from "./op-confirm/op-confirm.component";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

@NgModule({
    imports: [
        CommonModule,
        PeekModuleFactory.RouterModule,
        ...PeekModuleFactory.FormsModules,
        Ng2DatetimePickerModule
    ],
    exports: [JobOperationDetailComponent],
    declarations: [JobOperationDetailComponent, OpConfirmComponent]
})
export class JobOperationDetailModule {
}
