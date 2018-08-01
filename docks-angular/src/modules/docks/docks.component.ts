import { Component, Input, OnInit } from '@angular/core';
import DocumentationService from './documentation-service'
import TestService from './test-service'

@Component({
    selector: 'app-docks',
    templateUrl: './docks.component.html',
    styleUrls: ['./docks.component.scss']
})
export class DocksComponent implements OnInit {

    constructor() { }

    service = DocumentationService
    testService = TestService

    @Input('docs')
    docs: any

    @Input('initial')
    initial: string

    @Input('tests')
    tests: any

    @Input('componentClasses')
    componentClasses: any

    launch(doc: any) {
    }

    ngOnInit() {
        this.service.setDocs(this.docs)
        this.testService.setTests(this.tests)

        if (this.initial && this.initial !== ``) {
            this.service.openDoc(this.initial)
            this.service.states.sidebarState = this.initial.split(`.`)[0]
        }
    }

}
