/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
export class DocksComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    launch(doc) {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.setDocs(this.docs);
        this.testService.setTests(this.tests);
        if (this.initial && this.initial !== ``) {
            this.service.openDoc(this.initial);
            this.service.states.sidebarState = this.initial.split(`.`)[0];
        }
    }
}
DocksComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-docks',
                template: `<div id="documentation-overlay">
  <app-sidebar></app-sidebar>
  <div class="doc-viewer" [ngClass]="service.openedDoc">
    <div class="doc-container">
      <app-renderer></app-renderer>
    </div>
  </div>
</div>`,
                styles: [`@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}#documentation-overlay{position:fixed;top:0;left:0;height:100%;width:100%;z-index:9999999;background:#fff;overflow:hidden;display:flex;font-family:sans-serif}#documentation-overlay .red-flag{color:#d10005}#documentation-overlay #docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}#documentation-overlay button.disabled{opacity:.5;pointer-events:none}#documentation-overlay button{font-size:12px;border:none;padding:7px;outline:0!important}#documentation-overlay .test-asserts{font-size:12px}#documentation-overlay .test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}#documentation-overlay .test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}#documentation-overlay button.spin-if-running{transition:opacity .5s;margin-right:7px}#documentation-overlay button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}#documentation-overlay .spin-if-running.running>span{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}#documentation-overlay .spin-if-running>span{display:inline-block}#documentation-overlay button.spin-if-running>span{width:16px;height:16px}#documentation-overlay button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}#documentation-overlay button.spin-if-running.running>span span{left:1px}#documentation-overlay .doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}#documentation-overlay .doc-viewer li{list-style:none}#documentation-overlay .doc-viewer button{background:#f3aa00;color:#fff;cursor:pointer}#documentation-overlay .doc-viewer .doc-element p{margin:7px 0}#documentation-overlay .doc-viewer .doc-element p.description,#documentation-overlay .doc-viewer .doc-element p.subtitle{margin-bottom:21px}#documentation-overlay .doc-viewer .doc-element h2{margin:14px 0}#documentation-overlay .doc-viewer .doc-element section{margin:0 0 28px}#documentation-overlay .doc-viewer .doc-element input,#documentation-overlay .doc-viewer .doc-element select,#documentation-overlay .doc-viewer .doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}#documentation-overlay .doc-viewer .doc-element textarea{height:100px;resize:none}#documentation-overlay .doc-viewer a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}#documentation-overlay .doc-viewer .example-code pre{margin:0}#documentation-overlay .doc-viewer .h1{font-size:28px;font-weight:700;margin:21px 0}#documentation-overlay .doc-viewer .h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}#documentation-overlay .doc-viewer .h2:before{content:"";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}#documentation-overlay .doc-viewer .h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}#documentation-overlay .doc-viewer .h3{font-size:14px;margin:17px 0;font-weight:700}#documentation-overlay .doc-viewer .subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#documentation-overlay .doc-viewer #demo-overlay{width:90%;height:90%}#documentation-overlay .doc-viewer pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}#documentation-overlay .doc-viewer .flex-vcenter{display:flex;align-items:center}#documentation-overlay .doc-viewer .test-group-header .h3{margin:0}.noTest{background:#a10005;color:#fff;padding:3px}.noTest *,.noTest .json-formatter-row,.noTest .json-formatter-row a,.noTest .json-formatter-row a:hover{color:#fff}.red-flag{color:#a10005}`]
            },] },
];
DocksComponent.propDecorators = {
    docs: [{ type: Input, args: ['docs',] }],
    initial: [{ type: Input, args: ['initial',] }],
    tests: [{ type: Input, args: ['tests',] }],
    componentClasses: [{ type: Input, args: ['componentClasses',] }]
};
function DocksComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DocksComponent.prototype.service;
    /** @type {?} */
    DocksComponent.prototype.testService;
    /** @type {?} */
    DocksComponent.prototype.docs;
    /** @type {?} */
    DocksComponent.prototype.initial;
    /** @type {?} */
    DocksComponent.prototype.tests;
    /** @type {?} */
    DocksComponent.prototype.componentClasses;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2RvY2tzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBYzVDLE1BQU07O3VCQUVhLG9CQUFvQjsyQkFDaEIsV0FBVzs7Ozs7O0lBYzlCLE1BQU0sQ0FBQyxHQUFRO0tBQ2Q7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUVyQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2hFO0tBQ0o7OztZQXhDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7OztPQU9QO2dCQUNILE1BQU0sRUFBRSxDQUFDLGlpS0FBaWlLLENBQUM7YUFDOWlLOzs7bUJBTUksS0FBSyxTQUFDLE1BQU07c0JBR1osS0FBSyxTQUFDLFNBQVM7b0JBR2YsS0FBSyxTQUFDLE9BQU87K0JBR2IsS0FBSyxTQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcbmltcG9ydCB7IFRlc3RTZXJ2aWNlIH0gZnJvbSAnLi90ZXN0LXNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWRvY2tzJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJkb2N1bWVudGF0aW9uLW92ZXJsYXlcIj5cbiAgPGFwcC1zaWRlYmFyPjwvYXBwLXNpZGViYXI+XG4gIDxkaXYgY2xhc3M9XCJkb2Mtdmlld2VyXCIgW25nQ2xhc3NdPVwic2VydmljZS5vcGVuZWREb2NcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZG9jLWNvbnRhaW5lclwiPlxuICAgICAgPGFwcC1yZW5kZXJlcj48L2FwcC1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2BALXdlYmtpdC1rZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRpbmd7MCUsMTAwJXtvcGFjaXR5Oi4zfTUwJXtvcGFjaXR5Oi44fX1Aa2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fSNkb2N1bWVudGF0aW9uLW92ZXJsYXl7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTk5OTk5O2JhY2tncm91bmQ6I2ZmZjtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4O2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWZ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAucmVkLWZsYWd7Y29sb3I6I2QxMDAwNX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5ICNkb2NzLWNsb3NlLWJ1dHRvbntwb3NpdGlvbjpmaXhlZDt0b3A6N3B4O3JpZ2h0OjdweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6I2YzYWEwMDtwYWRkaW5nOjdweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Zm9udC13ZWlnaHQ6NzAwO3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uZGlzYWJsZWR7b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9ue2ZvbnQtc2l6ZToxMnB4O2JvcmRlcjpub25lO3BhZGRpbmc6N3B4O291dGxpbmU6MCFpbXBvcnRhbnR9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAudGVzdC1hc3NlcnRze2ZvbnQtc2l6ZToxMnB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnR7cGFkZGluZzo3cHggN3B4IDdweCA0N3B4O2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA0KX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC50ZXN0LWFzc2VydHMgLnRlc3QtYXNzZXJ0Om50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kOnJnYmEoMzUsNzEsMTAwLC4wOSl9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5ne3RyYW5zaXRpb246b3BhY2l0eSAuNXM7bWFyZ2luLXJpZ2h0OjdweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZ3tvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZ30jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFue3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnNwaW4taWYtcnVubmluZz5zcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFue3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW4gc3Bhbntwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFweDt0b3A6MDt0cmFuc2l0aW9uOmxlZnQgLjJzfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW4gc3BhbntsZWZ0OjFweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2Vye2hlaWdodDoxMDAlO3BhZGRpbmc6MTRweDtvdmVyZmxvdzphdXRvO3dpZHRoOjEwMCU7Y29sb3I6IzIzNDc2NH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGxpe2xpc3Qtc3R5bGU6bm9uZX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGJ1dHRvbntiYWNrZ3JvdW5kOiNmM2FhMDA7Y29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBwe21hcmdpbjo3cHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBwLmRlc2NyaXB0aW9uLCNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHAuc3VidGl0bGV7bWFyZ2luLWJvdHRvbToyMXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IGgye21hcmdpbjoxNHB4IDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgc2VjdGlvbnttYXJnaW46MCAwIDI4cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgaW5wdXQsI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgc2VsZWN0LCNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHRleHRhcmVhe2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6bm9uZTtoZWlnaHQ6MzJweDt3aWR0aDoxMDAlO21heC13aWR0aDoyMTBweDtib3JkZXItcmFkaXVzOjFweDtvdXRsaW5lOjAhaW1wb3J0YW50Oy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtwYWRkaW5nOjEwcHg7Y29sb3I6IzIzNDY2NDtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4yMik7Ym94LXNpemluZzpib3JkZXItYm94fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHRleHRhcmVhe2hlaWdodDoxMDBweDtyZXNpemU6bm9uZX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGEgLmV4YW1wbGUtY29kZXt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87cGFkZGluZzo3cHg7YmFja2dyb3VuZDojYTE4Zjc0O2NvbG9yOiNmZmY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbToyMXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmV4YW1wbGUtY29kZSBwcmV7bWFyZ2luOjB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDF7Zm9udC1zaXplOjI4cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbjoyMXB4IDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDJ7Zm9udC1zaXplOjE4cHg7bWFyZ2luOjE0cHggMCAwO2JhY2tncm91bmQ6IzIzNDc2NDtjb2xvcjojZmZmO3BhZGRpbmc6MTBweDtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMjpiZWZvcmV7Y29udGVudDpcIlwiO2JvcmRlcjo3cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmZjt3aWR0aDowO2hlaWdodDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgyLmFjdGl2ZTpiZWZvcmV7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0cHg7bGVmdDotM3B4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgze2ZvbnQtc2l6ZToxNHB4O21hcmdpbjoxN3B4IDA7Zm9udC13ZWlnaHQ6NzAwfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLnN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjEwMDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTttYXJnaW4tbGVmdDo3cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5e3dpZHRoOjkwJTtoZWlnaHQ6OTAlfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgcHJlLmRlbW97Zm9udC1zaXplOjEycHg7cGFkZGluZzo3cHg7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjEpO292ZXJmbG93OmF1dG99I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ei1pbmRleDo5OTk5OTk5OTk7Y29sb3I6I2ZmZjtvdmVyZmxvdzphdXRvfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgI2RlbW8tb3ZlcmxheS1jbG9zZXtwb3NpdGlvbjpmaXhlZDt0b3A6MTRweDtyaWdodDoxNHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjIzKTtwYWRkaW5nOjdweDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Y3Vyc29yOnBvaW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZmxleC12Y2VudGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAudGVzdC1ncm91cC1oZWFkZXIgLmgze21hcmdpbjowfS5ub1Rlc3R7YmFja2dyb3VuZDojYTEwMDA1O2NvbG9yOiNmZmY7cGFkZGluZzozcHh9Lm5vVGVzdCAqLC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdywubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYSwubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYTpob3Zlcntjb2xvcjojZmZmfS5yZWQtZmxhZ3tjb2xvcjojYTEwMDA1fWBdXG59KVxuZXhwb3J0IGNsYXNzIERvY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBASW5wdXQoJ2RvY3MnKVxuICAgIGRvY3M6IGFueVxuXG4gICAgQElucHV0KCdpbml0aWFsJylcbiAgICBpbml0aWFsOiBzdHJpbmdcblxuICAgIEBJbnB1dCgndGVzdHMnKVxuICAgIHRlc3RzOiBhbnlcblxuICAgIEBJbnB1dCgnY29tcG9uZW50Q2xhc3NlcycpXG4gICAgY29tcG9uZW50Q2xhc3NlczogYW55XG5cbiAgICBsYXVuY2goZG9jOiBhbnkpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNldERvY3ModGhpcy5kb2NzKVxuICAgICAgICB0aGlzLnRlc3RTZXJ2aWNlLnNldFRlc3RzKHRoaXMudGVzdHMpXG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbCAmJiB0aGlzLmluaXRpYWwgIT09IGBgKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbkRvYyh0aGlzLmluaXRpYWwpXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IHRoaXMuaW5pdGlhbC5zcGxpdChgLmApWzBdXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==