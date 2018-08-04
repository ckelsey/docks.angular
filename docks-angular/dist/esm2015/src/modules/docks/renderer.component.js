/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
export class RendererComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get properties() {
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
    }
    /**
     * @return {?}
     */
    get methods() {
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
    }
    /**
     * @return {?}
     */
    get attributeProps() {
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
    }
    /**
     * @return {?}
     */
    get gettersProps() {
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
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasProperties(type) {
        /** @type {?} */
        const children = this.service.doc.children;
        return children && children[type] && Object.keys(children[type]).length;
    }
}
RendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-renderer',
                template: `<article class="doc-element" *ngIf="service.states.view === 'components' && service.doc.name">
    <div class="h1 title">{{ service.doc.name }}
        <span class="subtitle" *ngIf="service.doc.description">{{ service.doc.description }}</span>
    </div>
    <section *ngIf="service.doc.body">
        <div [innerHTML]="service.doc.body"></div>
    </section>
    <section *ngIf="service.doc.group === 'components'">
        <div class="h2" (click)="service.states.demo = !service.states.demo" [ngClass]="service.states.demo ? 'active' : ''">Demo</div>
        <div *ngIf="service.states.demo">
            <div>
                <pre class="demo"><code>{{service.getMarkup(service.doc)}}</code></pre>
            </div>
            <div>
                <!-- <button (click)="launch(service.doc)">Launch demo</button> -->
            </div>
            <div id="demo-overlay-container" *ngIf="service.states.demoOverlay">
                <div id="demo-overlay-close" (click)="service.states.demoOverlay = false">x</div>
                <div id="demo-overlay"></div>
            </div>
        </div>
    </section>

    <section *ngIf="hasProperties('attributeProperties')">
        <div class="h2" (click)="service.states.props = !service.states.props" [ngClass]="service.states.props ? 'active' : ''">Attribute properties</div>
        <app-table-renderer [show]="service.states.props" [properties]="attributeProps"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('properties')">
        <div class="h2" (click)="service.states.dataProps = !service.states.dataProps" [ngClass]="service.states.dataProps ? 'active' : ''">Properties</div>
        <app-table-renderer [show]="service.states.dataProps" [properties]="properties"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('getters')">
        <div class="h2" (click)="service.states.getters = !service.states.getters" [ngClass]="service.states.getters ? 'active' : ''">Getters</div>
        <app-table-renderer [show]="service.states.getters" [properties]="gettersProps"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('methods')">
        <div class="h2" (click)="service.states.methods = !service.states.methods" [ngClass]="service.states.methods ? 'active' : ''">Methods</div>
        <app-table-renderer [show]="service.states.methods" [properties]="methods"></app-table-renderer>
    </section>
</article>`,
                styles: [`@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}.red-flag{color:#d10005}#docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}button.disabled{opacity:.5;pointer-events:none}button{font-size:12px;border:none;padding:7px;outline:0!important;background:#f3aa00;color:#fff;cursor:pointer}.test-asserts{font-size:12px}.test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}.test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}button.spin-if-running{transition:opacity .5s;margin-right:7px}button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}.spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}.spin-if-running>span{display:inline-block}button.spin-if-running>span{width:16px;height:16px}button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}button.spin-if-running.running>span span{left:1px}.doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}li{list-style:none}.doc-element p{margin:7px 0}.doc-element p.description,.doc-element p.subtitle{margin-bottom:21px}.doc-element h2{margin:14px 0}.doc-element section{margin:0 0 28px}.doc-element input,.doc-element select,.doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}.doc-element textarea{height:100px;resize:none}a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}.example-code pre{margin:0}.h1{font-size:28px;font-weight:700;margin:21px 0}.h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}.h2:before{content:"";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}.h3{font-size:14px;margin:17px 0;font-weight:700}.subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#demo-overlay{width:90%;height:90%}pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}.flex-vcenter{display:flex;align-items:center}.test-group-header .h3{margin:0}`]
            },] },
];
/** @nocollapse */
RendererComponent.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    RendererComponent.prototype.service;
    /** @type {?} */
    RendererComponent.prototype.testService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3JlbmRlcmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQTtBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFpRDVDLE1BQU07SUFFRjt1QkFFZSxvQkFBb0I7MkJBQ2hCLFdBQVc7S0FIYjs7OztJQUtqQixJQUFJLFVBQVU7UUFDVixNQUFNLENBQUM7WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFDMUMsT0FBTyxFQUFFLENBQUM7b0JBQ04sR0FBRyxFQUFFLE1BQU07b0JBQ1gsS0FBSyxFQUFFLE1BQU07aUJBQ2hCLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLE1BQU07b0JBQ1gsS0FBSyxFQUFFLE1BQU07b0JBQ2IsUUFBUSxFQUFFLElBQUk7aUJBQ2pCLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEtBQUssRUFBRSxhQUFhO29CQUNwQixRQUFRLEVBQUUsSUFBSTtpQkFDakIsRUFBRTtvQkFDQyxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFLFlBQVk7aUJBQ3RCLENBQUM7U0FDTCxDQUFBO0tBQ0o7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxNQUFNLENBQUM7WUFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU87WUFDdkMsT0FBTyxFQUFFLENBQUM7b0JBQ04sR0FBRyxFQUFFLE1BQU07b0JBQ1gsS0FBSyxFQUFFLE1BQU07aUJBQ2hCLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLGFBQWE7b0JBQ2xCLEtBQUssRUFBRSxhQUFhO29CQUNwQixRQUFRLEVBQUUsSUFBSTtpQkFDakIsRUFBRTtvQkFDQyxHQUFHLEVBQUUsV0FBVztvQkFDaEIsS0FBSyxFQUFFLFdBQVc7aUJBQ3JCLEVBQUU7b0JBQ0MsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLEdBQUcsRUFBRSxTQUFTO2lCQUNqQixFQUFFO29CQUNDLEdBQUcsRUFBRSxXQUFXO29CQUNoQixLQUFLLEVBQUUsWUFBWTtpQkFDdEIsQ0FBQztTQUNMLENBQUE7S0FDSjs7OztJQUVELElBQUksY0FBYztRQUNkLE1BQU0sQ0FBQztZQUNILElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUJBQW1CO1lBQ25ELE9BQU8sRUFBRSxDQUFDO29CQUNOLEdBQUcsRUFBRSxNQUFNO29CQUNYLEtBQUssRUFBRSxNQUFNO2lCQUNoQixFQUFFO29CQUNDLEdBQUcsRUFBRSxNQUFNO29CQUNYLEtBQUssRUFBRSxNQUFNO29CQUNiLFFBQVEsRUFBRSxJQUFJO2lCQUNqQixFQUFFO29CQUNDLEdBQUcsRUFBRSxhQUFhO29CQUNsQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsUUFBUSxFQUFFLElBQUk7aUJBQ2pCLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLFdBQVc7b0JBQ2hCLEtBQUssRUFBRSxZQUFZO2lCQUl0QixDQUFDO1NBQ0wsQ0FBQTtLQUNKOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ1osTUFBTSxDQUFDO1lBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDO29CQUNOLEdBQUcsRUFBRSxNQUFNO29CQUNYLEtBQUssRUFBRSxNQUFNO2lCQUNoQixFQUFFO29CQUNDLEdBQUcsRUFBRSxhQUFhO29CQUNsQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsUUFBUSxFQUFFLElBQUk7aUJBQ2pCLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLFNBQVM7b0JBQ2QsS0FBSyxFQUFFLFNBQVM7aUJBQ25CLEVBQUU7b0JBQ0MsR0FBRyxFQUFFLFdBQVc7b0JBQ2hCLEtBQUssRUFBRSxZQUFZO2lCQUN0QixDQUFDO1NBQ0wsQ0FBQTtLQUNKOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFZOztRQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUE7UUFDMUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FDMUU7OztZQWpKSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBMENIO2dCQUNQLE1BQU0sRUFBRSxDQUFDLCsrR0FBKytHLENBQUM7YUFDNS9HIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgPGFydGljbGUgY2xhc3M9XCJkb2MtZWxlbWVudFwiICpuZ0lmPVwic2VydmljZS5zdGF0ZXMudmlldyA9PT0gJ2NvbXBvbmVudHMnICYmIHNlcnZpY2UuZG9jLm5hbWVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaDEgdGl0bGVcIj57eyBzZXJ2aWNlLmRvYy5uYW1lIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3VidGl0bGVcIiAqbmdJZj1cInNlcnZpY2UuZG9jLmRlc2NyaXB0aW9uXCI+e3sgc2VydmljZS5kb2MuZGVzY3JpcHRpb24gfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJzZXJ2aWNlLmRvYy5ib2R5XCI+XG4gICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJzZXJ2aWNlLmRvYy5ib2R5XCI+PC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uICpuZ0lmPVwic2VydmljZS5kb2MuZ3JvdXAgPT09ICdjb21wb25lbnRzJ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZGVtbyA9ICFzZXJ2aWNlLnN0YXRlcy5kZW1vXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMuZGVtbyA/ICdhY3RpdmUnIDogJydcIj5EZW1vPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxwcmUgY2xhc3M9XCJkZW1vXCI+PGNvZGU+e3tzZXJ2aWNlLmdldE1hcmt1cChzZXJ2aWNlLmRvYyl9fTwvY29kZT48L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8IS0tIDxidXR0b24gKGNsaWNrKT1cImxhdW5jaChzZXJ2aWNlLmRvYylcIj5MYXVuY2ggZGVtbzwvYnV0dG9uPiAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheS1jb250YWluZXJcIiAqbmdJZj1cInNlcnZpY2Uuc3RhdGVzLmRlbW9PdmVybGF5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheS1jbG9zZVwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vT3ZlcmxheSA9IGZhbHNlXCI+eDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZW1vLW92ZXJsYXlcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ2F0dHJpYnV0ZVByb3BlcnRpZXMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMucHJvcHMgPSAhc2VydmljZS5zdGF0ZXMucHJvcHNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5wcm9wcyA/ICdhY3RpdmUnIDogJydcIj5BdHRyaWJ1dGUgcHJvcGVydGllczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLnByb3BzXCIgW3Byb3BlcnRpZXNdPVwiYXR0cmlidXRlUHJvcHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ3Byb3BlcnRpZXMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzID0gIXNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wcyA/ICdhY3RpdmUnIDogJydcIj5Qcm9wZXJ0aWVzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzXCIgW3Byb3BlcnRpZXNdPVwicHJvcGVydGllc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygnZ2V0dGVycycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzID0gIXNlcnZpY2Uuc3RhdGVzLmdldHRlcnNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzID8gJ2FjdGl2ZScgOiAnJ1wiPkdldHRlcnM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzXCIgW3Byb3BlcnRpZXNdPVwiZ2V0dGVyc1Byb3BzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdtZXRob2RzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHMgPSAhc2VydmljZS5zdGF0ZXMubWV0aG9kc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHMgPyAnYWN0aXZlJyA6ICcnXCI+TWV0aG9kczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHNcIiBbcHJvcGVydGllc109XCJtZXRob2RzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuPC9hcnRpY2xlPmAsXG4gICAgc3R5bGVzOiBbYEAtd2Via2l0LWtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fUBrZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19LnJlZC1mbGFne2NvbG9yOiNkMTAwMDV9I2RvY3MtY2xvc2UtYnV0dG9ue3Bvc2l0aW9uOmZpeGVkO3RvcDo3cHg7cmlnaHQ6N3B4O2NvbG9yOiNmZmY7YmFja2dyb3VuZDojZjNhYTAwO3BhZGRpbmc6N3B4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtmb250LXdlaWdodDo3MDA7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcn1idXR0b24uZGlzYWJsZWR7b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lfWJ1dHRvbntmb250LXNpemU6MTJweDtib3JkZXI6bm9uZTtwYWRkaW5nOjdweDtvdXRsaW5lOjAhaW1wb3J0YW50O2JhY2tncm91bmQ6I2YzYWEwMDtjb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfS50ZXN0LWFzc2VydHN7Zm9udC1zaXplOjEycHh9LnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnR7cGFkZGluZzo3cHggN3B4IDdweCA0N3B4O2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA0KX0udGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydDpudGgtY2hpbGQoZXZlbil7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDkpfWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmd7dHJhbnNpdGlvbjpvcGFjaXR5IC41czttYXJnaW4tcmlnaHQ6N3B4fWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZ3tvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZ30uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3Bhbnt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnM7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzLC13ZWJraXQtdHJhbnNmb3JtIC4yczstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgcm90YXRpbmc7YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZ30uc3Bpbi1pZi1ydW5uaW5nPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9YnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFue3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHh9YnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFuIHNwYW57cG9zaXRpb246cmVsYXRpdmU7bGVmdDoxcHg7dG9wOjA7dHJhbnNpdGlvbjpsZWZ0IC4yc31idXR0b24uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3BhbiBzcGFue2xlZnQ6MXB4fS5kb2Mtdmlld2Vye2hlaWdodDoxMDAlO3BhZGRpbmc6MTRweDtvdmVyZmxvdzphdXRvO3dpZHRoOjEwMCU7Y29sb3I6IzIzNDc2NH1saXtsaXN0LXN0eWxlOm5vbmV9LmRvYy1lbGVtZW50IHB7bWFyZ2luOjdweCAwfS5kb2MtZWxlbWVudCBwLmRlc2NyaXB0aW9uLC5kb2MtZWxlbWVudCBwLnN1YnRpdGxle21hcmdpbi1ib3R0b206MjFweH0uZG9jLWVsZW1lbnQgaDJ7bWFyZ2luOjE0cHggMH0uZG9jLWVsZW1lbnQgc2VjdGlvbnttYXJnaW46MCAwIDI4cHh9LmRvYy1lbGVtZW50IGlucHV0LC5kb2MtZWxlbWVudCBzZWxlY3QsLmRvYy1lbGVtZW50IHRleHRhcmVhe2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6bm9uZTtoZWlnaHQ6MzJweDt3aWR0aDoxMDAlO21heC13aWR0aDoyMTBweDtib3JkZXItcmFkaXVzOjFweDtvdXRsaW5lOjAhaW1wb3J0YW50Oy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtwYWRkaW5nOjEwcHg7Y29sb3I6IzIzNDY2NDtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4yMik7Ym94LXNpemluZzpib3JkZXItYm94fS5kb2MtZWxlbWVudCB0ZXh0YXJlYXtoZWlnaHQ6MTAwcHg7cmVzaXplOm5vbmV9YSAuZXhhbXBsZS1jb2Rle3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjIxcHh9LmV4YW1wbGUtY29kZSBwcmV7bWFyZ2luOjB9Lmgxe2ZvbnQtc2l6ZToyOHB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW46MjFweCAwfS5oMntmb250LXNpemU6MThweDttYXJnaW46MTRweCAwIDA7YmFja2dyb3VuZDojMjM0NzY0O2NvbG9yOiNmZmY7cGFkZGluZzoxMHB4O2N1cnNvcjpwb2ludGVyfS5oMjpiZWZvcmV7Y29udGVudDpcIlwiO2JvcmRlcjo3cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmZjt3aWR0aDowO2hlaWdodDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5oMi5hY3RpdmU6YmVmb3Jle2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci10b3AtY29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NHB4O2xlZnQ6LTNweH0uaDN7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjE3cHggMDtmb250LXdlaWdodDo3MDB9LnN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjEwMDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTttYXJnaW4tbGVmdDo3cHh9I2RlbW8tb3ZlcmxheXt3aWR0aDo5MCU7aGVpZ2h0OjkwJX1wcmUuZGVtb3tmb250LXNpemU6MTJweDtwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSk7b3ZlcmZsb3c6YXV0b30jZGVtby1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RvcDowO2xlZnQ6MDtiYWNrZ3JvdW5kOiMwYjExMTZkZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ei1pbmRleDo5OTk5OTk5OTk7Y29sb3I6I2ZmZjtvdmVyZmxvdzphdXRvfSNkZW1vLW92ZXJsYXktY2xvc2V7cG9zaXRpb246Zml4ZWQ7dG9wOjE0cHg7cmlnaHQ6MTRweDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4yMyk7cGFkZGluZzo3cHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2JvcmRlci1yYWRpdXM6NTAlO2N1cnNvcjpwb2ludGVyfS5mbGV4LXZjZW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0udGVzdC1ncm91cC1oZWFkZXIgLmgze21hcmdpbjowfWBdXG59KVxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBzZXJ2aWNlOiBhbnkgPSBEb2N1bWVudGF0aW9uU2VydmljZVxuICAgIHRlc3RTZXJ2aWNlOiBhbnkgPSBUZXN0U2VydmljZVxuXG4gICAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG1ldGhvZHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLm1ldGhvZHMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdhcmd1bWVudHMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnYXJndW1lbnRzJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAncmV0dXJucycsXG4gICAgICAgICAgICAgICAga2V5OiAncmV0dXJucydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYXR0cmlidXRlUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLmF0dHJpYnV0ZVByb3BlcnRpZXMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICAgICAgLy8gfSwge1xuICAgICAgICAgICAgICAgIC8vICAgICBrZXk6ICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgLy8gICAgIGxhYmVsOiAndmFsdWUnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGdldHRlcnNQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4uZ2V0dGVycyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3JldHVybnMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAncmV0dXJucydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNQcm9wZXJ0aWVzKHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuW3R5cGVdICYmIE9iamVjdC5rZXlzKGNoaWxkcmVuW3R5cGVdKS5sZW5ndGhcbiAgICB9XG59XG4iXX0=