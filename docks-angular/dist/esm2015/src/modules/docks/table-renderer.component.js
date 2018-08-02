/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
export class TableRendererComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get propertiesDataKeys() {
        return Object.keys(this.properties.data);
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getLink(docLinkName, typeName) {
        return `${typeName.toLowerCase()}.${docLinkName}`;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getDocData(docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    }
    /**
     * @param {?} val
     * @return {?}
     */
    showJsonViewer(val) {
        return !!val && typeof val !== `string`;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    showText(key) {
        return key !== 'value' && key !== 'arguments' && key !== 'testCases';
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isString(val) {
        return !!val && typeof val === `string`;
    }
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    hasTest(row, key) {
        return this.service.getThis(this.properties.data, `${row}.${key}`) && this.service.getThis(this.properties.data, `${row}.${key}`, []).length;
    }
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    hasArguments(row, key) {
        if (key !== `arguments`) {
            return false;
        }
        /** @type {?} */
        const val = this.service.getThis(this.properties.data, `${row}.${key}`);
        /** @type {?} */
        const length = (Array.isArray(val) ? val : []).length;
        if (!length) {
            return false;
        }
        /** @type {?} */
        let pass = true;
        val.forEach(element => {
            console.log(element);
            if (!element.hasOwnProperty || !element.hasOwnProperty(`name`)) {
                pass = false;
            }
        });
        return pass;
    }
}
TableRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-table-renderer',
                template: `<table *ngIf="show" class="documentation-table">
    <thead>
        <tr>
            <th *ngFor="let column of properties.columns; let key = index">{{column.label}}</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let row of propertiesDataKeys; let rowIndex = index">
            <td *ngFor="let column of properties.columns; let key = index" [ngClass]="column.label">
                <!-- <div v-if="column.key === 'value' && properties.data[row]">
                    <app-value-input [model]="properties.data[row]"></app-value-input>
                </div> -->
                <div *ngIf="showText(column.key)">
                    <app-json-viewer *ngIf="showJsonViewer(properties.data[row][column.key])" [json]="properties.data[row][column.key]"></app-json-viewer>
                    <div *ngIf="isString(properties.data[row][column.key])" [innerHTML]="properties.data[row][column.key]"></div>
                </div>
                <div *ngIf="hasArguments(row, column.key)">
                    <div *ngFor="let argument of properties.data[row][column.key]" class="argument-container">
                        <div class="argument-name">
                            <b>{{argument.name}}</b>
                            <span *ngIf="argument.isOptional">: (optional)</span>
                            <span class="argument-body" *ngIf="argument.description"> - {{argument.description}}</span>
                        </div>
                        <div class="argument-body red-flag" *ngIf="!argument.description">missing description</div>
                        <div class="argument-object" *ngIf="argument.type">
                            <app-json-viewer *ngIf="showJsonViewer(argument.type)" [json]="argument.type"></app-json-viewer>
                        </div>
                    </div>
                </div>
                <div *ngIf="column.key === 'testCases'" [ngClass]="{noTest: !hasTest(row, column.key)}">
                    <app-json-viewer *ngIf="showJsonViewer(properties.data[row][column.key])" [json]="properties.data[row][column.key]"></app-json-viewer>
                </div>
            </td>
        </tr>
    </tbody>
</table>`,
                styles: [`.documentation-table{width:100%;text-align:left;border-collapse:collapse}.documentation-table td,.documentation-table th{vertical-align:top;padding:14px;font-size:12px}.documentation-table th{background:#a18f74;color:#fff;text-transform:uppercase}.documentation-table td{background:rgba(9,54,84,.05)}.documentation-table td .red-flag{font-family:monospace}.documentation-table td:nth-child(1){font-weight:700}.documentation-table td.type{text-transform:lowercase}.documentation-table tbody tr:nth-child(even)>td{background:rgba(9,54,84,.1)}.documentation-table td td,.documentation-table td th{padding:7px}.documentation-table td pre{font-family:sans-serif;font-size:12px;line-height:18px;background:rgba(255,255,255,.61);padding:7px;margin:0}.documentation-table .argument-container{margin:0 0 14px}.documentation-table .argument-container .argument-name{background:rgba(35,70,100,.15);padding:7px}.documentation-table .argument-container .argument-object{padding:5px 7px;background:rgba(255,255,255,.85)}.documentation-table .argument-container:last-child{margin:0}.documentation-table .noTest{background:#a10005;color:#fff;padding:3px}.documentation-table .noTest *,.documentation-table .noTest .json-formatter-row,.documentation-table .noTest .json-formatter-row a,.documentation-table .noTest .json-formatter-row a:hover{color:#fff}`]
            },] },
];
/** @nocollapse */
TableRendererComponent.ctorParameters = () => [];
TableRendererComponent.propDecorators = {
    show: [{ type: Input, args: ['show',] }],
    properties: [{ type: Input, args: ['properties',] }]
};
function TableRendererComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TableRendererComponent.prototype.service;
    /** @type {?} */
    TableRendererComponent.prototype.testService;
    /** @type {?} */
    TableRendererComponent.prototype.show;
    /** @type {?} */
    TableRendererComponent.prototype.properties;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBMEM1QyxNQUFNO0lBRUY7dUJBRWUsb0JBQW9COzJCQUNoQixXQUFXO0tBSGI7Ozs7SUFXakIsSUFBSSxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUMzQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7UUFDekMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFBO0tBQ3BEOzs7Ozs7SUFFRCxVQUFVLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDOUY7Ozs7O0lBRUQsY0FBYyxDQUFDLEdBQVE7UUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO0tBQzFDOzs7OztJQUVELFFBQVEsQ0FBQyxHQUFXO1FBQ2hCLE1BQU0sQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLFdBQVcsQ0FBQTtLQUN2RTs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBUTtRQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQTtLQUMxQzs7Ozs7O0lBRUQsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFBO0tBQy9JOzs7Ozs7SUFFRCxZQUFZLENBQUMsR0FBRyxFQUFFLEdBQUc7UUFDakIsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQTtTQUNmOztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7O1FBQ3ZFLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFFckQsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQTtTQUNmOztRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUVmLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxHQUFHLEtBQUssQ0FBQTthQUNmO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQTtLQUNkOzs7WUF2R0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtQ0w7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsMnpDQUEyekMsQ0FBQzthQUN4MEM7Ozs7O21CQVFJLEtBQUssU0FBQyxNQUFNO3lCQUdaLEtBQUssU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcbmltcG9ydCB7IFRlc3RTZXJ2aWNlIH0gZnJvbSAnLi90ZXN0LXNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXRhYmxlLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZTogYDx0YWJsZSAqbmdJZj1cInNob3dcIiBjbGFzcz1cImRvY3VtZW50YXRpb24tdGFibGVcIj5cbiAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHByb3BlcnRpZXMuY29sdW1uczsgbGV0IGtleSA9IGluZGV4XCI+e3tjb2x1bW4ubGFiZWx9fTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcm93IG9mIHByb3BlcnRpZXNEYXRhS2V5czsgbGV0IHJvd0luZGV4ID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIHByb3BlcnRpZXMuY29sdW1uczsgbGV0IGtleSA9IGluZGV4XCIgW25nQ2xhc3NdPVwiY29sdW1uLmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8ZGl2IHYtaWY9XCJjb2x1bW4ua2V5ID09PSAndmFsdWUnICYmIHByb3BlcnRpZXMuZGF0YVtyb3ddXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhcHAtdmFsdWUtaW5wdXQgW21vZGVsXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddXCI+PC9hcHAtdmFsdWUtaW5wdXQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+IC0tPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzaG93VGV4dChjb2x1bW4ua2V5KVwiPlxuICAgICAgICAgICAgICAgICAgICA8YXBwLWpzb24tdmlld2VyICpuZ0lmPVwic2hvd0pzb25WaWV3ZXIocHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV0pXCIgW2pzb25dPVwicHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV1cIj48L2FwcC1qc29uLXZpZXdlcj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImlzU3RyaW5nKHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldKVwiIFtpbm5lckhUTUxdPVwicHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaGFzQXJndW1lbnRzKHJvdywgY29sdW1uLmtleSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgYXJndW1lbnQgb2YgcHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV1cIiBjbGFzcz1cImFyZ3VtZW50LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFyZ3VtZW50LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Yj57e2FyZ3VtZW50Lm5hbWV9fTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImFyZ3VtZW50LmlzT3B0aW9uYWxcIj46IChvcHRpb25hbCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcmd1bWVudC1ib2R5XCIgKm5nSWY9XCJhcmd1bWVudC5kZXNjcmlwdGlvblwiPiAtIHt7YXJndW1lbnQuZGVzY3JpcHRpb259fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFyZ3VtZW50LWJvZHkgcmVkLWZsYWdcIiAqbmdJZj1cIiFhcmd1bWVudC5kZXNjcmlwdGlvblwiPm1pc3NpbmcgZGVzY3JpcHRpb248L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmd1bWVudC1vYmplY3RcIiAqbmdJZj1cImFyZ3VtZW50LnR5cGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YXBwLWpzb24tdmlld2VyICpuZ0lmPVwic2hvd0pzb25WaWV3ZXIoYXJndW1lbnQudHlwZSlcIiBbanNvbl09XCJhcmd1bWVudC50eXBlXCI+PC9hcHAtanNvbi12aWV3ZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImNvbHVtbi5rZXkgPT09ICd0ZXN0Q2FzZXMnXCIgW25nQ2xhc3NdPVwie25vVGVzdDogIWhhc1Rlc3Qocm93LCBjb2x1bW4ua2V5KX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGFwcC1qc29uLXZpZXdlciAqbmdJZj1cInNob3dKc29uVmlld2VyKHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldKVwiIFtqc29uXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCI+PC9hcHAtanNvbi12aWV3ZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG48L3RhYmxlPmAsXG4gICAgc3R5bGVzOiBbYC5kb2N1bWVudGF0aW9uLXRhYmxle3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpsZWZ0O2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCwuZG9jdW1lbnRhdGlvbi10YWJsZSB0aHt2ZXJ0aWNhbC1hbGlnbjp0b3A7cGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxMnB4fS5kb2N1bWVudGF0aW9uLXRhYmxlIHRoe2JhY2tncm91bmQ6I2ExOGY3NDtjb2xvcjojZmZmO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZHtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMDUpfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkIC5yZWQtZmxhZ3tmb250LWZhbWlseTptb25vc3BhY2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGQ6bnRoLWNoaWxkKDEpe2ZvbnQtd2VpZ2h0OjcwMH0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZC50eXBle3RleHQtdHJhbnNmb3JtOmxvd2VyY2FzZX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0Ym9keSB0cjpudGgtY2hpbGQoZXZlbik+dGR7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjEpfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkIHRkLC5kb2N1bWVudGF0aW9uLXRhYmxlIHRkIHRoe3BhZGRpbmc6N3B4fS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkIHByZXtmb250LWZhbWlseTpzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjE4cHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC42MSk7cGFkZGluZzo3cHg7bWFyZ2luOjB9LmRvY3VtZW50YXRpb24tdGFibGUgLmFyZ3VtZW50LWNvbnRhaW5lcnttYXJnaW46MCAwIDE0cHh9LmRvY3VtZW50YXRpb24tdGFibGUgLmFyZ3VtZW50LWNvbnRhaW5lciAuYXJndW1lbnQtbmFtZXtiYWNrZ3JvdW5kOnJnYmEoMzUsNzAsMTAwLC4xNSk7cGFkZGluZzo3cHh9LmRvY3VtZW50YXRpb24tdGFibGUgLmFyZ3VtZW50LWNvbnRhaW5lciAuYXJndW1lbnQtb2JqZWN0e3BhZGRpbmc6NXB4IDdweDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjg1KX0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVyOmxhc3QtY2hpbGR7bWFyZ2luOjB9LmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdHtiYWNrZ3JvdW5kOiNhMTAwMDU7Y29sb3I6I2ZmZjtwYWRkaW5nOjNweH0uZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0ICosLmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93LC5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhLC5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhOmhvdmVye2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVSZW5kZXJlckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIEBJbnB1dCgnc2hvdycpXG4gICAgc2hvdzogYm9vbGVhblxuXG4gICAgQElucHV0KCdwcm9wZXJ0aWVzJylcbiAgICBwcm9wZXJ0aWVzOiBhbnlcblxuICAgIGdldCBwcm9wZXJ0aWVzRGF0YUtleXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMuZGF0YSlcbiAgICB9XG5cbiAgICBnZXRMaW5rKGRvY0xpbmtOYW1lOiBzdHJpbmcsIHR5cGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dHlwZU5hbWUudG9Mb3dlckNhc2UoKX0uJHtkb2NMaW5rTmFtZX1gXG4gICAgfVxuXG4gICAgZ2V0RG9jRGF0YShkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnNlcnZpY2UuRG9jc0RhdGEsIHRoaXMuZ2V0TGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpLCB7fSlcbiAgICB9XG5cbiAgICBzaG93SnNvblZpZXdlcih2YWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF2YWwgJiYgdHlwZW9mIHZhbCAhPT0gYHN0cmluZ2BcbiAgICB9XG5cbiAgICBzaG93VGV4dChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4ga2V5ICE9PSAndmFsdWUnICYmIGtleSAhPT0gJ2FyZ3VtZW50cycgJiYga2V5ICE9PSAndGVzdENhc2VzJ1xuICAgIH1cblxuICAgIGlzU3RyaW5nKHZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXZhbCAmJiB0eXBlb2YgdmFsID09PSBgc3RyaW5nYFxuICAgIH1cblxuICAgIGhhc1Rlc3Qocm93LCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMucHJvcGVydGllcy5kYXRhLCBgJHtyb3d9LiR7a2V5fWApICYmIHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMucHJvcGVydGllcy5kYXRhLCBgJHtyb3d9LiR7a2V5fWAsIFtdKS5sZW5ndGhcbiAgICB9XG5cbiAgICBoYXNBcmd1bWVudHMocm93LCBrZXkpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gYGFyZ3VtZW50c2ApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsID0gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5wcm9wZXJ0aWVzLmRhdGEsIGAke3Jvd30uJHtrZXl9YClcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gKEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFtdKS5sZW5ndGhcblxuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFzcyA9IHRydWVcblxuICAgICAgICB2YWwuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVsZW1lbnQpXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQuaGFzT3duUHJvcGVydHkgfHwgIWVsZW1lbnQuaGFzT3duUHJvcGVydHkoYG5hbWVgKSkge1xuICAgICAgICAgICAgICAgIHBhc3MgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcGFzc1xuICAgIH1cbn1cbiJdfQ==