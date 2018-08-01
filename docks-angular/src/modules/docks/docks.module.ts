import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocksComponent } from './docks.component';
import { SidebarComponent } from './sidebar.component';
import { RendererComponent } from './renderer.component';
import { TableRendererComponent } from './table-renderer.component';
import { JsonViewerComponent } from './json-viewer.component';
import { ViewerInputComponent } from './value-input.component'
import { FormsModule } from '@angular/forms';

@NgModule({
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
})
export class DocksModule { }
