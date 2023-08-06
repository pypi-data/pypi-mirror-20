import {TupleDataOfflineObserverService,
    TupleSelector,
    VortexStatusService} from "@synerty/vortexjs";
import {UserService} from "@peek-client/peek_plugin_user";
import {PeekDmsJobListItemTuple, PeekDmsJobTuple} from "@peek-client/peek_plugin_data_dms";


export class CacheOfflineModule {
    constructor(private tupleDataOfflineObserver: TupleDataOfflineObserverService,
                private vortexStatusService: VortexStatusService,
                private userService: UserService) {

    }

    cache(userId) {
        // Cache Job Details
        let tupleSelector = new TupleSelector(
            PeekDmsJobListItemTuple.tupleName,
            {"userId": userId}
        );

        let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector);

    }

    private cacheJob(jobId) {
        // Cache Job Details
        let tupleSelector = new TupleSelector(
            PeekDmsJobTuple.tupleName,
            {"jobId": jobId}
        );

        let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector);

        /*
         let tupleSelector = new TupleSelector(
         PeekDmsPeekDmsJobTuple.tupleName,
         {"jobId": jobId}
         );

         let sub = this.tupleDataOfflineObserver.subscribeToTupleSelector(tupleSelector);
         */
    }
}