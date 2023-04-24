import markdownit, { PluginSimple } from "markdown-it";

export default function rules({
  rules = {},
  plugins = [],
  extraPlugins = [],
}: {
  rules?: Record<string, any>;
  plugins?: PluginSimple[];
  extraPlugins?: (PluginSimple | [PluginSimple, any])[];
}): markdownit {
  const markdownIt = markdownit("default", {
    breaks: false,
    html: false,
    linkify: false,
    ...rules,
  });
  plugins.forEach(plugin => markdownIt.use(plugin));
  extraPlugins.forEach(plugin => {
    if (Array.isArray(plugin)) {
      markdownIt.use(plugin[0], plugin[1]);
    } else {
      markdownIt.use(plugin);
    }
  });
  return markdownIt;
}
