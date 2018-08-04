/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { DocumentationService } from './documentation-service';
import { TestService } from './test-service';
export class SidebarComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get typeNames() {
        return Object.keys(this.service.DocsData);
    }
    /**
     * @return {?}
     */
    get linkNames() {
        /** @type {?} */
        const map = this.typeNames.map(typeName => Object.keys(this.service.DocsData[typeName]));
        return map;
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
    isDocumented(docLinkName, typeName) {
        /** @type {?} */
        const docLink = this.getDocLink(docLinkName, typeName);
        return docLink.hasOwnProperty('isDocumented') && !docLink.isDocumented;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getDocLink(docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setSidebarState(state) {
        if (this.service.states.sidebarState === state) {
            this.service.states.sidebarState = ``;
            return;
        }
        this.service.states.sidebarState = state;
    }
}
SidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-sidebar',
                template: `<div class="doc-sidebar">
    <div *ngFor="let typeName of typeNames; let typeIndex = index">
        <div class="sidebar-heading group" [ngClass]="{active: service.states.sidebarState === typeName}" (click)="setSidebarState(typeName)">{{typeName}}</div>
        <div [ngClass]="{shown: service.states.sidebarState === typeName}" class="link-group">
            <div class="doc-sidebar-link" *ngFor="let docLinkName of linkNames[typeIndex]" (click)="service.openDoc(getLink(docLinkName, typeName))">
                <span *ngIf="isDocumented(docLinkName, typeName)" class="red-flag"></span>
                <span>{{getDocLink(docLinkName, typeName).name}}</span>
            </div>
        </div>
    </div>
    <div *ngIf="testService.tests">
        <div class="sidebar-heading" (click)="service.states.view = 'tests'">Tests</div>
    </div>
</div>`,
                styles: [`.doc-sidebar{height:100%;background:#224764;color:#f0f4f8;white-space:nowrap;overflow:auto}.doc-sidebar .sidebar-heading{font-size:12px;font-weight:700;background:rgba(0,0,0,.21);padding:10px;box-shadow:0 -1px 0 rgba(0,0,0,.13);cursor:pointer;text-transform:uppercase}.doc-sidebar .sidebar-heading.group::before{content:"";border:5px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.doc-sidebar .sidebar-heading.group.active::before{border-left-color:transparent;border-top-color:#fff;position:relative;top:3px;left:-2px}.doc-sidebar .link-group{height:0;opacity:0;pointer-events:none;overflow:hidden}.doc-sidebar .link-group.shown{height:auto;opacity:1;pointer-events:all;overflow:auto}.doc-sidebar .doc-sidebar-link{padding:10px;box-shadow:0 -1px 0 rgba(76,112,141,.34),0 -2px 0 rgba(4,34,57,.25);cursor:pointer;font-size:12px}.doc-sidebar .doc-sidebar-link .red-flag{border:3px solid #a10005;border-radius:50%;display:inline-block;vertical-align:middle}`]
            },] },
];
/** @nocollapse */
SidebarComponent.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    SidebarComponent.prototype.service;
    /** @type {?} */
    SidebarComponent.prototype.testService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kb2Nrcy1hbmd1bGFyLyIsInNvdXJjZXMiOlsic3JjL21vZHVsZXMvZG9ja3Mvc2lkZWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBb0I1QyxNQUFNO0lBRUY7dUJBRWUsb0JBQW9COzJCQUNoQixXQUFXO0tBSGI7Ozs7SUFLakIsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUM1Qzs7OztJQUVELElBQUksU0FBUzs7UUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hGLE1BQU0sQ0FBQyxHQUFHLENBQUE7S0FDYjs7Ozs7O0lBRUQsT0FBTyxDQUFDLFdBQW1CLEVBQUUsUUFBZ0I7UUFDekMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLFdBQVcsRUFBRSxDQUFBO0tBQ3BEOzs7Ozs7SUFFRCxZQUFZLENBQUMsV0FBbUIsRUFBRSxRQUFnQjs7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFBO0tBQ3pFOzs7Ozs7SUFFRCxVQUFVLENBQUMsV0FBbUIsRUFBRSxRQUFnQjtRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7S0FDOUY7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQWE7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQTtZQUNyQyxNQUFNLENBQUE7U0FDVDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7S0FDM0M7OztZQXRESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7OztPQWFQO2dCQUNILE1BQU0sRUFBRSxDQUFDLDY5QkFBNjlCLENBQUM7YUFDMStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZG9jLXNpZGViYXJcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB0eXBlTmFtZSBvZiB0eXBlTmFtZXM7IGxldCB0eXBlSW5kZXggPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nIGdyb3VwXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiAoY2xpY2spPVwic2V0U2lkZWJhclN0YXRlKHR5cGVOYW1lKVwiPnt7dHlwZU5hbWV9fTwvZGl2PlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIntzaG93bjogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiBjbGFzcz1cImxpbmstZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb2Mtc2lkZWJhci1saW5rXCIgKm5nRm9yPVwibGV0IGRvY0xpbmtOYW1lIG9mIGxpbmtOYW1lc1t0eXBlSW5kZXhdXCIgKGNsaWNrKT1cInNlcnZpY2Uub3BlbkRvYyhnZXRMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0RvY3VtZW50ZWQoZG9jTGlua05hbWUsIHR5cGVOYW1lKVwiIGNsYXNzPVwicmVkLWZsYWdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3tnZXREb2NMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkubmFtZX19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJ0ZXN0U2VydmljZS50ZXN0c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLnZpZXcgPSAndGVzdHMnXCI+VGVzdHM8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5kb2Mtc2lkZWJhcntoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiMyMjQ3NjQ7Y29sb3I6I2YwZjRmODt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6YXV0b30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZ3tmb250LXNpemU6MTJweDtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yMSk7cGFkZGluZzoxMHB4O2JveC1zaGFkb3c6MCAtMXB4IDAgcmdiYSgwLDAsMCwuMTMpO2N1cnNvcjpwb2ludGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cDo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtib3JkZXI6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0LWNvbG9yOiNmZmY7d2lkdGg6MDtoZWlnaHQ6MDtkaXNwbGF5OmlubGluZS1ibG9ja30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cC5hY3RpdmU6OmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjNweDtsZWZ0Oi0ycHh9LmRvYy1zaWRlYmFyIC5saW5rLWdyb3Vwe2hlaWdodDowO29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lO292ZXJmbG93OmhpZGRlbn0uZG9jLXNpZGViYXIgLmxpbmstZ3JvdXAuc2hvd257aGVpZ2h0OmF1dG87b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmFsbDtvdmVyZmxvdzphdXRvfS5kb2Mtc2lkZWJhciAuZG9jLXNpZGViYXItbGlua3twYWRkaW5nOjEwcHg7Ym94LXNoYWRvdzowIC0xcHggMCByZ2JhKDc2LDExMiwxNDEsLjM0KSwwIC0ycHggMCByZ2JhKDQsMzQsNTcsLjI1KTtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTJweH0uZG9jLXNpZGViYXIgLmRvYy1zaWRlYmFyLWxpbmsgLnJlZC1mbGFne2JvcmRlcjozcHggc29saWQgI2ExMDAwNTtib3JkZXItcmFkaXVzOjUwJTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIGdldCB0eXBlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhKVxuICAgIH1cblxuICAgIGdldCBsaW5rTmFtZXMoKTogQXJyYXk8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy50eXBlTmFtZXMubWFwKHR5cGVOYW1lID0+IE9iamVjdC5rZXlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YVt0eXBlTmFtZV0pKVxuICAgICAgICByZXR1cm4gbWFwXG4gICAgfVxuXG4gICAgZ2V0TGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lLnRvTG93ZXJDYXNlKCl9LiR7ZG9jTGlua05hbWV9YFxuICAgIH1cblxuICAgIGlzRG9jdW1lbnRlZChkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRvY0xpbmsgPSB0aGlzLmdldERvY0xpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKVxuICAgICAgICByZXR1cm4gZG9jTGluay5oYXNPd25Qcm9wZXJ0eSgnaXNEb2N1bWVudGVkJykgJiYgIWRvY0xpbmsuaXNEb2N1bWVudGVkXG4gICAgfVxuXG4gICAgZ2V0RG9jTGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnNlcnZpY2UuRG9jc0RhdGEsIHRoaXMuZ2V0TGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpLCB7fSlcbiAgICB9XG5cbiAgICBzZXRTaWRlYmFyU3RhdGUoc3RhdGU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN0YXRlcy5zaWRlYmFyU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IGBgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID0gc3RhdGVcbiAgICB9XG59XG4iXX0=