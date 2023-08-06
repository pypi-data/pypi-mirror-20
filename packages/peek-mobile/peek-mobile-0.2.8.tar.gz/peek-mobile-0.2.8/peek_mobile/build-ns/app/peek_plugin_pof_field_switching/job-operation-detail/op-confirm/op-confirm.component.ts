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
import {Component} from "@angular/core";
import {ComponentLifecycleEventEmitter} from "@synerty/vortexjs";

import * as moment from "moment";


export class OpConfirmDialogData {

    operationDate: Date = new Date();
    requestFurtherInstructions: boolean=false;
    actionName:string = "Confirm";

    constructor() {

    }
}

@Component({
    moduleId: module.id,
    selector: 'pl-pof-field-switching-op-confirm',
    templateUrl: 'op-confirm.component.ns.html',
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
export class OpConfirmComponent extends ComponentLifecycleEventEmitter implements OnInit {

    dialogAnimationState = "shown";

    @Input("data")
    inputData: OpConfirmDialogData = null;

    @Output("confirm")
    confirmEvent: EventEmitter<OpConfirmDialogData>
        = new EventEmitter<OpConfirmDialogData>();

    @Output("cancel")
    cancelEvent: EventEmitter<void> = new EventEmitter<void>();

    reasonIndex: number = 0;
    confirmed = false;

    constructor() {
        super();
    }

    ngOnInit() {

    }

    /** Confirm Clicked
     * @param emit Emit the events, this is failse for web as the animation end fires
     *              the events.
     */
    confirmClicked(emit: boolean) {
        this.dialogAnimationState = "hidden";
        this.confirmed = true;
        emit && this.emitEvents();
    }

    cancelClicked(emit: boolean) {
        this.dialogAnimationState = "hidden";
        this.confirmed = false;
        emit && this.emitEvents();
    }

    animationDone(e) {
        if (e.toState !== "hidden")
            return;
        this.emitEvents();
    }

    private emitEvents() {
        if (this.confirmed) {
            this.confirmEvent.emit(this.inputData);
            // A bit of a hack here. The op-detail we emit to will set this to null if
            // it succeeds.
            // Also, We shouldn't change the animation state inside an animation
            // state emit, so call it later with setTimeout.

            if (this.inputData != null)
                setTimeout(() => this.dialogAnimationState = "shown", 0);

        } else {
            this.cancelEvent.emit();
        }
    }
    //--------------------------------
    // Nativescript specific code

    webConfirmClicked() {

        this.inputData.operationDate =
            moment(this.inputData.operationDate, "DD-MMM-YYYY HH:mm").toDate();
        this.confirmClicked(false);
    }

    nsConfirmClicked(datePicker, timePicker) {
        // Force the year to the curreny
        let year = new Date().getFullYear();
        this.inputData.operationDate =  new Date(datePicker.year, datePicker.month - 1,
            datePicker.day, timePicker.hour, timePicker.minute);
        this.confirmClicked(true);
    }

    configureTime(timePicker) {
        let now = new Date();
        timePicker.hour = now.getHours();
        timePicker.minute = now.getMinutes();
    }
    configureDate(datePicker) {
        let now = new Date();

        datePicker.year = now.getFullYear();
        datePicker.month = now.getMonth() + 1;
        datePicker.day = now.getDate();
    }

}

