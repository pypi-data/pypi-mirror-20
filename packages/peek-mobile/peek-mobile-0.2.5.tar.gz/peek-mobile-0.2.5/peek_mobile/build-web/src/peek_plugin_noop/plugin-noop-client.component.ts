import {Component} from "@angular/core";
import {ComponentLifecycleEventEmitter, VortexService} from "@synerty/vortexjs";
import {noopFilt} from "@peek-client/peek_plugin_noop";
import {extend} from "@synerty/vortexjs";

@Component({
    selector: 'plugin-noop-admin',
    templateUrl: 'plugin-noop-client.component.web.html',
    moduleId: module.id
})
export class PluginNoopClientComponent extends ComponentLifecycleEventEmitter {

    date: string = "No data yet";
    stopped: boolean = false;

    private filt = extend({
        "key": "sendDate"
    }, noopFilt);

    constructor(vortexService: VortexService) {
        super();

        let loader = vortexService.createTupleLoader(this, this.filt);
        loader.observable
            .subscribe(tuples => {
                // Update our value
                this.date = tuples[0];

            });

        this.onDestroyEvent.subscribe(() => {
            this.stopped = true;
        });

        let loadAgain = () => {
            if (this.stopped)
                return;

            // Schedule a reload in 1 second
            setTimeout(() => {
                loadAgain();
                loader.load()
            }, 2000);
        };

        loadAgain();
    }


}