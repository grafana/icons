/**
 * Modify the JSX to use the IconBase component as a wrapper
 */
const modifyJSX = (jsx, props) => {
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
      {
        type: "JSXAttribute",
        name: { type: "JSXIdentifier", name: "ref" },
        value: {
          type: "JSXExpressionContainer",
          expression: { type: "Identifier", name: "ref" },
        },
      },
    ],
    selfClosing: false,
  };

  jsx.closingElement.name.name = "IconBase";

  // Use IconProps as the type for props
  props[0] = {
    type: "Identifier",
    name: "props",
    typeAnnotation: {
      type: "TSTypeAnnotation",
      typeAnnotation: {
        type: "TSTypeReference",
        typeName: {
          type: "Identifier",
          name: "IconProps",
        },
      },
    },
  };

  props[1].typeAnnotation.typeAnnotation.typeName.name = "ForwardedRef";
  return [jsx, props];
};

const comments = `
// Auto-generated file created by svgr-cli
// Run yarn icons:create to update
// Do not edit
`;
const imports = `
import React, { forwardRef, ForwardedRef } from "react"
import { IconBase, IconProps } from '../IconBase'
`;
const template = ({ exports, jsx, componentName, props }, { tpl }) => {
  const [modifiedJsx, modifiedProps] = modifyJSX(jsx, props);
  return tpl`
${comments}
${imports} 

const ${componentName} = (${modifiedProps}) => (
  ${modifiedJsx}
);

${exports};
`;
};

module.exports = template;
