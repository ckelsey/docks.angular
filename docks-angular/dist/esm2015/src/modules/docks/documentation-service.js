/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
export class documentationService {
    constructor() {
        this.doc = {};
        this.openedDoc = 'doc-active-dropdown';
        this.DocsData = {};
        this.states = {
            props: false,
            methods: false,
            getters: false,
            dataProps: false,
            demo: false,
            demoOverlay: false,
            components: false,
            tests: false,
            view: '',
            sidebarState: ``,
            argToShow: ``
        };
        return this;
    }
    /**
     * @param {?} DocsData
     * @return {?}
     */
    setDocs(DocsData) {
        this.DocsData = DocsData;
    }
    /**
     * @return {?}
     */
    setDoc() {
        this.doc = this.getThis(this.DocsData, this.openedDoc, {});
        return this.doc;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    openDoc(doc) {
        this.openedDoc = doc;
        this.states.view = `components`;
        this.setDoc();
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getMarkup(doc) {
        /** @type {?} */
        const props = [];
        for (const p in doc.props) {
            if (doc.props[p]) {
                props.push(`:${p}="doc.props.${p}.value"`);
            }
        }
        return `<${doc.name}${props.length ? `\n  ` : ``}${props.join('\n  ')}${props.length ? `\n` : ``}></${doc.name}>`;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    json(obj) {
        /** @type {?} */
        let result = ``;
        try {
            result = JSON.stringify(obj, null, '    ');
        }
        catch (error) { }
        return result;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    docName(doc) {
        if (!doc) {
            return;
        }
        return doc.name;
    }
    /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    getThis(el, path, emptyVal) {
        if (path && path.toString().split) {
            path = [el].concat(path.toString().split(`.`));
        }
        else {
            path = [el];
        }
        /** @type {?} */
        const result = path.reduce(function (accumulator, currentValue) {
            if (accumulator === undefined) {
                return emptyVal;
            }
            if (currentValue.indexOf(`.`) === -1 && currentValue.indexOf(`(`) > -1) {
                /** @type {?} */
                let argsString = '';
                /** @type {?} */
                const argsObj = /\((.*?)\)/g.exec(currentValue);
                if (argsObj) {
                    argsString = argsObj[1] || ``;
                }
                /** @type {?} */
                const args = argsString.split(`,`).map((arg) => arg.trim());
                /** @type {?} */
                const functionName = currentValue.split(`(`)[0];
                if (typeof accumulator[functionName] === `function`) {
                    /** @type {?} */
                    const _result = accumulator[functionName].apply(accumulator, args);
                    return _result;
                }
            }
            if (currentValue) {
                return accumulator[currentValue];
            }
            else {
                return accumulator;
            }
        });
        if (result === undefined) {
            return emptyVal;
        }
        return result;
    }
}
if (false) {
    /** @type {?} */
    documentationService.prototype.doc;
    /** @type {?} */
    documentationService.prototype.openedDoc;
    /** @type {?} */
    documentationService.prototype.DocsData;
    /** @type {?} */
    documentationService.prototype.states;
}
/** @type {?} */
export let DocumentationService = new documentationService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2RvY3VtZW50YXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTTtJQW9IRjttQkFuSFcsRUFBRTt5QkFDRCxxQkFBcUI7d0JBQ2pCLEVBQUU7c0JBRVQ7WUFDTCxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixJQUFJLEVBQUUsS0FBSztZQUNYLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLEVBQUU7WUFDUixZQUFZLEVBQUUsRUFBRTtZQUNoQixTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQW9HRyxNQUFNLENBQUMsSUFBSSxDQUFBO0tBQ2Q7Ozs7O0lBbkdELE9BQU8sQ0FBQyxRQUFhO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0tBQzNCOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUE7S0FDbEI7Ozs7O0lBRUQsT0FBTyxDQUFDLEdBQVc7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUE7UUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0tBQ2hCOzs7OztJQUVELFNBQVMsQ0FBQyxHQUFROztRQUNkLE1BQU0sS0FBSyxHQUFHLEVBQUUs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QyxDQUFDOztvQkFDbEQsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ2xFLE1BQU0sQ0FBQyxPQUFPLENBQUE7aUJBQ2pCO2FBQ0o7WUFFRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7YUFDbkM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixNQUFNLENBQUMsV0FBVyxDQUFBO2FBQ3JCO1NBRUosQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFFBQVEsQ0FBQTtTQUNsQjtRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUE7S0FDaEI7Q0FLSjs7Ozs7Ozs7Ozs7O0FBRUQsV0FBVyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgZG9jdW1lbnRhdGlvblNlcnZpY2Uge1xuICAgIGRvYzogYW55ID0ge31cbiAgICBvcGVuZWREb2MgPSAnZG9jLWFjdGl2ZS1kcm9wZG93bidcbiAgICBEb2NzRGF0YTogYW55ID0ge31cblxuICAgIHN0YXRlcyA9IHtcbiAgICAgICAgcHJvcHM6IGZhbHNlLFxuICAgICAgICBtZXRob2RzOiBmYWxzZSxcbiAgICAgICAgZ2V0dGVyczogZmFsc2UsXG4gICAgICAgIGRhdGFQcm9wczogZmFsc2UsXG4gICAgICAgIGRlbW86IGZhbHNlLFxuICAgICAgICBkZW1vT3ZlcmxheTogZmFsc2UsXG4gICAgICAgIGNvbXBvbmVudHM6IGZhbHNlLFxuICAgICAgICB0ZXN0czogZmFsc2UsXG4gICAgICAgIHZpZXc6ICcnLFxuICAgICAgICBzaWRlYmFyU3RhdGU6IGBgLFxuICAgICAgICBhcmdUb1Nob3c6IGBgXG4gICAgfVxuXG4gICAgc2V0RG9jcyhEb2NzRGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuRG9jc0RhdGEgPSBEb2NzRGF0YVxuICAgIH1cblxuICAgIHNldERvYygpIHtcbiAgICAgICAgdGhpcy5kb2MgPSB0aGlzLmdldFRoaXModGhpcy5Eb2NzRGF0YSwgdGhpcy5vcGVuZWREb2MsIHt9KVxuICAgICAgICByZXR1cm4gdGhpcy5kb2NcbiAgICB9XG5cbiAgICBvcGVuRG9jKGRvYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub3BlbmVkRG9jID0gZG9jXG4gICAgICAgIHRoaXMuc3RhdGVzLnZpZXcgPSBgY29tcG9uZW50c2BcbiAgICAgICAgdGhpcy5zZXREb2MoKVxuICAgIH1cblxuICAgIGdldE1hcmt1cChkb2M6IGFueSkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IFtdXG5cbiAgICAgICAgZm9yIChjb25zdCBwIGluIGRvYy5wcm9wcykge1xuICAgICAgICAgICAgaWYgKGRvYy5wcm9wc1twXSkge1xuICAgICAgICAgICAgICAgIHByb3BzLnB1c2goYDoke3B9PVwiZG9jLnByb3BzLiR7cH0udmFsdWVcImApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDwke2RvYy5uYW1lfSR7cHJvcHMubGVuZ3RoID8gYFxcbiAgYCA6IGBgfSR7cHJvcHMuam9pbignXFxuICAnKX0ke3Byb3BzLmxlbmd0aCA/IGBcXG5gIDogYGB9PjwvJHtkb2MubmFtZX0+YFxuICAgIH1cblxuICAgIGpzb24ob2JqOiBhbnkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGBgXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgJyAgICAnKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGRvY05hbWUoZG9jOiBhbnkpIHtcblxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9jLm5hbWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZWwgVGhlIHN0YXJ0aW5nIG9iamVjdFxuICAgICAqIEBwYXJhbSBwYXRoIFN0cmluZyB0byBmb2xsb3dcbiAgICAgKiBAcGFyYW0gZW1wdHlWYWwgV2hhdCBpcyByZXR1cm5lZCBpZiB1bmRlZmluZWRcbiAgICAgKiBAZGVzYyBOYXZpZ2F0ZXMgYW4gb2JqZWN0IG9yIGFycmF5IHRvIGZpbmQgYSB2YWx1ZVxuICAgICAqL1xuICAgIGdldFRoaXMoZWw6IGFueSwgcGF0aDogQXJyYXk8YW55PiB8IHN0cmluZywgZW1wdHlWYWw/OiBhbnkpIHtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC50b1N0cmluZygpLnNwbGl0KSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXS5jb25jYXQocGF0aC50b1N0cmluZygpLnNwbGl0KGAuYCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUuaW5kZXhPZihgLmApID09PSAtMSAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZihgKGApID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnc1N0cmluZyA9ICcnXG5cbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzT2JqID0gL1xcKCguKj8pXFwpL2cuZXhlYyhjdXJyZW50VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAoYXJnc09iaikge1xuICAgICAgICAgICAgICAgICAgICBhcmdzU3RyaW5nID0gYXJnc09ialsxXSB8fCBgYFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBhcmdzU3RyaW5nLnNwbGl0KGAsYCkubWFwKChhcmcpID0+IGFyZy50cmltKCkpXG4gICAgICAgICAgICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gY3VycmVudFZhbHVlLnNwbGl0KGAoYClbMF1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXSA9PT0gYGZ1bmN0aW9uYCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfcmVzdWx0ID0gYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXS5hcHBseShhY2N1bXVsYXRvciwgYXJncylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JbY3VycmVudFZhbHVlXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5leHBvcnQgbGV0IERvY3VtZW50YXRpb25TZXJ2aWNlID0gbmV3IGRvY3VtZW50YXRpb25TZXJ2aWNlKClcbiJdfQ==