"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var FindElement = (function (_super) {
    __extends(FindElement, _super);
    function FindElement() {
        _super.apply(this, arguments);
    }
    FindElement.prototype.mapElement = function (elem) {
        var _this = this;
        if (typeof elem == "object") {
            if (typeof elem.type == "string") {
                var origRef_1 = elem.ref;
                return React.cloneElement(elem, {
                    ref: function (elem) {
                        if (origRef_1) {
                            origRef_1(elem);
                        }
                        _this.element = elem;
                    }
                });
            }
            else {
                return React.cloneElement(elem, {
                    children: React.Children.map(elem.props.children, this.mapElement.bind(this))
                });
            }
        }
        return elem;
    };
    FindElement.prototype.render = function () {
        var child = this.mapElement(React.Children.only(this.props.children));
        if (typeof child == "object") {
            return child;
        }
        else {
            throw new Error("Child must not be string nor number");
        }
    };
    return FindElement;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FindElement;
