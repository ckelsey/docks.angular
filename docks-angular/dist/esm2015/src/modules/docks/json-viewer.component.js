/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import JSONFormatter from 'json-formatter-js';
export class JsonViewerComponent {
    /**
     * @return {?}
     */
    get html() {
        /** @type {?} */
        const formatter = new JSONFormatter(this.json, 0, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
        });
        return formatter.render().outerHTML;
    }
}
JsonViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-json-viewer',
                template: `<div [innerHTML]="html"></div>`,
                styles: [`.json-formatter-row .json-formatter-row,.json-formatter-row a{white-space:nowrap}`]
            },] },
];
JsonViewerComponent.propDecorators = {
    json: [{ type: Input, args: ['json',] }]
};
if (false) {
    /** @type {?} */
    JsonViewerComponent.prototype.json;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2pzb24tdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sbUJBQW1CLENBQUE7QUFRN0MsTUFBTTs7OztJQUtGLElBQUksSUFBSTs7UUFDSixNQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUM5QyxtQkFBbUIsRUFBRSxLQUFLO1lBQzFCLHNCQUFzQixFQUFFLEdBQUc7WUFDM0Isc0JBQXNCLEVBQUUsQ0FBQztTQUM1QixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQTtLQUN0Qzs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxNQUFNLEVBQUUsQ0FBQyxtRkFBbUYsQ0FBQzthQUNoRzs7O21CQUlJLEtBQUssU0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEpTT05Gb3JtYXR0ZXIgZnJvbSAnanNvbi1mb3JtYXR0ZXItanMnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWpzb24tdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2lubmVySFRNTF09XCJodG1sXCI+PC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItcm93LC5qc29uLWZvcm1hdHRlci1yb3cgYXt3aGl0ZS1zcGFjZTpub3dyYXB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBKc29uVmlld2VyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgnanNvbicpXG4gICAganNvbjogYW55XG5cbiAgICBnZXQgaHRtbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSlNPTkZvcm1hdHRlcih0aGlzLmpzb24sIDAsIHtcbiAgICAgICAgICAgIGhvdmVyUHJldmlld0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaG92ZXJQcmV2aWV3QXJyYXlDb3VudDogMTAwLFxuICAgICAgICAgICAgaG92ZXJQcmV2aWV3RmllbGRDb3VudDogNSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlci5yZW5kZXIoKS5vdXRlckhUTUxcbiAgICB9XG59XG4iXX0=