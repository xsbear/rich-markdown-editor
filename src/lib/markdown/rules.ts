import markdownit, { PluginSimple } from "markdown-it";

export default function rules({
  rules = {},
  plugins = [],
}: {
  rules?: Record<string, any>;
  plugins?: (PluginSimple | { plugin: PluginSimple; options: any })[];
}) {
  const markdownIt = markdownit("default", {
    breaks: false,
    html: false,
    linkify: false,
    ...rules,
  });
  plugins.forEach(plugin => {
    if (typeof plugin === "object") {
      markdownIt.use(plugin.plugin, plugin.options);
    } else {
      markdownIt.use(plugin);
    }
  });
  return markdownIt;
}
