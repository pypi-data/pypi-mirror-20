import {OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Component} from "@angular/core";
import {
    ComponentLifecycleEventEmitter,
    TupleDataOfflineObserverService,
    TupleSelector
} from "@synerty/vortexjs";
import {TitleService} from "@synerty/peek-client-fe-util";
import {PeekDmsJobOperationTuple} from "@peek-client/peek_plugin_data_dms";
import {fieldSwitchingBaseUrl} from "@peek-client/peek_plugin_pof_field_switching";

@Component({
    selector: 'peek-plugin-pof-field-switching-job-op-list',
    templateUrl: 'job-op-list.component.ns.html',
    moduleId: module.id
})
export class JobOperationListComponent extends ComponentLifecycleEventEmitter implements OnInit {

    operations: PeekDmsJobOperationTuple[] = [];
    jobId: string = "";
    jobNumber: string = "";

    constructor(private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private route: ActivatedRoute,
                private router: Router,
                private titleService: TitleService) {
        super();
        titleService.setTitle(`Operations - Loading...`);
    }

    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.jobId = params['jobId'];
                this.jobNumber = params['jobNumber'];
                this.titleService.setTitle(`Operations - ${this.jobNumber}`);
                this.loadOperations(this.jobId);
            });
    }

    private loadOperations(jobId: string) {
        let tupleSelector = new TupleSelector(
            PeekDmsJobOperationTuple.tupleName,
            {"jobId": jobId}
        );

        let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector)
            .subscribe(operations => {
                this.operations = (<PeekDmsJobOperationTuple[]>operations)
                    .sort((o1, o2) => o1.operationNumber - o2.operationNumber);
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

    navToOperation(op:PeekDmsJobOperationTuple) {
        this.router.navigate([fieldSwitchingBaseUrl, 'jobopdetail',
            this.jobId, this.jobNumber,op.operationId]);
    }


    // --------------------------------------
    // UI Display Functions

    backJobText(): string {
        return ` < Job ${this.jobNumber}`;
    }

    // --------------------------------------
    // UI Display Functions


}
