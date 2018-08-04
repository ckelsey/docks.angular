/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
var RendererComponent = /** @class */ (function () {
    function RendererComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    Object.defineProperty(RendererComponent.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                data: this.service.doc.children.properties,
                columns: [{
                        key: 'name',
                        label: 'name'
                    }, {
                        key: 'type',
                        label: 'type',
                        required: true
                    }, {
                        key: 'description',
                        label: 'description',
                        required: true
                    }, {
                        key: 'testCases',
                        label: 'test cases'
                    }]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "methods", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                data: this.service.doc.children.methods,
                columns: [{
                        key: 'name',
                        label: 'name'
                    }, {
                        key: 'description',
                        label: 'description',
                        required: true
                    }, {
                        key: 'arguments',
                        label: 'arguments'
                    }, {
                        label: 'returns',
                        key: 'returns'
                    }, {
                        key: 'testCases',
                        label: 'test cases'
                    }]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "attributeProps", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                data: this.service.doc.children.attributeProperties,
                columns: [{
                        key: 'name',
                        label: 'name'
                    }, {
                        key: 'type',
                        label: 'type',
                        required: true
                    }, {
                        key: 'description',
                        label: 'description',
                        required: true
                    }, {
                        key: 'testCases',
                        label: 'test cases'
                    }]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "gettersProps", {
        get: /**
         * @return {?}
         */
        function () {
            return {
                data: this.service.doc.children.getters,
                columns: [{
                        key: 'name',
                        label: 'name'
                    }, {
                        key: 'description',
                        label: 'description',
                        required: true
                    }, {
                        key: 'returns',
                        label: 'returns'
                    }, {
                        key: 'testCases',
                        label: 'test cases'
                    }]
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @return {?}
     */
    RendererComponent.prototype.hasProperties = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var children = this.service.doc.children;
        return children && children[type] && Object.keys(children[type]).length;
    };
    RendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-renderer',
                    template: "<article class=\"doc-element\" *ngIf=\"service.states.view === 'components' && service.doc.name\">\n    <div class=\"h1 title\">{{ service.doc.name }}\n        <span class=\"subtitle\" *ngIf=\"service.doc.description\">{{ service.doc.description }}</span>\n    </div>\n    <section *ngIf=\"service.doc.body\">\n        <div [innerHTML]=\"service.doc.body\"></div>\n    </section>\n    <section *ngIf=\"service.doc.group === 'components'\">\n        <div class=\"h2\" (click)=\"service.states.demo = !service.states.demo\" [ngClass]=\"service.states.demo ? 'active' : ''\">Demo</div>\n        <div *ngIf=\"service.states.demo\">\n            <div>\n                <pre class=\"demo\"><code>{{service.getMarkup(service.doc)}}</code></pre>\n            </div>\n            <div>\n                <!-- <button (click)=\"launch(service.doc)\">Launch demo</button> -->\n            </div>\n            <div id=\"demo-overlay-container\" *ngIf=\"service.states.demoOverlay\">\n                <div id=\"demo-overlay-close\" (click)=\"service.states.demoOverlay = false\">x</div>\n                <div id=\"demo-overlay\"></div>\n            </div>\n        </div>\n    </section>\n\n    <section *ngIf=\"hasProperties('attributeProperties')\">\n        <div class=\"h2\" (click)=\"service.states.props = !service.states.props\" [ngClass]=\"service.states.props ? 'active' : ''\">Attribute properties</div>\n        <app-table-renderer [show]=\"service.states.props\" [properties]=\"attributeProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('properties')\">\n        <div class=\"h2\" (click)=\"service.states.dataProps = !service.states.dataProps\" [ngClass]=\"service.states.dataProps ? 'active' : ''\">Properties</div>\n        <app-table-renderer [show]=\"service.states.dataProps\" [properties]=\"properties\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('getters')\">\n        <div class=\"h2\" (click)=\"service.states.getters = !service.states.getters\" [ngClass]=\"service.states.getters ? 'active' : ''\">Getters</div>\n        <app-table-renderer [show]=\"service.states.getters\" [properties]=\"gettersProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('methods')\">\n        <div class=\"h2\" (click)=\"service.states.methods = !service.states.methods\" [ngClass]=\"service.states.methods ? 'active' : ''\">Methods</div>\n        <app-table-renderer [show]=\"service.states.methods\" [properties]=\"methods\"></app-table-renderer>\n    </section>\n</article>",
                    styles: ["@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}.red-flag{color:#d10005}#docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}button.disabled{opacity:.5;pointer-events:none}button{font-size:12px;border:none;padding:7px;outline:0!important;background:#f3aa00;color:#fff;cursor:pointer}.test-asserts{font-size:12px}.test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}.test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}button.spin-if-running{transition:opacity .5s;margin-right:7px}button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}.spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}.spin-if-running>span{display:inline-block}button.spin-if-running>span{width:16px;height:16px}button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}button.spin-if-running.running>span span{left:1px}.doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}li{list-style:none}.doc-element p{margin:7px 0}.doc-element p.description,.doc-element p.subtitle{margin-bottom:21px}.doc-element h2{margin:14px 0}.doc-element section{margin:0 0 28px}.doc-element input,.doc-element select,.doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}.doc-element textarea{height:100px;resize:none}a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}.example-code pre{margin:0}.h1{font-size:28px;font-weight:700;margin:21px 0}.h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}.h2:before{content:\"\";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}.h3{font-size:14px;margin:17px 0;font-weight:700}.subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#demo-overlay{width:90%;height:90%}pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}.flex-vcenter{display:flex;align-items:center}.test-group-header .h3{margin:0}"]
                },] },
    ];
    /** @nocollapse */
    RendererComponent.ctorParameters = function () { return []; };
    return RendererComponent;
}());
export { RendererComponent };
if (false) {
    /** @type {?} */
    RendererComponent.prototype.service;
    /** @type {?} */
    RendererComponent.prototype.testService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3JlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7O0lBbUR4Qzt1QkFFZSxvQkFBb0I7MkJBQ2hCLFdBQVc7S0FIYjtJQUtqQixzQkFBSSx5Q0FBVTs7OztRQUFkO1lBQ0ksTUFBTSxDQUFDO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDMUMsT0FBTyxFQUFFLENBQUM7d0JBQ04sR0FBRyxFQUFFLE1BQU07d0JBQ1gsS0FBSyxFQUFFLE1BQU07cUJBQ2hCLEVBQUU7d0JBQ0MsR0FBRyxFQUFFLE1BQU07d0JBQ1gsS0FBSyxFQUFFLE1BQU07d0JBQ2IsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLEVBQUU7d0JBQ0MsR0FBRyxFQUFFLGFBQWE7d0JBQ2xCLEtBQUssRUFBRSxhQUFhO3dCQUNwQixRQUFRLEVBQUUsSUFBSTtxQkFDakIsRUFBRTt3QkFDQyxHQUFHLEVBQUUsV0FBVzt3QkFDaEIsS0FBSyxFQUFFLFlBQVk7cUJBQ3RCLENBQUM7YUFDTCxDQUFBO1NBQ0o7OztPQUFBO0lBRUQsc0JBQUksc0NBQU87Ozs7UUFBWDtZQUNJLE1BQU0sQ0FBQztnQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU87Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDO3dCQUNOLEdBQUcsRUFBRSxNQUFNO3dCQUNYLEtBQUssRUFBRSxNQUFNO3FCQUNoQixFQUFFO3dCQUNDLEdBQUcsRUFBRSxhQUFhO3dCQUNsQixLQUFLLEVBQUUsYUFBYTt3QkFDcEIsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLEVBQUU7d0JBQ0MsR0FBRyxFQUFFLFdBQVc7d0JBQ2hCLEtBQUssRUFBRSxXQUFXO3FCQUNyQixFQUFFO3dCQUNDLEtBQUssRUFBRSxTQUFTO3dCQUNoQixHQUFHLEVBQUUsU0FBUztxQkFDakIsRUFBRTt3QkFDQyxHQUFHLEVBQUUsV0FBVzt3QkFDaEIsS0FBSyxFQUFFLFlBQVk7cUJBQ3RCLENBQUM7YUFDTCxDQUFBO1NBQ0o7OztPQUFBO0lBRUQsc0JBQUksNkNBQWM7Ozs7UUFBbEI7WUFDSSxNQUFNLENBQUM7Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUI7Z0JBQ25ELE9BQU8sRUFBRSxDQUFDO3dCQUNOLEdBQUcsRUFBRSxNQUFNO3dCQUNYLEtBQUssRUFBRSxNQUFNO3FCQUNoQixFQUFFO3dCQUNDLEdBQUcsRUFBRSxNQUFNO3dCQUNYLEtBQUssRUFBRSxNQUFNO3dCQUNiLFFBQVEsRUFBRSxJQUFJO3FCQUNqQixFQUFFO3dCQUNDLEdBQUcsRUFBRSxhQUFhO3dCQUNsQixLQUFLLEVBQUUsYUFBYTt3QkFDcEIsUUFBUSxFQUFFLElBQUk7cUJBQ2pCLEVBQUU7d0JBQ0MsR0FBRyxFQUFFLFdBQVc7d0JBQ2hCLEtBQUssRUFBRSxZQUFZO3FCQUl0QixDQUFDO2FBQ0wsQ0FBQTtTQUNKOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFZOzs7O1FBQWhCO1lBQ0ksTUFBTSxDQUFDO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTztnQkFDdkMsT0FBTyxFQUFFLENBQUM7d0JBQ04sR0FBRyxFQUFFLE1BQU07d0JBQ1gsS0FBSyxFQUFFLE1BQU07cUJBQ2hCLEVBQUU7d0JBQ0MsR0FBRyxFQUFFLGFBQWE7d0JBQ2xCLEtBQUssRUFBRSxhQUFhO3dCQUNwQixRQUFRLEVBQUUsSUFBSTtxQkFDakIsRUFBRTt3QkFDQyxHQUFHLEVBQUUsU0FBUzt3QkFDZCxLQUFLLEVBQUUsU0FBUztxQkFDbkIsRUFBRTt3QkFDQyxHQUFHLEVBQUUsV0FBVzt3QkFDaEIsS0FBSyxFQUFFLFlBQVk7cUJBQ3RCLENBQUM7YUFDTCxDQUFBO1NBQ0o7OztPQUFBOzs7OztJQUVELHlDQUFhOzs7O0lBQWIsVUFBYyxJQUFZOztRQUN0QixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDMUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FDMUU7O2dCQWpKSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFFBQVEsRUFBRSxxZ0ZBMENIO29CQUNQLE1BQU0sRUFBRSxDQUFDLGkvR0FBKytHLENBQUM7aUJBQzUvRzs7Ozs0QkFsREQ7O1NBbURhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcbmltcG9ydCB7IFRlc3RTZXJ2aWNlIH0gZnJvbSAnLi90ZXN0LXNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXJlbmRlcmVyJyxcbiAgICB0ZW1wbGF0ZTogYDxhcnRpY2xlIGNsYXNzPVwiZG9jLWVsZW1lbnRcIiAqbmdJZj1cInNlcnZpY2Uuc3RhdGVzLnZpZXcgPT09ICdjb21wb25lbnRzJyAmJiBzZXJ2aWNlLmRvYy5uYW1lXCI+XG4gICAgPGRpdiBjbGFzcz1cImgxIHRpdGxlXCI+e3sgc2VydmljZS5kb2MubmFtZSB9fVxuICAgICAgICA8c3BhbiBjbGFzcz1cInN1YnRpdGxlXCIgKm5nSWY9XCJzZXJ2aWNlLmRvYy5kZXNjcmlwdGlvblwiPnt7IHNlcnZpY2UuZG9jLmRlc2NyaXB0aW9uIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxzZWN0aW9uICpuZ0lmPVwic2VydmljZS5kb2MuYm9keVwiPlxuICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwic2VydmljZS5kb2MuYm9keVwiPjwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICA8c2VjdGlvbiAqbmdJZj1cInNlcnZpY2UuZG9jLmdyb3VwID09PSAnY29tcG9uZW50cydcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmRlbW8gPSAhc2VydmljZS5zdGF0ZXMuZGVtb1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLmRlbW8gPyAnYWN0aXZlJyA6ICcnXCI+RGVtbzwvZGl2PlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2VydmljZS5zdGF0ZXMuZGVtb1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cHJlIGNsYXNzPVwiZGVtb1wiPjxjb2RlPnt7c2VydmljZS5nZXRNYXJrdXAoc2VydmljZS5kb2MpfX08L2NvZGU+PC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPCEtLSA8YnV0dG9uIChjbGljayk9XCJsYXVuY2goc2VydmljZS5kb2MpXCI+TGF1bmNoIGRlbW88L2J1dHRvbj4gLS0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkZW1vLW92ZXJsYXktY29udGFpbmVyXCIgKm5nSWY9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vT3ZlcmxheVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZW1vLW92ZXJsYXktY2xvc2VcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZGVtb092ZXJsYXkgPSBmYWxzZVwiPng8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGVtby1vdmVybGF5XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdhdHRyaWJ1dGVQcm9wZXJ0aWVzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLnByb3BzID0gIXNlcnZpY2Uuc3RhdGVzLnByb3BzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMucHJvcHMgPyAnYWN0aXZlJyA6ICcnXCI+QXR0cmlidXRlIHByb3BlcnRpZXM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5wcm9wc1wiIFtwcm9wZXJ0aWVzXT1cImF0dHJpYnV0ZVByb3BzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdwcm9wZXJ0aWVzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wcyA9ICFzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHMgPyAnYWN0aXZlJyA6ICcnXCI+UHJvcGVydGllczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wc1wiIFtwcm9wZXJ0aWVzXT1cInByb3BlcnRpZXNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ2dldHRlcnMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZ2V0dGVycyA9ICFzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMuZ2V0dGVycyA/ICdhY3RpdmUnIDogJydcIj5HZXR0ZXJzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMuZ2V0dGVyc1wiIFtwcm9wZXJ0aWVzXT1cImdldHRlcnNQcm9wc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygnbWV0aG9kcycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5tZXRob2RzID0gIXNlcnZpY2Uuc3RhdGVzLm1ldGhvZHNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5tZXRob2RzID8gJ2FjdGl2ZScgOiAnJ1wiPk1ldGhvZHM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5tZXRob2RzXCIgW3Byb3BlcnRpZXNdPVwibWV0aG9kc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cbjwvYXJ0aWNsZT5gLFxuICAgIHN0eWxlczogW2BALXdlYmtpdC1rZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRpbmd7MCUsMTAwJXtvcGFjaXR5Oi4zfTUwJXtvcGFjaXR5Oi44fX1Aa2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fS5yZWQtZmxhZ3tjb2xvcjojZDEwMDA1fSNkb2NzLWNsb3NlLWJ1dHRvbntwb3NpdGlvbjpmaXhlZDt0b3A6N3B4O3JpZ2h0OjdweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6I2YzYWEwMDtwYWRkaW5nOjdweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Zm9udC13ZWlnaHQ6NzAwO3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXJ9YnV0dG9uLmRpc2FibGVke29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZX1idXR0b257Zm9udC1zaXplOjEycHg7Ym9yZGVyOm5vbmU7cGFkZGluZzo3cHg7b3V0bGluZTowIWltcG9ydGFudDtiYWNrZ3JvdW5kOiNmM2FhMDA7Y29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn0udGVzdC1hc3NlcnRze2ZvbnQtc2l6ZToxMnB4fS50ZXN0LWFzc2VydHMgLnRlc3QtYXNzZXJ0e3BhZGRpbmc6N3B4IDdweCA3cHggNDdweDtiYWNrZ3JvdW5kOnJnYmEoMzUsNzEsMTAwLC4wNCl9LnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnQ6bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA5KX1idXR0b24uc3Bpbi1pZi1ydW5uaW5ne3RyYW5zaXRpb246b3BhY2l0eSAuNXM7bWFyZ2luLXJpZ2h0OjdweH1idXR0b24uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmd7b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBmYWRpbmc7YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSBmYWRpbmd9LnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW57dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycywtd2Via2l0LXRyYW5zZm9ybSAuMnM7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgcm90YXRpbmd9LnNwaW4taWYtcnVubmluZz5zcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrfWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmc+c3Bhbnt3aWR0aDoxNnB4O2hlaWdodDoxNnB4fWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmc+c3BhbiBzcGFue3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6MXB4O3RvcDowO3RyYW5zaXRpb246bGVmdCAuMnN9YnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW4gc3BhbntsZWZ0OjFweH0uZG9jLXZpZXdlcntoZWlnaHQ6MTAwJTtwYWRkaW5nOjE0cHg7b3ZlcmZsb3c6YXV0bzt3aWR0aDoxMDAlO2NvbG9yOiMyMzQ3NjR9bGl7bGlzdC1zdHlsZTpub25lfS5kb2MtZWxlbWVudCBwe21hcmdpbjo3cHggMH0uZG9jLWVsZW1lbnQgcC5kZXNjcmlwdGlvbiwuZG9jLWVsZW1lbnQgcC5zdWJ0aXRsZXttYXJnaW4tYm90dG9tOjIxcHh9LmRvYy1lbGVtZW50IGgye21hcmdpbjoxNHB4IDB9LmRvYy1lbGVtZW50IHNlY3Rpb257bWFyZ2luOjAgMCAyOHB4fS5kb2MtZWxlbWVudCBpbnB1dCwuZG9jLWVsZW1lbnQgc2VsZWN0LC5kb2MtZWxlbWVudCB0ZXh0YXJlYXtiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyOm5vbmU7aGVpZ2h0OjMycHg7d2lkdGg6MTAwJTttYXgtd2lkdGg6MjEwcHg7Ym9yZGVyLXJhZGl1czoxcHg7b3V0bGluZTowIWltcG9ydGFudDstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7cGFkZGluZzoxMHB4O2NvbG9yOiMyMzQ2NjQ7Ym94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuMjIpO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZG9jLWVsZW1lbnQgdGV4dGFyZWF7aGVpZ2h0OjEwMHB4O3Jlc2l6ZTpub25lfWEgLmV4YW1wbGUtY29kZXt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87cGFkZGluZzo3cHg7YmFja2dyb3VuZDojYTE4Zjc0O2NvbG9yOiNmZmY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbToyMXB4fS5leGFtcGxlLWNvZGUgcHJle21hcmdpbjowfS5oMXtmb250LXNpemU6MjhweDtmb250LXdlaWdodDo3MDA7bWFyZ2luOjIxcHggMH0uaDJ7Zm9udC1zaXplOjE4cHg7bWFyZ2luOjE0cHggMCAwO2JhY2tncm91bmQ6IzIzNDc2NDtjb2xvcjojZmZmO3BhZGRpbmc6MTBweDtjdXJzb3I6cG9pbnRlcn0uaDI6YmVmb3Jle2NvbnRlbnQ6XCJcIjtib3JkZXI6N3B4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0LWNvbG9yOiNmZmY7d2lkdGg6MDtoZWlnaHQ6MDtkaXNwbGF5OmlubGluZS1ibG9ja30uaDIuYWN0aXZlOmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjRweDtsZWZ0Oi0zcHh9Lmgze2ZvbnQtc2l6ZToxNHB4O21hcmdpbjoxN3B4IDA7Zm9udC13ZWlnaHQ6NzAwfS5zdWJ0aXRsZXtmb250LXNpemU6MTRweDtmb250LXdlaWdodDoxMDA7dmVydGljYWwtYWxpZ246YmFzZWxpbmU7bWFyZ2luLWxlZnQ6N3B4fSNkZW1vLW92ZXJsYXl7d2lkdGg6OTAlO2hlaWdodDo5MCV9cHJlLmRlbW97Zm9udC1zaXplOjEycHg7cGFkZGluZzo3cHg7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjEpO292ZXJmbG93OmF1dG99I2RlbW8tb3ZlcmxheS1jb250YWluZXJ7cG9zaXRpb246Zml4ZWQ7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTt0b3A6MDtsZWZ0OjA7YmFja2dyb3VuZDojMGIxMTE2ZGU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3otaW5kZXg6OTk5OTk5OTk5O2NvbG9yOiNmZmY7b3ZlcmZsb3c6YXV0b30jZGVtby1vdmVybGF5LWNsb3Nle3Bvc2l0aW9uOmZpeGVkO3RvcDoxNHB4O3JpZ2h0OjE0cHg7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMjMpO3BhZGRpbmc6N3B4O3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtjdXJzb3I6cG9pbnRlcn0uZmxleC12Y2VudGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LnRlc3QtZ3JvdXAtaGVhZGVyIC5oM3ttYXJnaW46MH1gXVxufSlcbmV4cG9ydCBjbGFzcyBSZW5kZXJlckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIGdldCBwcm9wZXJ0aWVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlbi5wcm9wZXJ0aWVzLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBrZXk6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ25hbWUnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndHlwZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtZXRob2RzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlbi5tZXRob2RzLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBrZXk6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ25hbWUnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnYXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2FyZ3VtZW50cydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3JldHVybnMnLFxuICAgICAgICAgICAgICAgIGtleTogJ3JldHVybnMnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGF0dHJpYnV0ZVByb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlbi5hdHRyaWJ1dGVQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBrZXk6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ25hbWUnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndHlwZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgICAgIC8vIH0sIHtcbiAgICAgICAgICAgICAgICAvLyAgICAga2V5OiAndmFsdWUnLFxuICAgICAgICAgICAgICAgIC8vICAgICBsYWJlbDogJ3ZhbHVlJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBnZXR0ZXJzUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLmdldHRlcnMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdyZXR1cm5zJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3JldHVybnMnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzUHJvcGVydGllcyh0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuXG4gICAgICAgIHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlblt0eXBlXSAmJiBPYmplY3Qua2V5cyhjaGlsZHJlblt0eXBlXSkubGVuZ3RoXG4gICAgfVxufVxuIl19