/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class ViewerInputComponent {
    constructor() {
        this.proxyModel = ``;
        this.type = `string`;
    }
    /**
     * @return {?}
     */
    getProxyModel() {
        switch (this.type) {
            case `string`:
                return this.model.value ? this.model.value.toString() : ``;
            case `number`:
                return this.model.value ? parseFloat(this.model.value) : 0;
            case `boolean`:
                return this.model.value;
            default:
                /** @type {?} */
                let val = this.model.value;
                try {
                    val = JSON.stringify(this.model.value);
                }
                catch (error) { }
                return val || `{}`;
        }
    }
    /**
     * @return {?}
     */
    updateVal() {
        /** @type {?} */
        let value = this.proxyModel;
        switch (this.type) {
            case `string`:
                this.model.value = value ? value.toString() : ``;
                break;
            case `number`:
                this.model.value = value ? parseFloat(value) : 0;
                break;
            case `boolean`:
                this.model.value = !!value;
                break;
            default:
                try {
                    value = JSON.parse(value);
                }
                catch (error) { }
                this.model.value = value || {};
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        console.log(this.type, this.model);
        this.proxyModel = this.getProxyModel();
        this.type = this.model ? this.model.type || this.model.kind || `string` : `string`;
    }
    /**
     * @return {?}
     */
    showTextarea() {
        return this.type !== 'string' && this.type !== 'number';
    }
}
ViewerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-value-input',
                template: `<div class="value-input">
    <textarea *ngIf="showTextarea()" [(ngModel)]="proxyModel" (input)="updateVal"></textarea>
    <!-- <input type="number" *ngIf="type === 'number'" [(ngModel)]="proxyModel" (input)="updateVal">
    <input type="text" *ngIf="type === 'string'" [(ngModel)]="proxyModel" (input)="updateVal">
    <input type="checkbox" *ngIf="type === 'boolean'" [(ngModel)]="proxyModel" (input)="updateVal"> -->
</div>`,
                styles: [``]
            },] },
];
ViewerInputComponent.propDecorators = {
    model: [{ type: Input, args: ['model',] }]
};
if (false) {
    /** @type {?} */
    ViewerInputComponent.prototype.model;
    /** @type {?} */
    ViewerInputComponent.prototype.proxyModel;
    /** @type {?} */
    ViewerInputComponent.prototype.type;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3ZhbHVlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFhekQsTUFBTTs7MEJBS1csRUFBRTtvQkFFQSxRQUFROzs7OztJQUV2QixhQUFhO1FBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUM5RCxLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzlELEtBQUssU0FBUztnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7WUFFM0I7O2dCQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO2dCQUUxQixJQUFJLENBQUM7b0JBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQkFDekM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFFbkIsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUE7U0FDekI7S0FDSjs7OztJQUVELFNBQVM7O1FBQ0wsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQTtRQUUzQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtnQkFDaEQsS0FBSyxDQUFBO1lBQ1QsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hELEtBQUssQ0FBQTtZQUNULEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFBO2dCQUMxQixLQUFLLENBQUE7WUFFVDtnQkFDSSxJQUFJLENBQUM7b0JBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQzVCO2dCQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBRW5CLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUE7U0FDckM7S0FDSjs7OztJQUVELFFBQVE7UUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUE7S0FDckY7Ozs7SUFFRCxZQUFZO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFBO0tBQzFEOzs7WUF4RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFFBQVEsRUFBRTs7Ozs7T0FLUDtnQkFDSCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7O29CQUlJLEtBQUssU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXZhbHVlLWlucHV0JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJ2YWx1ZS1pbnB1dFwiPlxuICAgIDx0ZXh0YXJlYSAqbmdJZj1cInNob3dUZXh0YXJlYSgpXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPjwvdGV4dGFyZWE+XG4gICAgPCEtLSA8aW5wdXQgdHlwZT1cIm51bWJlclwiICpuZ0lmPVwidHlwZSA9PT0gJ251bWJlcidcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgKm5nSWY9XCJ0eXBlID09PSAnc3RyaW5nJ1wiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgKm5nSWY9XCJ0eXBlID09PSAnYm9vbGVhbidcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+IC0tPlxuPC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgYF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBWaWV3ZXJJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ21vZGVsJylcbiAgICBtb2RlbDogYW55XG5cbiAgICBwcm94eU1vZGVsID0gYGBcblxuICAgIHR5cGU6IHN0cmluZyA9IGBzdHJpbmdgXG5cbiAgICBnZXRQcm94eU1vZGVsKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBgc3RyaW5nYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZSA/IHRoaXMubW9kZWwudmFsdWUudG9TdHJpbmcoKSA6IGBgXG4gICAgICAgICAgICBjYXNlIGBudW1iZXJgOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhbHVlID8gcGFyc2VGbG9hdCh0aGlzLm1vZGVsLnZhbHVlKSA6IDBcbiAgICAgICAgICAgIGNhc2UgYGJvb2xlYW5gOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhbHVlXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMubW9kZWwudmFsdWVcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IEpTT04uc3RyaW5naWZ5KHRoaXMubW9kZWwudmFsdWUpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCB8fCBge31gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWYWwoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMucHJveHlNb2RlbFxuXG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGBzdHJpbmdgOlxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWUgPSB2YWx1ZSA/IHZhbHVlLnRvU3RyaW5nKCkgOiBgYFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIGBudW1iZXJgOlxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWUgPSB2YWx1ZSA/IHBhcnNlRmxvYXQodmFsdWUpIDogMFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIGBib29sZWFuYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gISF2YWx1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWUgPSB2YWx1ZSB8fCB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudHlwZSwgdGhpcy5tb2RlbCk7XG5cbiAgICAgICAgdGhpcy5wcm94eU1vZGVsID0gdGhpcy5nZXRQcm94eU1vZGVsKClcbiAgICAgICAgdGhpcy50eXBlID0gdGhpcy5tb2RlbCA/IHRoaXMubW9kZWwudHlwZSB8fCB0aGlzLm1vZGVsLmtpbmQgfHwgYHN0cmluZ2AgOiBgc3RyaW5nYFxuICAgIH1cblxuICAgIHNob3dUZXh0YXJlYSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSAhPT0gJ3N0cmluZycgJiYgdGhpcy50eXBlICE9PSAnbnVtYmVyJ1xuICAgIH1cbn1cbiJdfQ==