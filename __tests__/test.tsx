import * as React from "react"
import * as ReactDOM from "react-dom"
import FindElement from ".."

class FindElementComponent extends FindElement<{}, {}> {
}

test("FindElement finds child DOM element", () => {
  const root = document.createElement("div")
  const view = <FindElementComponent>
    <div id="elem" />
  </FindElementComponent>
  const findElement = ReactDOM.render(view, root) as FindElementComponent
  expect(findElement.element.id).toBe("elem")
})

class Foo extends React.Component<{}, {}> {
  render() {
    return React.Children.only(this.props.children)
  }
}

test("FindElement finds descendant DOM element nested in other components", () => {
  const root = document.createElement("div")
  const view = <FindElementComponent>
    <Foo>
      <div id="elem" />
    </Foo>
  </FindElementComponent>
  const component = ReactDOM.render(view, root) as FindElementComponent
  expect(component.element.id).toBe("elem")
})

test("FindElement finds descendant DOM element nested in other FindElement components", () => {
  const root = document.createElement("div")
  let outer: Element|undefined
  let inner: Element|undefined
  const view = <FindElementComponent ref={c => outer = c.element}>
    <FindElement ref={c => inner = c.element}>
      <div id="elem" />
    </FindElement>
  </FindElementComponent>
  const component = ReactDOM.render(view, root) as FindElementComponent
  expect(outer.id).toBe("elem")
  expect(inner.id).toBe("elem")
})
