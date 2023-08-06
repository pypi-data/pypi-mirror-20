import {UserLoginComponent} from "./user-login/user-login.component";
import {LoggedInGuard} from "@peek-client/peek_plugin_user";
import {LoggedOutGuard} from "@peek-client/peek_plugin_user";
import {UserLogoutComponent} from "./user-logout/user-logout.component";

export const pluginRoutes = [
    {
        path: '',
        pathMatch: 'full',
        component: UserLoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'login',
        component: UserLoginComponent,
        canActivate: [LoggedOutGuard]
    },
    {
        path: 'logout',
        component: UserLogoutComponent,
        canActivate: [LoggedInGuard]
    },
    // Fall through to peel-client-fe UnknownRoute

];

