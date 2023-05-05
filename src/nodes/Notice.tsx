import { wrappingInputRule } from "prosemirror-inputrules";
import toggleWrap from "../commands/toggleWrap";
import { WarningIcon, InfoIcon, StarredIcon } from "outline-icons";
import * as React from "react";
import ReactDOM from "react-dom";
import Node from "./Node";
import noticesRule from "../rules/notices";

export default class Notice extends Node {
  get styleOptions() {
    return Object.entries({
      info: this.options.dictionary.info,
      warning: this.options.dictionary.warning,
      tip: this.options.dictionary.tip,
      danger: this.options.dictionary.danger,
    });
  }

  get titles() {
    return {
      info: this.options.dictionary.infoTitle,
      warning: this.options.dictionary.warningTitle,
      tip: this.options.dictionary.tipTitle,
      danger: this.options.dictionary.dangerTitle,
    };
  }

  get icons() {
    return {
      info: this.options.icons?.info || <InfoIcon color="currentColor" />,
      // eslint-disable-next-line prettier/prettier
      warning: this.options.icons?.warning || <WarningIcon color="currentColor" />,
      tip: this.options.icons?.tip || <StarredIcon color="currentColor" />,
      // eslint-disable-next-line prettier/prettier
      danger: this.options.icons?.danger || <WarningIcon color="currentColor" />,
    };
  }

  get name() {
    return "container_notice";
  }

  get rulePlugins() {
    return [noticesRule];
  }

  get schema() {
    return {
      attrs: {
        style: {
          default: "info",
        },
        title: {
          default: "",
        },
      },
      content: "block+",
      group: "block",
      defining: true,
      draggable: true,
      parseDOM: [
        {
          tag: "div.notice-block",
          preserveWhitespace: "full",
          contentElement: "div:last-child",
          getAttrs: (dom: HTMLDivElement) => ({
            style: dom.className.includes("tip")
              ? "tip"
              : dom.className.includes("warning")
              ? "warning"
              : dom.className.includes("danger")
              ? "dagner"
              : undefined,
          }),
        },
      ],
      toDOM: node => {
        let title = node.attrs.title;
        if (node.attrs.style === "tip") {
          title = title || this.titles["tip"];
        } else if (node.attrs.style === "warning") {
          title = title || this.titles["warning"];
        } else if (node.attrs.style === "danger") {
          title = title || this.titles["danger"];
        } else {
          title = title || this.titles["info"];
        }

        const icon = document.createElement("div");
        icon.className = "title-icon";
        ReactDOM.render(this.icons[node.attrs.style], icon);

        const input = document.createElement("input");
        input.value = title;
        input.addEventListener("change", () => {
          if (input.value !== this.titles[node.attrs.style]) {
            node.attrs.title = input.value;
          } else {
            node.attrs.title = "";
          }
        });

        const select = document.createElement("select");
        select.addEventListener("change", event => {
          this.handleStyleChange(event, node.attrs.title);
        });

        this.styleOptions.forEach(([key, label]) => {
          const option = document.createElement("option");
          option.value = key;
          option.innerText = label;
          option.selected = node.attrs.style === key;
          select.appendChild(option);
        });

        return [
          "div",
          { class: `notice-block ${node.attrs.style}` },
          icon,
          ["div", { class: "title", contentEditable: false }, input],
          ["div", { contentEditable: false }, select],
          ["div", { class: "content" }, 0],
        ];
      },
    };
  }

  commands({ type }) {
    return attrs => toggleWrap(type, attrs);
  }

  handleStyleChange = (event, title) => {
    const { view } = this.editor;
    const { tr } = view.state;
    const element = event.target;
    const { top, left } = element.getBoundingClientRect();
    const result = view.posAtCoords({ top, left });

    if (result) {
      const transaction = tr.setNodeMarkup(result.inside, undefined, {
        style: element.value,
        title,
      });
      view.dispatch(transaction);
      view.focus();
    }
  };

  inputRules({ type }) {
    return [wrappingInputRule(/^:::$/, type)];
  }

  toMarkdown(state, node) {
    state.write(
      "\n:::" +
        (node.attrs.style || "info") +
        (node.attrs.title ? " " + node.attrs.title : "") +
        "\n"
    );
    state.renderContent(node);
    state.ensureNewLine();
    state.write(":::");
    state.closeBlock(node);
  }

  parseMarkdown() {
    return {
      block: "container_notice",
      getAttrs: tok => {
        const result = /\s*(\w+)(?:\s{1,}(.*))?/.exec(tok.info);
        return {
          style: result && result[1],
          title: result && result[2],
        };
      },
    };
  }
}
