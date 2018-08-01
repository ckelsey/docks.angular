import { Component, Input } from '@angular/core';
import DocumentationService from './documentation-service'
import TestService from './test-service'

@Component({
    selector: 'app-table-renderer',
    templateUrl: './table-renderer.component.html',
    styleUrls: ['./table-renderer.component.scss']
})
export class TableRendererComponent {

    constructor() { }

    service = DocumentationService
    testService = TestService

    @Input('show')
    show: boolean

    @Input('properties')
    properties: any

    get propertiesDataKeys() {
        return Object.keys(this.properties.data)
    }

    getLink(docLinkName: string, typeName: string): string {
        return `${typeName.toLowerCase()}.${docLinkName}`
    }

    getDocData(docLinkName: string, typeName: string) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {})
    }

    showJsonViewer(val: any): boolean {
        return !!val && typeof val !== `string`
    }

    showText(key: string): boolean {
        return key !== 'value' && key !== 'arguments' && key !== 'testCases'
    }

    isString(val: any): boolean {
        return !!val && typeof val === `string`
    }

    hasTest(row, key) {
        return this.service.getThis(this.properties.data, `${row}.${key}`) && this.service.getThis(this.properties.data, `${row}.${key}`, []).length
    }

    hasArguments(row, key) {
        if (key !== `arguments`) {
            return false
        }

        const val = this.service.getThis(this.properties.data, `${row}.${key}`)
        const length = (Array.isArray(val) ? val : []).length

        if (!length){
            return false
        }

        let pass = true

        val.forEach(element => {
            console.log(element)
            if(!element.hasOwnProperty || !element.hasOwnProperty(`name`)){
                pass = false
            }
        });
        
        return pass
    }
}
