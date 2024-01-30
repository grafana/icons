/**
 * Modify the JSX to use the IconBase component as a wrapper
 */
const modifyJSX = (jsx) => {
  jsx.openingElement = {
    type: "JSXOpeningElement",
    name: {
      type: "JSXIdentifier",
      name: "IconBase",
    },
    attributes: [
      {
        type: "JSXSpreadAttribute",
        argument: {
          type: "Identifier",
          name: "props",
        },
      },
    ],
    selfClosing: false,
  };

  jsx.closingElement.name.name = "IconBase";
  return jsx;
};

const comments = `
// Auto-generated file created by svgr-cli
// Run yarn icons:create to update
// Do not edit
`;
const imports = `
import React from "react"
import { IconBase, IconProps } from '../IconBase'
`;
const template = ({ exports, jsx, componentName }, { tpl }) => {
  return tpl`
${comments}
${imports} 

const ${componentName} = (props: IconProps) => (
  ${modifyJSX(jsx)}
);

${exports};
`;
};

module.exports = template;
