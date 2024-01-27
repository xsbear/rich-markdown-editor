import MarkdownIt from "markdown-it";
import { RenderRule } from "markdown-it/lib/renderer";

export default function markdownImages(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.image as RenderRule;
  const layoutAndWidthRe = /(right-50|left-50)?,?(?:width=(\d+))?/;
  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const aIndex = token.attrIndex("title");
    if (aIndex > -1 && token.attrs) {
      const title = token.attrs[aIndex][1];
      const match = layoutAndWidthRe.exec(title);
      if (match) {
        if (match[1]) token.attrSet("class", match[1]);
        if (match[2]) token.attrSet("style", `width: ${match[2]}px`);
      }
      token.attrs.splice(aIndex, 1);
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}
