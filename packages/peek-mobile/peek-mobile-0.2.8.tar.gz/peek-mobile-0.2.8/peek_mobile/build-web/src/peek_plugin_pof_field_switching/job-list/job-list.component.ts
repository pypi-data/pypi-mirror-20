import {Component} from "@angular/core";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {TitleService} from "@synerty/peek-mobile-util";
import {PeekDmsJobListItemTuple, PeekDmsJobFieldStatusEnum} from "@peek-client/peek_plugin_data_dms";
import {Router} from "@angular/router";
import {
    ComponentLifecycleEventEmitter,
    TupleDataOfflineObserverService,
    TupleActionPushOfflineService,
    TupleSelector
} from "@synerty/vortexjs";
import {UserService} from "@peek-client/peek_plugin_user";
import {fieldSwitchingBaseUrl} from "@peek-client/peek_plugin_pof_field_switching";
import {FieldSwitchingJobService} from "@peek-client/peek_plugin_pof_field_switching";

@Component({
    selector: 'peek-plugin-pof-field-switching-jobs-list',
    templateUrl: './job-list.component.web.html',
    moduleId: module.id
})
export class JobListComponent extends ComponentLifecycleEventEmitter {

    jobs: PeekDmsJobListItemTuple[] = [];

    constructor(private userService: UserService,
                private userMsgService: Ng2BalloonMsgService,
                private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private tupleActionOfflineService: TupleActionPushOfflineService,
                private router: Router,
                titleService: TitleService,
                private fieldSwitchingJobService:FieldSwitchingJobService) {
        super();
        titleService.setTitle("My Jobs");

        // Load Jobs Data ------------------

        let tupleSelector = new TupleSelector(PeekDmsJobListItemTuple.tupleName, {
            userId: userService.loggedInUserDetails.userId
        });

        let sup = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector)
            .subscribe((tuples: PeekDmsJobListItemTuple[]) => {
                this.jobs = tuples;
            });
        this.onDestroyEvent.subscribe(() => sup.unsubscribe());
    }

    jobClicked(job: PeekDmsJobListItemTuple) {
        this.router.navigate([fieldSwitchingBaseUrl, 'jobdetail', job.jobId]);
    }

    acceptClicked(job: PeekDmsJobListItemTuple) {
        this.router.navigate([fieldSwitchingBaseUrl, 'jobaccept', job.jobId]);
    }


}
