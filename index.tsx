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
        const {children} = elem.props
        const childCount = React.Children.count(children)
        if (childCount == 0) {
          return elem
        }
        if (childCount == 1) {
          const child = React.Children.toArray(children)[0]
          return React.cloneElement(elem, {
            children: this.mapElement(child)
          })
        }
        return React.cloneElement(elem, {
          children: React.Children.map(children, this.mapElement.bind(this))
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
