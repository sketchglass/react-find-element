import * as React from "react"
import * as ReactDOM from "react-dom"
import FindElement from ".."

class Component extends FindElement<{}, {}> {
}

test("FindElement finds child DOM element", () => {
  const root = document.createElement("div")
  const view = <Component>
    <div id="elem" />
  </Component>
  const component = ReactDOM.render(view, root) as Component
  expect(component.element.id).toBe("elem")
})