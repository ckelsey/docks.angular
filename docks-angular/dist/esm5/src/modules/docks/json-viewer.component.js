/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import JSONFormatter from 'json-formatter-js';
var JsonViewerComponent = /** @class */ (function () {
    function JsonViewerComponent() {
    }
    Object.defineProperty(JsonViewerComponent.prototype, "html", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formatter = new JSONFormatter(this.json, 0, {
                hoverPreviewEnabled: false,
                hoverPreviewArrayCount: 100,
                hoverPreviewFieldCount: 5,
            });
            return formatter.render().outerHTML;
        },
        enumerable: true,
        configurable: true
    });
    JsonViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-json-viewer',
                    template: "<div [innerHTML]=\"html\"></div>",
                    styles: [".json-formatter-row .json-formatter-row,.json-formatter-row a{white-space:nowrap}"]
                },] },
    ];
    JsonViewerComponent.propDecorators = {
        json: [{ type: Input, args: ['json',] }]
    };
    return JsonViewerComponent;
}());
export { JsonViewerComponent };
if (false) {
    /** @type {?} */
    JsonViewerComponent.prototype.json;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2pzb24tdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUE7Ozs7SUFhekMsc0JBQUkscUNBQUk7Ozs7UUFBUjs7WUFDSSxJQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtnQkFDOUMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsc0JBQXNCLEVBQUUsR0FBRztnQkFDM0Isc0JBQXNCLEVBQUUsQ0FBQzthQUM1QixDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQTtTQUN0Qzs7O09BQUE7O2dCQW5CSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFLGtDQUFnQztvQkFDMUMsTUFBTSxFQUFFLENBQUMsbUZBQW1GLENBQUM7aUJBQ2hHOzs7dUJBSUksS0FBSyxTQUFDLE1BQU07OzhCQVhqQjs7U0FTYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgSlNPTkZvcm1hdHRlciBmcm9tICdqc29uLWZvcm1hdHRlci1qcydcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtanNvbi12aWV3ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbaW5uZXJIVE1MXT1cImh0bWxcIj48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1yb3csLmpzb24tZm9ybWF0dGVyLXJvdyBhe3doaXRlLXNwYWNlOm5vd3JhcH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIEpzb25WaWV3ZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCdqc29uJylcbiAgICBqc29uOiBhbnlcblxuICAgIGdldCBodG1sKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKHRoaXMuanNvbiwgMCwge1xuICAgICAgICAgICAgaG92ZXJQcmV2aWV3RW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdBcnJheUNvdW50OiAxMDAsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdGaWVsZENvdW50OiA1LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyLnJlbmRlcigpLm91dGVySFRNTFxuICAgIH1cbn1cbiJdfQ==