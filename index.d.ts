/// <reference types="react" />
import * as React from "react";
export default class FindElement<TProps, TState> extends React.Component<TProps, TState> {
    element: Element | undefined;
    mapElement(elem: React.ReactChild): React.ReactChild;
    render(): React.ReactElement<any>;
}
