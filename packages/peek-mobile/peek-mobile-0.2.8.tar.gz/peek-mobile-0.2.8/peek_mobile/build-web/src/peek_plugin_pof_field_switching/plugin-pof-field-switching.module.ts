import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PluginPofFieldSwitchingClientComponent} from "./plugin-pof-field-switching-client.component";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.web";
import {
    TupleActionPushNameService,
    TupleActionPushOfflineService,
    TupleActionPushService,
    TupleDataObservableNameService,
    TupleDataObserverService,
    TupleDataOfflineObserverService,
    TupleOfflineStorageNameService,
    TupleOfflineStorageService
} from "@synerty/vortexjs";
import {
    fieldSwitchingActionProcessorName,
    fieldSwitchingFilt,
    FieldSwitchingJobService,
    fieldSwitchingObservableName,
    fieldSwitchingTupleOfflineServiceName
} from "@peek-client/peek_plugin_pof_field_switching";
import {JobListModule} from "./job-list/job-list.module";
import {JobDetailModule} from "./job-detail/job-detail.module";
import {JobOperationListModule} from "./job-operation-list/job-op-list.module";
import {JobOperationDetailModule} from "./job-operation-detail/job-op-detail.module";
import {pluginRoutes} from "./plugin-pof-field-switching.routes";
import {
    LoggedInGuard,
    LoggedOutGuard,
    ProfileService,
    UserService
} from "@peek-client/peek_plugin_user";


// User Plugin Imports

export function tupleDataObservableNameServiceFactory() {
    return new TupleDataObservableNameService(
        fieldSwitchingObservableName, fieldSwitchingFilt);
}

export function tupleOfflineStorageNameServiceFactory() {
    return new TupleOfflineStorageNameService(fieldSwitchingTupleOfflineServiceName);
}

export function tupleActionPushNameServiceFactory() {
    return new TupleActionPushNameService(
        fieldSwitchingActionProcessorName, fieldSwitchingFilt);
}


@NgModule({
    imports: [
        // Angular
        CommonModule,
        // Web and NativeScript
        PeekModuleFactory.RouterModule,
        PeekModuleFactory.RouterModule.forChild(pluginRoutes),
        ...PeekModuleFactory.FormsModules,
        // This plugin
        JobListModule,
        JobDetailModule,
        JobOperationDetailModule,
        JobOperationListModule
    ],
    declarations: [PluginPofFieldSwitchingClientComponent],
    providers: [
        FieldSwitchingJobService,
        TupleDataObserverService, TupleDataOfflineObserverService, {
            provide: TupleDataObservableNameService,
            useFactory: tupleDataObservableNameServiceFactory
        },
        TupleOfflineStorageService, {
            provide: TupleOfflineStorageNameService,
            useFactory:tupleOfflineStorageNameServiceFactory
        },
        TupleActionPushOfflineService, TupleActionPushService, {
            provide: TupleActionPushNameService,
            useFactory:tupleActionPushNameServiceFactory
        },

        // User Providers
        UserService, ProfileService, LoggedInGuard, LoggedOutGuard
    ]
})
export class PluginPofFieldSwitchingClientModule {
    constructor(private fieldSwitchingJobService: FieldSwitchingJobService) {

    }

}