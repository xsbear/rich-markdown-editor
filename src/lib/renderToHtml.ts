import createMarkdown from "./markdown/rules";
import { Options, PluginSimple } from "markdown-it";
import markRule from "../rules/mark";
import checkboxRule from "../rules/checkboxes";
import embedsRule from "../rules/embeds";
import breakRule from "../rules/breaks";
import tablesRule from "../rules/tables";
import noticesRule from "../rules/notices";
import underlinesRule from "../rules/underlines";
import emojiRule from "../rules/emoji";

const defaultRules = [
  embedsRule,
  breakRule,
  checkboxRule,
  markRule({ delim: "==", mark: "highlight" }),
  markRule({ delim: "!!", mark: "placeholder" }),
  underlinesRule,
  tablesRule,
  noticesRule,
  emojiRule,
];

export default function renderToHtml(
  markdown: string,
  rulePlugins: PluginSimple[] = defaultRules,
  renderOptions: Options = {},
  pluginOptions: { [key: string]: any } = {},
  extraPlugins: (PluginSimple | [PluginSimple, any])[] = []
): string {
  return createMarkdown({
    plugins: rulePlugins,
    rules: renderOptions,
    extraPlugins,
  })
    .render(markdown, pluginOptions)
    .trim();
}
