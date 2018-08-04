/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var documentationService = /** @class */ (function () {
    function documentationService() {
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
            sidebarState: "",
            argToShow: ""
        };
        return this;
    }
    /**
     * @param {?} DocsData
     * @return {?}
     */
    documentationService.prototype.setDocs = /**
     * @param {?} DocsData
     * @return {?}
     */
    function (DocsData) {
        this.DocsData = DocsData;
    };
    /**
     * @return {?}
     */
    documentationService.prototype.setDoc = /**
     * @return {?}
     */
    function () {
        this.doc = this.getThis(this.DocsData, this.openedDoc, {});
        return this.doc;
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.openDoc = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        this.openedDoc = doc;
        this.states.view = "components";
        this.setDoc();
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.getMarkup = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        /** @type {?} */
        var props = [];
        for (var p in doc.props) {
            if (doc.props[p]) {
                props.push(":" + p + "=\"doc.props." + p + ".value\"");
            }
        }
        return "<" + doc.name + (props.length ? "\n  " : "") + props.join('\n  ') + (props.length ? "\n" : "") + "></" + doc.name + ">";
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    documentationService.prototype.json = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var result = "";
        try {
            result = JSON.stringify(obj, null, '    ');
        }
        catch (error) { }
        return result;
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.docName = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        if (!doc) {
            return;
        }
        return doc.name;
    };
    /**
     * @param el The starting object
     * @param path String to follow
     * @param emptyVal What is returned if undefined
     * @desc Navigates an object or array to find a value
     */
    /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    documentationService.prototype.getThis = /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    function (el, path, emptyVal) {
        if (path && path.toString().split) {
            path = [el].concat(path.toString().split("."));
        }
        else {
            path = [el];
        }
        /** @type {?} */
        var result = path.reduce(function (accumulator, currentValue) {
            if (accumulator === undefined) {
                return emptyVal;
            }
            if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
                /** @type {?} */
                var argsString = '';
                /** @type {?} */
                var argsObj = /\((.*?)\)/g.exec(currentValue);
                if (argsObj) {
                    argsString = argsObj[1] || "";
                }
                /** @type {?} */
                var args = argsString.split(",").map(function (arg) { return arg.trim(); });
                /** @type {?} */
                var functionName = currentValue.split("(")[0];
                if (typeof accumulator[functionName] === "function") {
                    /** @type {?} */
                    var _result = accumulator[functionName].apply(accumulator, args);
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
    };
    return documentationService;
}());
export { documentationService };
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
export var DocumentationService = new documentationService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL2RvY3VtZW50YXRpb24tc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBQTtJQW9ISTttQkFuSFcsRUFBRTt5QkFDRCxxQkFBcUI7d0JBQ2pCLEVBQUU7c0JBRVQ7WUFDTCxLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixJQUFJLEVBQUUsS0FBSztZQUNYLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1lBQ1osSUFBSSxFQUFFLEVBQUU7WUFDUixZQUFZLEVBQUUsRUFBRTtZQUNoQixTQUFTLEVBQUUsRUFBRTtTQUNoQjtRQW9HRyxNQUFNLENBQUMsSUFBSSxDQUFBO0tBQ2Q7Ozs7O0lBbkdELHNDQUFPOzs7O0lBQVAsVUFBUSxRQUFhO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0tBQzNCOzs7O0lBRUQscUNBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQTtLQUNsQjs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsR0FBVztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQTtRQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7S0FDaEI7Ozs7O0lBRUQsd0NBQVM7Ozs7SUFBVCxV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Q0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFFL0MsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQzs7b0JBQ2xELElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUNsRSxNQUFNLENBQUMsT0FBTyxDQUFBO2lCQUNqQjthQUNKO1lBRUQsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQ25DO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLFdBQVcsQ0FBQTthQUNyQjtTQUVKLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUE7U0FDbEI7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFBO0tBQ2hCOytCQWxITDtJQXVIQyxDQUFBO0FBdkhELGdDQXVIQzs7Ozs7Ozs7Ozs7O0FBRUQsV0FBVyxvQkFBb0IsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgZG9jdW1lbnRhdGlvblNlcnZpY2Uge1xuICAgIGRvYzogYW55ID0ge31cbiAgICBvcGVuZWREb2MgPSAnZG9jLWFjdGl2ZS1kcm9wZG93bidcbiAgICBEb2NzRGF0YTogYW55ID0ge31cblxuICAgIHN0YXRlcyA9IHtcbiAgICAgICAgcHJvcHM6IGZhbHNlLFxuICAgICAgICBtZXRob2RzOiBmYWxzZSxcbiAgICAgICAgZ2V0dGVyczogZmFsc2UsXG4gICAgICAgIGRhdGFQcm9wczogZmFsc2UsXG4gICAgICAgIGRlbW86IGZhbHNlLFxuICAgICAgICBkZW1vT3ZlcmxheTogZmFsc2UsXG4gICAgICAgIGNvbXBvbmVudHM6IGZhbHNlLFxuICAgICAgICB0ZXN0czogZmFsc2UsXG4gICAgICAgIHZpZXc6ICcnLFxuICAgICAgICBzaWRlYmFyU3RhdGU6IGBgLFxuICAgICAgICBhcmdUb1Nob3c6IGBgXG4gICAgfVxuXG4gICAgc2V0RG9jcyhEb2NzRGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuRG9jc0RhdGEgPSBEb2NzRGF0YVxuICAgIH1cblxuICAgIHNldERvYygpIHtcbiAgICAgICAgdGhpcy5kb2MgPSB0aGlzLmdldFRoaXModGhpcy5Eb2NzRGF0YSwgdGhpcy5vcGVuZWREb2MsIHt9KVxuICAgICAgICByZXR1cm4gdGhpcy5kb2NcbiAgICB9XG5cbiAgICBvcGVuRG9jKGRvYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub3BlbmVkRG9jID0gZG9jXG4gICAgICAgIHRoaXMuc3RhdGVzLnZpZXcgPSBgY29tcG9uZW50c2BcbiAgICAgICAgdGhpcy5zZXREb2MoKVxuICAgIH1cblxuICAgIGdldE1hcmt1cChkb2M6IGFueSkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IFtdXG5cbiAgICAgICAgZm9yIChjb25zdCBwIGluIGRvYy5wcm9wcykge1xuICAgICAgICAgICAgaWYgKGRvYy5wcm9wc1twXSkge1xuICAgICAgICAgICAgICAgIHByb3BzLnB1c2goYDoke3B9PVwiZG9jLnByb3BzLiR7cH0udmFsdWVcImApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDwke2RvYy5uYW1lfSR7cHJvcHMubGVuZ3RoID8gYFxcbiAgYCA6IGBgfSR7cHJvcHMuam9pbignXFxuICAnKX0ke3Byb3BzLmxlbmd0aCA/IGBcXG5gIDogYGB9PjwvJHtkb2MubmFtZX0+YFxuICAgIH1cblxuICAgIGpzb24ob2JqOiBhbnkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGBgXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgJyAgICAnKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGRvY05hbWUoZG9jOiBhbnkpIHtcblxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9jLm5hbWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZWwgVGhlIHN0YXJ0aW5nIG9iamVjdFxuICAgICAqIEBwYXJhbSBwYXRoIFN0cmluZyB0byBmb2xsb3dcbiAgICAgKiBAcGFyYW0gZW1wdHlWYWwgV2hhdCBpcyByZXR1cm5lZCBpZiB1bmRlZmluZWRcbiAgICAgKiBAZGVzYyBOYXZpZ2F0ZXMgYW4gb2JqZWN0IG9yIGFycmF5IHRvIGZpbmQgYSB2YWx1ZVxuICAgICAqL1xuICAgIGdldFRoaXMoZWw6IGFueSwgcGF0aDogQXJyYXk8YW55PiB8IHN0cmluZywgZW1wdHlWYWw/OiBhbnkpIHtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC50b1N0cmluZygpLnNwbGl0KSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXS5jb25jYXQocGF0aC50b1N0cmluZygpLnNwbGl0KGAuYCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUuaW5kZXhPZihgLmApID09PSAtMSAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZihgKGApID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnc1N0cmluZyA9ICcnXG5cbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzT2JqID0gL1xcKCguKj8pXFwpL2cuZXhlYyhjdXJyZW50VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAoYXJnc09iaikge1xuICAgICAgICAgICAgICAgICAgICBhcmdzU3RyaW5nID0gYXJnc09ialsxXSB8fCBgYFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBhcmdzU3RyaW5nLnNwbGl0KGAsYCkubWFwKChhcmcpID0+IGFyZy50cmltKCkpXG4gICAgICAgICAgICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gY3VycmVudFZhbHVlLnNwbGl0KGAoYClbMF1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXSA9PT0gYGZ1bmN0aW9uYCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfcmVzdWx0ID0gYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXS5hcHBseShhY2N1bXVsYXRvciwgYXJncylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JbY3VycmVudFZhbHVlXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5leHBvcnQgbGV0IERvY3VtZW50YXRpb25TZXJ2aWNlID0gbmV3IGRvY3VtZW50YXRpb25TZXJ2aWNlKClcbiJdfQ==