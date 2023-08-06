import {OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Component} from "@angular/core";
import {TitleService} from "@synerty/peek-client-fe-util";
import {UserService} from "@peek-client/peek_plugin_user";
import {UserListItemTuple} from "@peek-client/peek_plugin_user";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {TupleActionPushService} from "@synerty/vortexjs";

@Component({
    selector: 'plugin-pof-field-switching',
    templateUrl: 'plugin-pof-field-switching-client.component.web.html',
    moduleId: module.id
})
export class PluginPofFieldSwitchingClientComponent implements OnInit {

    private userDetails: UserListItemTuple;

    constructor(private userMsgService: Ng2BalloonMsgService,
                private userService: UserService,
                private router: Router,
                private tupleActionService: TupleActionPushService,
                titleService: TitleService) {
        titleService.setTitle("Field Switching");
        this.userDetails = userService.loggedInUserDetails;
    }

    ngOnInit() {

    }
}
