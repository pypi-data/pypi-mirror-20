import {Router} from "@angular/router";
import {UserService} from "@peek-client/peek_plugin_user";
import {Component} from "@angular/core";
import {
    ComponentLifecycleEventEmitter,
    TupleDataObserverService,
    TupleActionPushService,
    TupleSelector
} from "@synerty/vortexjs";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {TitleService} from "@synerty/peek-client-fe-util";


import {UserListItemTuple} from "@peek-client/peek_plugin_user";
import {UserLoginAction} from "@peek-client/peek_plugin_user";

@Component({
    selector: 'peek-plugin-user-login',
    templateUrl: 'user-login.component.ns.html',
    moduleId: module.id
})
export class UserLoginComponent extends ComponentLifecycleEventEmitter {

    users: Array<UserListItemTuple> = [];
    selectedUser: UserLoginAction = new UserLoginAction();
    isAuthenticating: boolean = false;
    test : any = "";

    constructor(private userMsgService:Ng2BalloonMsgService,
                private tupleDataObserver: TupleDataObserverService,
                private tupleActionService: TupleActionPushService,
                private userService: UserService,
                private router: Router,
                titleService: TitleService) {
        super();
        titleService.setTitle("User Login");

        let selectAUser = new UserListItemTuple();
        selectAUser.displayName = "Select a User";

        let tupleSelector = new TupleSelector(UserListItemTuple.tupleName, {});
        let sup = tupleDataObserver.subscribeToTupleSelector(tupleSelector)
            .subscribe((tuples: UserListItemTuple[]) => {
                this.users = tuples;
                // this.users = [selectAUser, ...tuples];
                // for (let user of tuples) {
                //     user.displayName = `${user.displayName} (${user.userId})`;
                // }
            });
        this.onDestroyEvent.subscribe(() => sup.unsubscribe());
    }

    loginText() {
        if (this.selectedUser.userId == null || this.selectedUser.userId === '')
            return "Login";
        return `I'm ${this.selectedUser.userId}, LOG ME IN`;
    }

    doLogin() {

        let loginAction = this.selectedUser;

        let userDetails:UserListItemTuple = this.users
            .filter(item => item.userId === this.selectedUser.userId)[0];

        this.isAuthenticating = true;
        this.userService.login(loginAction,userDetails,  this.tupleActionService)
            .then(() => {
                this.userMsgService.showSuccess("Login Successful");
                this.router.navigate(['']);
            })
            .catch((err) => {
                if (err.startsWith("Timed out")) {
                    alert("Login Failed. The server didn't respond.");
                    return;
                }
                alert(err);
                this.isAuthenticating = false;
            });

    }


}