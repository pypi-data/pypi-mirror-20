import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {TitleService} from "@synerty/peek-client-fe-util";
import {
    ComponentLifecycleEventEmitter,
    TupleActionPushOfflineService,
    TupleDataOfflineObserverService,
    TupleSelector
} from "@synerty/vortexjs";
import {
    PeekDmsJobListItemTuple,
    PeekDmsJobOperationFieldConfirmAction,
    PeekDmsJobOperationStateEnum,
    PeekDmsJobOperationTuple
} from "@peek-client/peek_plugin_data_dms";
import {
    fieldSwitchingBaseUrl,
    FieldSwitchingJobService
} from "@peek-client/peek_plugin_pof_field_switching";
import {UserService} from "@peek-client/peek_plugin_user";
import {OpConfirmDialogData} from "./op-confirm/op-confirm.component";

import * as moment from "moment";

@Component({
    selector: 'peek-plugin-pof-field-switching-job-op',
    templateUrl: 'job-op-detail.component.ns.html',
    moduleId: module.id
})
export class JobOperationDetailComponent extends ComponentLifecycleEventEmitter implements OnInit {

    op: PeekDmsJobOperationTuple = new PeekDmsJobOperationTuple();
    operations: PeekDmsJobOperationTuple[] = [];

    thisJobIsActive = false;

    jobId: string = "";
    operationId: string = "";
    jobNumber: string = "";

    operationSelector: TupleSelector | null = null;

    locationConfirmed: boolean = false;
    circuitConfirmed: boolean = false;
    actionConfirmed: boolean = false;

    confirmDialogData: OpConfirmDialogData | null = null;

    constructor(private balloonMsg: Ng2BalloonMsgService,
                private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private tupleOfflineAction: TupleActionPushOfflineService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: TitleService,
                private userService: UserService,
                private fieldSwitchingJobService: FieldSwitchingJobService) {
        super();
        titleService.setTitle(`Operation - Loading...`);
    }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.jobId = params['jobId'];
                this.operationId = params['opId'];
                this.jobNumber = params['jobNumber'];

