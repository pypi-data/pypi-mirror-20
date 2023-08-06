import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";
import {UserLoginModule} from "./user-login/user-login.module";
import {UserLogoutModule} from "./user-logout/user-logout.module";
import {pluginRoutes} from "./plugin-user.routes";
import {UserService} from "@peek-client/peek_plugin_user";
import {LoggedOutGuard} from "@peek-client/peek_plugin_user";
import {LoggedInGuard} from "@peek-client/peek_plugin_user";
import {ProfileService} from "@peek-client/peek_plugin_user";

import {
    TupleActionPushNameService,
    TupleActionPushService,
    TupleDataObservableNameService,
    TupleDataObserverService
} from "@synerty/vortexjs";

import {
    userActionProcessorName,
    userObservableName,
    userPluginFilt
} from "@peek-client/peek_plugin_user";


export function tupleDataObservableNameServiceFactory() {
    return  new TupleDataObservableNameService(userObservableName, userPluginFilt);
}

export function tupleActionPushNameServiceFactory(){
    return new TupleActionPushNameService(userActionProcessorName, userPluginFilt);
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
        UserLoginModule,
        UserLogoutModule
    ],
    declarations: [],
    providers: [
        TupleDataObserverService, {
            provide: TupleDataObservableNameService,
            useFactory:tupleDataObservableNameServiceFactory
        },
        TupleActionPushService, {
            provide: TupleActionPushNameService,
            useFactory: tupleActionPushNameServiceFactory
        },


        // Our services
        UserService, ProfileService, LoggedInGuard, LoggedOutGuard]
})
export class PluginUserModule {
}