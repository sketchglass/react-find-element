import * as React from "react"

export default
class FindElement<TProps, TState> extends React.Component<TProps, TState> {
  element: Element|undefined

  mapElement(elem: React.ReactChild): React.ReactChild {
    if (typeof elem == "object") {
      if (typeof elem.type == "string") {
        const origRef = (elem as any).ref
        return React.cloneElement(elem, {
          ref: (elem: Element) => {
            if (origRef) {
              origRef(elem)
            }
            this.element = elem
          }
        })
      } else {
        return React.cloneElement(elem, {
          children: React.Children.map(elem.props.children, this.mapElement.bind(this))
        })
      }
    }
    return elem
  }

  render() {
    const child = this.mapElement(React.Children.only(this.props.children))
    if (typeof child == "object") {
      return child
    } else {
      throw new Error("Child must not be string nor number")
    }
  }
}
