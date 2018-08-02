/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocksComponent } from './docks.component';
import { SidebarComponent } from './sidebar.component';
import { RendererComponent } from './renderer.component';
import { TableRendererComponent } from './table-renderer.component';
import { JsonViewerComponent } from './json-viewer.component';
import { ViewerInputComponent } from './value-input.component';
import { FormsModule } from '@angular/forms';
export class DocksModule {
}
DocksModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    DocksComponent,
                    SidebarComponent,
                    RendererComponent,
                    TableRendererComponent,
                    JsonViewerComponent,
                    ViewerInputComponent
                ],
                exports: [DocksComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2RvY2tzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWlCN0MsTUFBTTs7O1lBZkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7aUJBQ1o7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGNBQWM7b0JBQ2QsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQixvQkFBb0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9ja3NDb21wb25lbnQgfSBmcm9tICcuL2RvY2tzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaWRlYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYmxlUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBKc29uVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9qc29uLXZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld2VySW5wdXRDb21wb25lbnQgfSBmcm9tICcuL3ZhbHVlLWlucHV0LmNvbXBvbmVudCdcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERvY2tzQ29tcG9uZW50LFxuICAgIFNpZGViYXJDb21wb25lbnQsXG4gICAgUmVuZGVyZXJDb21wb25lbnQsXG4gICAgVGFibGVSZW5kZXJlckNvbXBvbmVudCxcbiAgICBKc29uVmlld2VyQ29tcG9uZW50LFxuICAgIFZpZXdlcklucHV0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtEb2Nrc0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgRG9ja3NNb2R1bGUgeyB9XG4iXX0=