                // this.titleService.setTitle(`Operations - ${this.jobNumber}`);
                this.loadOperations();
            });
    }

    private loadOperations() {


        let tupleSelector = new TupleSelector(PeekDmsJobListItemTuple.tupleName, {
            userId: this.userService.loggedInUserDetails.userId
        });

        let sup = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector)
            .subscribe((tuples: PeekDmsJobListItemTuple[]) => {
                for (let job of tuples) {
                    this.thisJobIsActive = false;
                    if (job.jobId === this.jobId && job.fieldStatus.isActive) {
                        this.thisJobIsActive = true;
                        break;
                    }

                }

            });
        this.onDestroyEvent.subscribe(() => sup.unsubscribe());


        // Load all the operations, because the TupleSelector isn't clever enough to
        // to get one operation from the list we already load
        this.operationSelector = new TupleSelector(
            PeekDmsJobOperationTuple.tupleName,
            {"jobId": this.jobId}
        );

        let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(this.operationSelector)
            .subscribe((operations: PeekDmsJobOperationTuple[]) => {
                this.locationConfirmed = false;
                this.circuitConfirmed = false;
                this.actionConfirmed = false;

                this.operations = (<PeekDmsJobOperationTuple[]>operations)
                    .sort((o1, o2) => o1.operationNumber - o2.operationNumber);

                // Fine our operation from the list
                let ops = (<PeekDmsJobOperationTuple[]>operations)
                    .filter(o => o.operationId === this.operationId);

                // If there is none, set everything to nothing
                if (ops.length === 0) {
                    this.op = new PeekDmsJobOperationTuple();
                    this.titleService.setTitle(`Operation - ERROR`);
                    return
                }

                // else, we've found it (which we should have, set it up)
                let op = ops[0];
                this.titleService.setTitle(
                    `Operation ${this.jobNumber} #${op.operationNumber}`);
                this.op = op;
            });
        this.onDestroyEvent.subscribe(() => sub.unsubscribe());

    }


    // --------------------------------------
    // UI NAV Functions

    navToMyJobs() {
        this.router.navigate([fieldSwitchingBaseUrl, 'joblist']);
    }

    navToJob() {
        this.router.navigate([fieldSwitchingBaseUrl, 'jobdetail', this.jobId]);
    }

    navToOperations() {
        this.router.navigate([fieldSwitchingBaseUrl, 'joboplist',
            this.jobId, this.jobNumber]);
    }

    navToLastOperation() {
        let op = this.operations[this.operations.indexOf(this.op) - 1];
        this.router.navigate([fieldSwitchingBaseUrl, 'jobopdetail',
            this.jobId, this.jobNumber, op.operationId]);
    }

    navToNextOperation() {
        let op = this.operations[this.operations.indexOf(this.op) + 1];
        this.router.navigate([fieldSwitchingBaseUrl, 'jobopdetail',
            this.jobId, this.jobNumber, op.operationId]);
    }


    // --------------------------------------
    // UI Display Functions

    lastOperationEnabled(): boolean {
        return 0 < this.operations.indexOf(this.op);
    }

    nextOperationEnabled(): boolean {
        return this.operations.indexOf(this.op) < this.operations.length - 1;
    }


    confirmEnabled(): boolean {
        if (!this.thisJobIsActive)
            return false;

        for (let op of this.operations) {
            if (op === this.op)
                break;
            if (op.currentState.isInstructed)
                return false;
        }

        let userId = this.userService.loggedInUserDetails.userId;
        if (userId != this.op.fieldEngineerUserId)
            return false;

        return this.op.currentState.isInstructed;
    }


    isPermit(): boolean {
        return this.op.permit.permitId != null;
    }


    // --------------------------------------
    // Actions

    private _confirmOperation(action: any, description: string,
                              dateTime: Date, furtherInstructions: boolean) {
        // Leave the spaces and wraps in here

        action.jobId = this.jobId;
        action.operationId = this.op.operationId;
        action.userId = this.userService.loggedInUserDetails.userId;
        action.dateTime = dateTime;
        action.requestFurtherInstructions = furtherInstructions;

        let isSameOrAfter = moment(action.dateTime)
            .isAfter(moment(this.op.instructSystemDate).subtract(1, 'minutes'));
        let isSameOrBefore = moment(action.dateTime).isSameOrBefore(moment());

        if (!(isSameOrAfter && isSameOrBefore)) {
            alert('The confirm date/time must be between the instructed date and now');
            return;
        }

        this.tupleOfflineAction.pushAction(action)
            .then(() => {
                this.balloonMsg.showSuccess("Queued for sending");

                // Update our state and store it
                this.op.currentState.value = PeekDmsJobOperationStateEnum.FIELD_CONFIRMED;
                this.op.confirmSystemDate = new Date();
                this.tupleDataOfflineObserver.updateOfflineState(
                    this.operationSelector, this.operations);
            })
            .catch(err => alert(err));


        // Update our state and store it
        this.op.currentState.value = PeekDmsJobOperationStateEnum.STATE_CHANGE_PENDING;
        this.tupleDataOfflineObserver.updateOfflineState(
            this.operationSelector, this.operations);

    }

    confirmOp() {
        this.confirmDialogData = new OpConfirmDialogData();
    }

    confirmDialogShown() {
        return this.confirmDialogData != null;
    }

    dialogConfirmed(data: OpConfirmDialogData) {
        if (!(this.locationConfirmed && this.circuitConfirmed && this.actionConfirmed)) {
            alert('You must confirm'
                + ' LOCATION, CIRCUIT and ACTION'
                + ' before confirming the operation');
            return;
        }
        this._confirmOperation(new PeekDmsJobOperationFieldConfirmAction(),
            "Field Confirm", data.operationDate, data.requestFurtherInstructions);

        this.confirmDialogData = null;
    }

    dialogCanceled() {
        this.confirmDialogData = null;
    }


}
