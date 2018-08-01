import { Component, Input } from '@angular/core';
import JSONFormatter from 'json-formatter-js'

@Component({
    selector: 'app-json-viewer',
    templateUrl: './json-viewer.component.html',
    styleUrls: ['./json-viewer.component.scss']
})

export class JsonViewerComponent {

    @Input('json')
    json: any

    get html(): string {
        const formatter = new JSONFormatter(this.json, 0, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
        });

        return formatter.render().outerHTML
    }
}
