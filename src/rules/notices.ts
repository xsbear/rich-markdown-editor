import customFence from "markdown-it-container";

export default function notice(md): void {
  return customFence(md, "notice", {
    marker: ":",
    validate: () => true,
    render: function(tokens, idx, options, env) {
      const { info, nesting } = tokens[idx];

      const m = info.trim().match(/^(info|tip|warning|danger)(?:\s+(.*))?$/);

      if (nesting === 1) {
        // opening tag
        let html = `<div class="notice-block ${m[1]}">\n`;
        html += `\t<div class="title"><i class="iconfont icon-${
          m[1]
        }"></i> ${m[2] || env.notice[`${m[1]}Title`]}</div>\n`;
        html += '\t<div class="content">\n';
        return html;
      }
      // closing tag
      return "\t</div>\n</div>\n";
    },
  });
}
