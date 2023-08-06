import {PluginPofFieldSwitchingClientComponent} from "./plugin-pof-field-switching-client.component";
import {LoggedInGuard} from "@peek-client/peek_plugin_user";
import {JobListComponent} from "./job-list/job-list.component";
import {JobDetailComponent} from "./job-detail/job-detail.component";
import {JobOperationListComponent} from "./job-operation-list/job-op-list.component";
import {JobOperationDetailComponent} from "./job-operation-detail/job-op-detail.component";

export const pluginRoutes = [
    {
        path: '',
        pathMatch: 'full',
        component: PluginPofFieldSwitchingClientComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'joblist',
        component: JobListComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'jobdetail/:jobId',
        component: JobDetailComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'joboplist/:jobId/:jobNumber',
        component: JobOperationListComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'jobopdetail/:jobId/:jobNumber/:opId',
        component: JobOperationDetailComponent,
        canActivate: [LoggedInGuard]
    }
    // Fall through to peel-client-fe UnknownRoute

];

