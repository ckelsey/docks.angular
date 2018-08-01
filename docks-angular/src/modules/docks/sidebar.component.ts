import { Component } from '@angular/core';
import DocumentationService from './documentation-service'
import TestService from './test-service'

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

    constructor() { }

    service = DocumentationService
    testService = TestService

    get typeNames(): string[] {
        return Object.keys(this.service.DocsData)
    }

    get linkNames(): Array<string[]> {
        const map = this.typeNames.map(typeName => Object.keys(this.service.DocsData[typeName]))
        return map
    }

    getLink(docLinkName: string, typeName: string): string {
        return `${typeName.toLowerCase()}.${docLinkName}`
    }

    isDocumented(docLinkName: string, typeName: string): boolean {
        const docLink = this.getDocLink(docLinkName, typeName)
        return docLink.hasOwnProperty('isDocumented') && !docLink.isDocumented
    }

    getDocLink(docLinkName: string, typeName: string) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {})
    }

    setSidebarState(state: string) {
        if (this.service.states.sidebarState === state) {
            this.service.states.sidebarState = ``
            return
        }

        this.service.states.sidebarState = state
    }
}
