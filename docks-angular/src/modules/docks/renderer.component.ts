import { Component } from '@angular/core';
import DocumentationService from './documentation-service'
import TestService from './test-service'

@Component({
    selector: 'app-renderer',
    templateUrl: './renderer.component.html',
    styleUrls: ['./renderer.component.scss']
})
export class RendererComponent {

    constructor() { }

    service = DocumentationService
    testService = TestService

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
        }
    }

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
        }
    }

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
            // }, {
            //     key: 'value',
            //     label: 'value'
            }]
        }
    }

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
        }
    }

    hasProperties(type: string) {
        const children = this.service.doc.children
        return children && children[type] && Object.keys(children[type]).length
    }
}
