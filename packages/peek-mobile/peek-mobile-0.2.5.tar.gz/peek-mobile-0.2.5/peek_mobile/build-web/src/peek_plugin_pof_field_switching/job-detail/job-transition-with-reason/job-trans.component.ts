import {
    animate,
    EventEmitter,
    Input,
    OnInit,
    Output,
    state,
    style,
    transition,
    trigger
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Component} from "@angular/core";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {
    ComponentLifecycleEventEmitter,
    TupleActionABC,
    TupleActionPushOfflineService,
    TupleDataOfflineObserverService,
    TupleSelector
} from "@synerty/vortexjs";
import {UserService} from "@peek-client/peek_plugin_user";
import {FieldSwitchingLookupListTuple} from "@peek-client/peek_plugin_pof_field_switching";

export class JobTransitionDialogData {

    reason: FieldSwitchingLookupListTuple;

    constructor(public lookupType: string,
                public actionName: string,
                public action: TupleActionABC,
                public newJobState: string) {

    }

}


@Component({
    moduleId: module.id,
    selector: 'pl-pof-field-switching-job-transition-with-reason',
    templateUrl: './job-trans.component.web.html',
    animations: [
        trigger('dialogAnimation', [
            state('void', style({
                transform: "translateY(-100%)",
                opacity: 0,
                height: 0
            })),
            state('hidden', style({
                transform: "translateY(-100%)",
                opacity: 0,
                height: 0
            })),
            state('shown', style({})),
            transition('* => *', animate(500))
        ])
    ]
})
export class JobTransitionWithReasonComponent extends ComponentLifecycleEventEmitter implements OnInit {

    dialogAnimationState = "shown";

    @Input("data")
    inputData: JobTransitionDialogData = null;

    @Output("confirm")
    confirmEvent: EventEmitter<JobTransitionDialogData>
        = new EventEmitter<JobTransitionDialogData>();

    @Output("cancel")
    cancelEvent: EventEmitter<void> = new EventEmitter<void>();

    lookupOptions: FieldSwitchingLookupListTuple[] = [];
    lookupOptionStrings: Array<string> = []; // Used by NS ListPicker

    reasonIndex: number = 0;
    confirmed = false;


    constructor(private balloonMsg: Ng2BalloonMsgService,
                private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private tupleOfflineAction: TupleActionPushOfflineService,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
        super();
    }

    ngOnInit() {

        // Load Handback Lookups ------------------

        let stopSelector = new TupleSelector(FieldSwitchingLookupListTuple.tupleName, {
            "lookupName": this.inputData.lookupType
        });
        console.log("ng init");

        let sup = this.tupleDataOfflineObserver.subscribeToTupleSelector(stopSelector)
            .subscribe((tuples: FieldSwitchingLookupListTuple[]) => {
                this.lookupOptions = tuples.sort((o1, o2) => o1.order - o2.order);

                this.lookupOptionStrings = [];
                for (let item of this.lookupOptions) {
                    this.lookupOptionStrings.push(item.mobileText);
                }
            });
        this.onDestroyEvent.subscribe(() => sup.unsubscribe());
    }


    /** Confirm Clicked
     * @param emit Emit the events, this is failse for web as the animation end fires
     *              the events.
     */
    confirmClicked(emit: boolean) {
        this.dialogAnimationState = "hidden";
        this.confirmed = true;
        this.inputData.reason = this.lookupOptions[this.reasonIndex];
        emit && this.emitEvents();
    }

    cancelClicked(emit: boolean) {
        this.dialogAnimationState = "hidden";
        emit && this.emitEvents();
    }

    animationDone(e) {
        console.log(JSON.stringify(e));

        if (e.toState !== "hidden")
            return;
        this.emitEvents();
    }

    private emitEvents() {
        if (this.confirmed) {
            this.confirmEvent.emit(this.inputData);
        } else {
            this.cancelEvent.emit();
        }
    }

}

