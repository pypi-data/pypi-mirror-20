import {Router} from "@angular/router";
import {UserService} from "@peek-client/peek_plugin_user";
import {Component} from "@angular/core";
import {ComponentLifecycleEventEmitter, TupleActionPushService} from "@synerty/vortexjs";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {TitleService} from "@synerty/peek-client-fe-util";

@Component({
    selector: 'peek-plugin-user-logout',
    templateUrl: 'user-logout.component.web.html',
    moduleId: module.id
})
export class UserLogoutComponent extends ComponentLifecycleEventEmitter {

    isAuthenticating: boolean = false;

    constructor(private userMsgService: Ng2BalloonMsgService,
                private tupleActionService: TupleActionPushService,
                private userService: UserService,
                private router: Router,
                titleService: TitleService) {
        super();
        titleService.setTitle("User Logout");


    }

    doLogout() {

        this.isAuthenticating = true;
        this.userService.logout(this.tupleActionService)
            .then(() => {
                this.userMsgService.showSuccess("Logout Successful");
                this.router.navigate(['']);
            })
            .catch((err) => {
                if (err.startsWith("Timed out")) {
                    alert("Logout Failed. The server didn't respond.");
                    return;
                }
                alert(err);
                this.isAuthenticating = false;
            });

    }

    // ------------------------------
    // Display methods

    loggedInUserText() {
        return this.userService.userDetails.displayName
            + ` (${this.userService.userDetails.userId})`;
    }


}