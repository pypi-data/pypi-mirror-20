import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PluginNoopClientComponent} from "./plugin-noop-client.component";
import {Routes, RouterModule} from "@angular/router";
import {PeekModuleFactory} from "@synerty/peek-web-ns/index.nativescript";
// import {PeekPluginMenuI, PeekPluginMenuItem} from "interfaces/PeekPluginMenuItem";
/**
 * Created by peek on 5/12/16.
 */


export const pluginRoutes: Routes = [
    {
        path: '',
        component: PluginNoopClientComponent,
        data : {title:"noop home route"}
    },
    {
        path: '**',
        component: PluginNoopClientComponent,
        data : {title:"noop catch all route"}
    }

];

@NgModule({
    imports: [
        CommonModule,
        PeekModuleFactory.RouterModule.forChild(pluginRoutes)],
    exports: [],
    providers: [],
    declarations: [PluginNoopClientComponent]
})
export  class PluginNoopClientModule
// implements PeekPluginMenuI
{
    // menuRoot(): PeekPluginMenuItem
    // {
    //     return {
    //         name: "Noop",
    //         url: "subItems",
    //         subItems: []
    //     }
    // }
}