/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var ViewerInputComponent = /** @class */ (function () {
    function ViewerInputComponent() {
        this.proxyModel = "";
        this.type = "string";
    }
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.getProxyModel = /**
     * @return {?}
     */
    function () {
        switch (this.type) {
            case "string":
                return this.model.value ? this.model.value.toString() : "";
            case "number":
                return this.model.value ? parseFloat(this.model.value) : 0;
            case "boolean":
                return this.model.value;
            default:
                /** @type {?} */
                var val = this.model.value;
                try {
                    val = JSON.stringify(this.model.value);
                }
                catch (error) { }
                return val || "{}";
        }
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.updateVal = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.proxyModel;
        switch (this.type) {
            case "string":
                this.model.value = value ? value.toString() : "";
                break;
            case "number":
                this.model.value = value ? parseFloat(value) : 0;
                break;
            case "boolean":
                this.model.value = !!value;
                break;
            default:
                try {
                    value = JSON.parse(value);
                }
                catch (error) { }
                this.model.value = value || {};
        }
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        console.log(this.type, this.model);
        this.proxyModel = this.getProxyModel();
        this.type = this.model ? this.model.type || this.model.kind || "string" : "string";
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.showTextarea = /**
     * @return {?}
     */
    function () {
        return this.type !== 'string' && this.type !== 'number';
    };
    ViewerInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-value-input',
                    template: "<div class=\"value-input\">\n    <textarea *ngIf=\"showTextarea()\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"></textarea>\n    <!-- <input type=\"number\" *ngIf=\"type === 'number'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"text\" *ngIf=\"type === 'string'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"checkbox\" *ngIf=\"type === 'boolean'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"> -->\n</div>",
                    styles: [""]
                },] },
    ];
    ViewerInputComponent.propDecorators = {
        model: [{ type: Input, args: ['model',] }]
    };
    return ViewerInputComponent;
}());
export { ViewerInputComponent };
function ViewerInputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ViewerInputComponent.prototype.model;
    /** @type {?} */
    ViewerInputComponent.prototype.proxyModel;
    /** @type {?} */
    ViewerInputComponent.prototype.type;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3ZhbHVlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7OzswQkFrQnhDLEVBQUU7b0JBRUEsUUFBUTs7Ozs7SUFFdkIsNENBQWE7OztJQUFiO1FBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUM5RCxLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzlELEtBQUssU0FBUztnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFFM0I7O2dCQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO2dCQUUxQixJQUFJLENBQUM7b0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDekM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFFbkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUE7U0FDekI7S0FDSjs7OztJQUVELHdDQUFTOzs7SUFBVDs7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBRTNCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO2dCQUNoRCxLQUFLLENBQUE7WUFDVCxLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDaEQsS0FBSyxDQUFBO1lBQ1QsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUE7Z0JBQzFCLEtBQUssQ0FBQTtZQUVUO2dCQUNJLElBQUksQ0FBQztvQkFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDNUI7Z0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFFbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQTtTQUNyQztLQUNKOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFBO0tBQ3JGOzs7O0lBRUQsMkNBQVk7OztJQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFBO0tBQzFEOztnQkF4RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxrZEFLUDtvQkFDSCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2Y7Ozt3QkFJSSxLQUFLLFNBQUMsT0FBTzs7K0JBZmxCOztTQWFhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC12YWx1ZS1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmFsdWUtaW5wdXRcIj5cbiAgICA8dGV4dGFyZWEgKm5nSWY9XCJzaG93VGV4dGFyZWEoKVwiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj48L3RleHRhcmVhPlxuICAgIDwhLS0gPGlucHV0IHR5cGU9XCJudW1iZXJcIiAqbmdJZj1cInR5cGUgPT09ICdudW1iZXInXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwidHlwZSA9PT0gJ3N0cmluZydcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICpuZ0lmPVwidHlwZSA9PT0gJ2Jvb2xlYW4nXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPiAtLT5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuXG5leHBvcnQgY2xhc3MgVmlld2VySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpXG4gICAgbW9kZWw6IGFueVxuXG4gICAgcHJveHlNb2RlbCA9IGBgXG5cbiAgICB0eXBlOiBzdHJpbmcgPSBgc3RyaW5nYFxuXG4gICAgZ2V0UHJveHlNb2RlbCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYHN0cmluZ2A6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFsdWUgPyB0aGlzLm1vZGVsLnZhbHVlLnRvU3RyaW5nKCkgOiBgYFxuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZSA/IHBhcnNlRmxvYXQodGhpcy5tb2RlbC52YWx1ZSkgOiAwXG4gICAgICAgICAgICBjYXNlIGBib29sZWFuYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLm1vZGVsLnZhbHVlXG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm1vZGVsLnZhbHVlKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgfHwgYHt9YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3h5TW9kZWxcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBgc3RyaW5nYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogYGBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IDBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgYm9vbGVhbmA6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9ICEhdmFsdWVcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgfHwge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGUsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIHRoaXMucHJveHlNb2RlbCA9IHRoaXMuZ2V0UHJveHlNb2RlbCgpXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLnR5cGUgfHwgdGhpcy5tb2RlbC5raW5kIHx8IGBzdHJpbmdgIDogYHN0cmluZ2BcbiAgICB9XG5cbiAgICBzaG93VGV4dGFyZWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgIT09ICdzdHJpbmcnICYmIHRoaXMudHlwZSAhPT0gJ251bWJlcidcbiAgICB9XG59XG4iXX0=