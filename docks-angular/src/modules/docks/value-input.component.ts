import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-value-input',
    templateUrl: './value-input.component.html',
    styleUrls: ['./value-input.component.scss']
})

export class ViewerInputComponent implements OnInit {

    @Input('model')
    model: any

    proxyModel = ``

    type: string = `string`

    getProxyModel() {
        switch (this.type) {
            case `string`:
                return this.model.value ? this.model.value.toString() : ``
            case `number`:
                return this.model.value ? parseFloat(this.model.value) : 0
            case `boolean`:
                return this.model.value

            default:
                let val = this.model.value

                try {
                    val = JSON.stringify(this.model.value)
                } catch (error) { }

                return val || `{}`
        }
    }

    updateVal() {
        let value = this.proxyModel

        switch (this.type) {
            case `string`:
                this.model.value = value ? value.toString() : ``
                break
            case `number`:
                this.model.value = value ? parseFloat(value) : 0
                break
            case `boolean`:
                this.model.value = !!value
                break

            default:
                try {
                    value = JSON.parse(value)
                } catch (error) { }

                this.model.value = value || {}
        }
    }

    ngOnInit() {
        console.log(this.type, this.model);

        this.proxyModel = this.getProxyModel()
        this.type = this.model ? this.model.type || this.model.kind || `string` : `string`
    }

    showTextarea() {
        return this.type !== 'string' && this.type !== 'number'
    }
}
