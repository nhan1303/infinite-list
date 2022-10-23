import React from "react";
import ReactDOM from "react-dom";

const measureElement = (
  element: React.ReactNode,
  layerId = "measure-layer"
): Promise<number> => {
  // Creates the hidden div appended to the document body
  const container = document.createElement("div");

  container.setAttribute(
    "style",
    "display: inline-block; visibility: hidden; position: absolute; z-index: -1;"
  );
  document.body.appendChild(container);

  return new Promise<number>((resolve) => {
    // Renders the React element into the hidden div
    ReactDOM.render(element as any, container, () => {
      // Gets the element size
      const height = container.clientHeight;

      // Removes the element and its wrapper from the document
      ReactDOM.unmountComponentAtNode(container);
      container?.parentNode?.removeChild(container);

      resolve(height);
    });
  });
};

export default measureElement;
