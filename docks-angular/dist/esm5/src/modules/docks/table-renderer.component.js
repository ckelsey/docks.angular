/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
var TableRendererComponent = /** @class */ (function () {
    function TableRendererComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    Object.defineProperty(TableRendererComponent.prototype, "propertiesDataKeys", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.properties.data);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    TableRendererComponent.prototype.getLink = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return typeName.toLowerCase() + "." + docLinkName;
    };
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    TableRendererComponent.prototype.getDocData = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TableRendererComponent.prototype.showJsonViewer = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return !!val && typeof val !== "string";
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.showText = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key !== 'value' && key !== 'arguments' && key !== 'testCases';
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TableRendererComponent.prototype.isString = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return !!val && typeof val === "string";
    };
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.hasTest = /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    function (row, key) {
        return this.service.getThis(this.properties.data, row + "." + key) && this.service.getThis(this.properties.data, row + "." + key, []).length;
    };
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.hasArguments = /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    function (row, key) {
        if (key !== "arguments") {
            return false;
        }
        /** @type {?} */
        var val = this.service.getThis(this.properties.data, row + "." + key);
        /** @type {?} */
        var length = (Array.isArray(val) ? val : []).length;
        if (!length) {
            return false;
        }
        /** @type {?} */
        var pass = true;
        val.forEach(function (element) {
            console.log(element);
            if (!element.hasOwnProperty || !element.hasOwnProperty("name")) {
                pass = false;
            }
        });
        return pass;
    };
    TableRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-table-renderer',
                    template: "<table *ngIf=\"show\" class=\"documentation-table\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let column of properties.columns; let key = index\">{{column.label}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of propertiesDataKeys; let rowIndex = index\">\n            <td *ngFor=\"let column of properties.columns; let key = index\" [ngClass]=\"column.label\">\n                <!-- <div v-if=\"column.key === 'value' && properties.data[row]\">\n                    <app-value-input [model]=\"properties.data[row]\"></app-value-input>\n                </div> -->\n                <div *ngIf=\"showText(column.key)\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                    <div *ngIf=\"isString(properties.data[row][column.key])\" [innerHTML]=\"properties.data[row][column.key]\"></div>\n                </div>\n                <div *ngIf=\"hasArguments(row, column.key)\">\n                    <div *ngFor=\"let argument of properties.data[row][column.key]\" class=\"argument-container\">\n                        <div class=\"argument-name\">\n                            <b>{{argument.name}}</b>\n                            <span *ngIf=\"argument.isOptional\">: (optional)</span>\n                            <span class=\"argument-body\" *ngIf=\"argument.description\"> - {{argument.description}}</span>\n                        </div>\n                        <div class=\"argument-body red-flag\" *ngIf=\"!argument.description\">missing description</div>\n                        <div class=\"argument-object\" *ngIf=\"argument.type\">\n                            <app-json-viewer *ngIf=\"showJsonViewer(argument.type)\" [json]=\"argument.type\"></app-json-viewer>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"column.key === 'testCases'\" [ngClass]=\"{noTest: !hasTest(row, column.key)}\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>",
                    styles: [".documentation-table{width:100%;text-align:left;border-collapse:collapse}.documentation-table td,.documentation-table th{vertical-align:top;padding:14px;font-size:12px}.documentation-table th{background:#a18f74;color:#fff;text-transform:uppercase}.documentation-table td{background:rgba(9,54,84,.05)}.documentation-table td .red-flag{font-family:monospace}.documentation-table td:nth-child(1){font-weight:700}.documentation-table td.type{text-transform:lowercase}.documentation-table tbody tr:nth-child(even)>td{background:rgba(9,54,84,.1)}.documentation-table td td,.documentation-table td th{padding:7px}.documentation-table td pre{font-family:sans-serif;font-size:12px;line-height:18px;background:rgba(255,255,255,.61);padding:7px;margin:0}.documentation-table .argument-container{margin:0 0 14px}.documentation-table .argument-container .argument-name{background:rgba(35,70,100,.15);padding:7px}.documentation-table .argument-container .argument-object{padding:5px 7px;background:rgba(255,255,255,.85)}.documentation-table .argument-container:last-child{margin:0}.documentation-table .noTest{background:#a10005;color:#fff;padding:3px}.documentation-table .noTest *,.documentation-table .noTest .json-formatter-row,.documentation-table .noTest .json-formatter-row a,.documentation-table .noTest .json-formatter-row a:hover{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    TableRendererComponent.ctorParameters = function () { return []; };
    TableRendererComponent.propDecorators = {
        show: [{ type: Input, args: ['show',] }],
        properties: [{ type: Input, args: ['properties',] }]
    };
    return TableRendererComponent;
}());
export { TableRendererComponent };
if (false) {
    /** @type {?} */
    TableRendererComponent.prototype.service;
    /** @type {?} */
    TableRendererComponent.prototype.testService;
    /** @type {?} */
    TableRendererComponent.prototype.show;
    /** @type {?} */
    TableRendererComponent.prototype.properties;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBOztJQTRDeEM7dUJBRWUsb0JBQW9COzJCQUNoQixXQUFXO0tBSGI7SUFXakIsc0JBQUksc0RBQWtCOzs7O1FBQXRCO1lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUMzQzs7O09BQUE7Ozs7OztJQUVELHdDQUFPOzs7OztJQUFQLFVBQVEsV0FBbUIsRUFBRSxRQUFnQjtRQUN6QyxNQUFNLENBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxTQUFJLFdBQWEsQ0FBQTtLQUNwRDs7Ozs7O0lBRUQsMkNBQVU7Ozs7O0lBQVYsVUFBVyxXQUFtQixFQUFFLFFBQWdCO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtLQUM5Rjs7Ozs7SUFFRCwrQ0FBYzs7OztJQUFkLFVBQWUsR0FBUTtRQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUE7S0FDMUM7Ozs7O0lBRUQseUNBQVE7Ozs7SUFBUixVQUFTLEdBQVc7UUFDaEIsTUFBTSxDQUFDLEdBQUcsS0FBSyxPQUFPLElBQUksR0FBRyxLQUFLLFdBQVcsSUFBSSxHQUFHLEtBQUssV0FBVyxDQUFBO0tBQ3ZFOzs7OztJQUVELHlDQUFROzs7O0lBQVIsVUFBUyxHQUFRO1FBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO0tBQzFDOzs7Ozs7SUFFRCx3Q0FBTzs7Ozs7SUFBUCxVQUFRLEdBQUcsRUFBRSxHQUFHO1FBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFLLEdBQUcsU0FBSSxHQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBSyxHQUFHLFNBQUksR0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtLQUMvSTs7Ozs7O0lBRUQsNkNBQVk7Ozs7O0lBQVosVUFBYSxHQUFHLEVBQUUsR0FBRztRQUNqQixFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxDQUFBO1NBQ2Y7O1FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUssR0FBRyxTQUFJLEdBQUssQ0FBQyxDQUFBOztRQUN2RSxJQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFBO1FBRXJELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUE7U0FDZjs7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFFZixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksR0FBRyxLQUFLLENBQUE7YUFDZjtTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUE7S0FDZDs7Z0JBdkdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsdXVFQW1DTDtvQkFDTCxNQUFNLEVBQUUsQ0FBQywyekNBQTJ6QyxDQUFDO2lCQUN4MEM7Ozs7O3VCQVFJLEtBQUssU0FBQyxNQUFNOzZCQUdaLEtBQUssU0FBQyxZQUFZOztpQ0F0RHZCOztTQTRDYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdGFibGUtcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgPHRhYmxlICpuZ0lmPVwic2hvd1wiIGNsYXNzPVwiZG9jdW1lbnRhdGlvbi10YWJsZVwiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgcHJvcGVydGllcy5jb2x1bW5zOyBsZXQga2V5ID0gaW5kZXhcIj57e2NvbHVtbi5sYWJlbH19PC90aD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgcHJvcGVydGllc0RhdGFLZXlzOyBsZXQgcm93SW5kZXggPSBpbmRleFwiPlxuICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgcHJvcGVydGllcy5jb2x1bW5zOyBsZXQga2V5ID0gaW5kZXhcIiBbbmdDbGFzc109XCJjb2x1bW4ubGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxkaXYgdi1pZj1cImNvbHVtbi5rZXkgPT09ICd2YWx1ZScgJiYgcHJvcGVydGllcy5kYXRhW3Jvd11cIj5cbiAgICAgICAgICAgICAgICAgICAgPGFwcC12YWx1ZS1pbnB1dCBbbW9kZWxdPVwicHJvcGVydGllcy5kYXRhW3Jvd11cIj48L2FwcC12YWx1ZS1pbnB1dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dUZXh0KGNvbHVtbi5rZXkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbanNvbl09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTdHJpbmcocHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV0pXCIgW2lubmVySFRNTF09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJoYXNBcmd1bWVudHMocm93LCBjb2x1bW4ua2V5KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBhcmd1bWVudCBvZiBwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiIGNsYXNzPVwiYXJndW1lbnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiPnt7YXJndW1lbnQubmFtZX19PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYXJndW1lbnQuaXNPcHRpb25hbFwiPjogKG9wdGlvbmFsKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFyZ3VtZW50LWJvZHlcIiAqbmdJZj1cImFyZ3VtZW50LmRlc2NyaXB0aW9uXCI+IC0ge3thcmd1bWVudC5kZXNjcmlwdGlvbn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtYm9keSByZWQtZmxhZ1wiICpuZ0lmPVwiIWFyZ3VtZW50LmRlc2NyaXB0aW9uXCI+bWlzc2luZyBkZXNjcmlwdGlvbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFyZ3VtZW50LW9iamVjdFwiICpuZ0lmPVwiYXJndW1lbnQudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihhcmd1bWVudC50eXBlKVwiIFtqc29uXT1cImFyZ3VtZW50LnR5cGVcIj48L2FwcC1qc29uLXZpZXdlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29sdW1uLmtleSA9PT0gJ3Rlc3RDYXNlcydcIiBbbmdDbGFzc109XCJ7bm9UZXN0OiAhaGFzVGVzdChyb3csIGNvbHVtbi5rZXkpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8YXBwLWpzb24tdmlld2VyICpuZ0lmPVwic2hvd0pzb25WaWV3ZXIocHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV0pXCIgW2pzb25dPVwicHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV1cIj48L2FwcC1qc29uLXZpZXdlcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICBzdHlsZXM6IFtgLmRvY3VtZW50YXRpb24tdGFibGV7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmxlZnQ7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkLC5kb2N1bWVudGF0aW9uLXRhYmxlIHRoe3ZlcnRpY2FsLWFsaWduOnRvcDtwYWRkaW5nOjE0cHg7Zm9udC1zaXplOjEycHh9LmRvY3VtZW50YXRpb24tdGFibGUgdGh7YmFja2dyb3VuZDojYTE4Zjc0O2NvbG9yOiNmZmY7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRke2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4wNSl9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgLnJlZC1mbGFne2ZvbnQtZmFtaWx5Om1vbm9zcGFjZX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZDpudGgtY2hpbGQoMSl7Zm9udC13ZWlnaHQ6NzAwfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkLnR5cGV7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChldmVuKT50ZHtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSl9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgdGQsLmRvY3VtZW50YXRpb24tdGFibGUgdGQgdGh7cGFkZGluZzo3cHh9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgcHJle2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjYxKTtwYWRkaW5nOjdweDttYXJnaW46MH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVye21hcmdpbjowIDAgMTRweH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVyIC5hcmd1bWVudC1uYW1le2JhY2tncm91bmQ6cmdiYSgzNSw3MCwxMDAsLjE1KTtwYWRkaW5nOjdweH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVyIC5hcmd1bWVudC1vYmplY3R7cGFkZGluZzo1cHggN3B4O2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuODUpfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXI6bGFzdC1jaGlsZHttYXJnaW46MH0uZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0e2JhY2tncm91bmQ6I2ExMDAwNTtjb2xvcjojZmZmO3BhZGRpbmc6M3B4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgKiwuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3csLmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93IGEsLmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93IGE6aG92ZXJ7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVJlbmRlcmVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBzZXJ2aWNlOiBhbnkgPSBEb2N1bWVudGF0aW9uU2VydmljZVxuICAgIHRlc3RTZXJ2aWNlOiBhbnkgPSBUZXN0U2VydmljZVxuXG4gICAgQElucHV0KCdzaG93JylcbiAgICBzaG93OiBib29sZWFuXG5cbiAgICBASW5wdXQoJ3Byb3BlcnRpZXMnKVxuICAgIHByb3BlcnRpZXM6IGFueVxuXG4gICAgZ2V0IHByb3BlcnRpZXNEYXRhS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcy5kYXRhKVxuICAgIH1cblxuICAgIGdldExpbmsoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0eXBlTmFtZS50b0xvd2VyQ2FzZSgpfS4ke2RvY0xpbmtOYW1lfWBcbiAgICB9XG5cbiAgICBnZXREb2NEYXRhKGRvY0xpbmtOYW1lOiBzdHJpbmcsIHR5cGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YSwgdGhpcy5nZXRMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSksIHt9KVxuICAgIH1cblxuICAgIHNob3dKc29uVmlld2VyKHZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXZhbCAmJiB0eXBlb2YgdmFsICE9PSBgc3RyaW5nYFxuICAgIH1cblxuICAgIHNob3dUZXh0KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBrZXkgIT09ICd2YWx1ZScgJiYga2V5ICE9PSAnYXJndW1lbnRzJyAmJiBrZXkgIT09ICd0ZXN0Q2FzZXMnXG4gICAgfVxuXG4gICAgaXNTdHJpbmcodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IGBzdHJpbmdgXG4gICAgfVxuXG4gICAgaGFzVGVzdChyb3csIGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5wcm9wZXJ0aWVzLmRhdGEsIGAke3Jvd30uJHtrZXl9YCkgJiYgdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5wcm9wZXJ0aWVzLmRhdGEsIGAke3Jvd30uJHtrZXl9YCwgW10pLmxlbmd0aFxuICAgIH1cblxuICAgIGhhc0FyZ3VtZW50cyhyb3csIGtleSkge1xuICAgICAgICBpZiAoa2V5ICE9PSBgYXJndW1lbnRzYCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gKVxuICAgICAgICBjb25zdCBsZW5ndGggPSAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW10pLmxlbmd0aFxuXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXNzID0gdHJ1ZVxuXG4gICAgICAgIHZhbC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudClcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSB8fCAhZWxlbWVudC5oYXNPd25Qcm9wZXJ0eShgbmFtZWApKSB7XG4gICAgICAgICAgICAgICAgcGFzcyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwYXNzXG4gICAgfVxufVxuIl19