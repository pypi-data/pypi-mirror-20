import {OnInit} from "@angular/core";
import {trigger, state, style, transition, animate} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Component} from "@angular/core";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {
    ComponentLifecycleEventEmitter,
    TupleActionPushOfflineService,
    TupleDataOfflineObserverService,
    TupleSelector
} from "@synerty/vortexjs";
import {TitleService} from "@synerty/peek-mobile-util";
import {
    PeekDmsJobListItemTuple,
    PeekDmsJobFieldAcceptAction,
    PeekDmsJobFieldHandBackAction,
    PeekDmsJobFieldRejectAction,
    PeekDmsJobFieldStartAction,
    PeekDmsJobFieldStatusEnum,
    PeekDmsJobFieldStopAction,
    PeekDmsJobTuple
} from "@peek-client/peek_plugin_data_dms";
import {fieldSwitchingBaseUrl} from "@peek-client/peek_plugin_pof_field_switching";
import {UserService} from "@peek-client/peek_plugin_user";
import {FieldSwitchingLookupListTuple,
    FieldSwitchingLookupNameEnum} from "@peek-client/peek_plugin_pof_field_switching";
import {JobTransitionDialogData} from "./job-transition-with-reason/job-trans.component";
import {FieldSwitchingJobService} from "@peek-client/peek_plugin_pof_field_switching";

@Component({
    selector: 'peek-plugin-pof-field-switching-job-detail',
    templateUrl: './job-detail.component.web.html',
    moduleId: module.id
})
export class JobDetailComponent extends ComponentLifecycleEventEmitter implements OnInit {

    job: PeekDmsJobTuple = new PeekDmsJobTuple();
    jobDataSelector: TupleSelector;

    transitionDialogData:JobTransitionDialogData | null = null;

    // --------------------------------------
    // REJECT DIALOG Data
    transitionDialogLookupType: string = null;

    otherJobsAreActive = true;

    constructor(private balloonMsg: Ng2BalloonMsgService,
                private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private tupleOfflineAction: TupleActionPushOfflineService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: TitleService,
                private userService: UserService,
                private fieldSwitchingJobService:FieldSwitchingJobService) {
        super();
        titleService.setTitle(`Job - Loading...`);
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            let userId = this.userService.userDetails.userId;
            let jobId = params['jobId'];
            this.loadJob(jobId, userId);
        });

    }

    private loadJob(jobId: string, userId: string) {


        let tupleSelector = new TupleSelector(PeekDmsJobListItemTuple.tupleName, {
            userId: this.userService.loggedInUserDetails.userId
        });

        let sup = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector)
            .subscribe((tuples: PeekDmsJobListItemTuple[]) => {
            for (let job of tuples) {
                this.otherJobsAreActive = false;
               if (job.jobId ===  jobId)
                   continue;
               if (job.fieldStatus.isActive) {
                   this.otherJobsAreActive = true;
                   break;
               }

            }

            });
        this.onDestroyEvent.subscribe(() => sup.unsubscribe());


        this.jobDataSelector = new TupleSelector(
            PeekDmsJobTuple.tupleName,
            {"jobId": jobId, "userId": userId}
        );

        let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(this.jobDataSelector)
            .subscribe(jobs => {
                if (jobs.length === 0) {
                    this.job = new PeekDmsJobTuple();
                    this.titleService.setTitle(`Job - ERROR`);
                    return
                }
                let job = (<PeekDmsJobTuple[]>jobs)[0];
                this.titleService.setTitle(`Job ${job.jobNumber}`);
                this.job = job;
            });
        this.onDestroyEvent.subscribe(() => sub.unsubscribe());

    }


    // --------------------------------------
    // UI NAV Functions

    navToMyJobs() {
        this.router.navigate([fieldSwitchingBaseUrl, 'joblist']);
    }

    navToSwitching() {
        this.router.navigate([fieldSwitchingBaseUrl, 'joboplist', this.job.jobId, this.job.jobNumber]);
    }

    isStartJobEnabled() {
        return !this.otherJobsAreActive
            && this.job.fieldStatus.isAccepted;
    }


    // --------------------------------------
    // Actions

    private _transitionJob(action: any, description: string, newState: string,
                           showConfirm:boolean,
                           reason:FieldSwitchingLookupListTuple | null = null) {

        if (showConfirm) {
            // Leave the spaces and wraps in here
            let question = `Are you sure you'd like to\n\n`
                + `         ${description} Job ${this.job.jobNumber}`;

            if (!confirm(question))
                return;
        }

        action.jobId = this.job.jobId;
        action.userId = this.userService.loggedInUserDetails.userId;
        action.dateTime = new Date();
        action.reason = reason; // Not all transitions have this

        this.tupleOfflineAction.pushAction(action)
            .then(() => {
                this.job.fieldStatus.value = newState;
                this.tupleDataOfflineObserver.updateOfflineState(
                    this.jobDataSelector, [this.job]);

                this.balloonMsg.showSuccess("Change Stored");
            })
            .catch(err => alert(err));

        this.job.fieldStatus.value = PeekDmsJobFieldStatusEnum.STATE_CHANGE_PENDING;
        this.tupleDataOfflineObserver.updateOfflineState(
            this.jobDataSelector, [this.job]);
    }

    acceptJob() {
        this._transitionJob(new PeekDmsJobFieldAcceptAction(), "Accept",
            PeekDmsJobFieldStatusEnum.STATE_CHANGE_PENDING, true);
    }

    rejectJob() {
        this.transitionDialogData = new JobTransitionDialogData(
            FieldSwitchingLookupNameEnum.RejectReason,
            "Reject",
            new PeekDmsJobFieldRejectAction(),
            PeekDmsJobFieldStatusEnum.REJECTED);
    }

    startJob() {
        this._transitionJob(new PeekDmsJobFieldStartAction(), "Start",
            PeekDmsJobFieldStatusEnum.ACTIVE, true);
    }

    stopJob() {
        this.transitionDialogData = new JobTransitionDialogData(
            FieldSwitchingLookupNameEnum.StopJobReason,
            "Stop",
            new PeekDmsJobFieldStopAction(),
            PeekDmsJobFieldStatusEnum.ACCEPTED);
    }

    handBackJob() {
        this.transitionDialogData = new JobTransitionDialogData(
            FieldSwitchingLookupNameEnum.HandbackReason,
            "Hand Back",
            new PeekDmsJobFieldHandBackAction(),
            PeekDmsJobFieldStatusEnum.HANDED_BACK);
    }


    // --------------------------------------
    // HANDBACK DIALOG

    transitionDialogShown() {
        return this.transitionDialogData != null;
    }

    dialogConfirmed(data:JobTransitionDialogData) {
        console.log(JSON.stringify(data));
        this._transitionJob(data.action,data.actionName, data.newJobState,false,
            data.reason);

        this.transitionDialogData = null;
    }

    dialogCanceled() {
        this.transitionDialogData = null;
    }

}
