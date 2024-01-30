module.exports = {
  icon: true,
  typescript: true,
  svgProps: {
    width: "{props.width || 256}",
    height: "{props.height || 256}",
    className:
      "{cx(css({\n" +
      "      display: 'inline-block',\n" +
      "      fill: 'currentColor',\n" +
      "      flexShrink: 0,\n" +
      "      label: 'Icon',\n" +
      "      // line-height: 0; is needed for correct icon alignment in Safari\n" +
      "      lineHeight: 0,\n" +
      "      verticalAlign: 'middle',\n" +
      "    }),props.className)}",
  },
};
