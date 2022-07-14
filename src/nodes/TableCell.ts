import { DecorationSet, Decoration } from "prosemirror-view";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import {
  isTableSelected,
  isRowSelected,
  getCellsInColumn,
} from "prosemirror-utils";
import Node from "./Node";

export default class TableCell extends Node {
  get name() {
    return "td";
  }

  get schema() {
    return {
      content: "paragraph+",
      tableRole: "cell",
      isolating: true,
      parseDOM: [{
        tag: "td",
        getAttrs: (dom: HTMLDivElement) => ({
          colspan: Number(dom.getAttribute("colspan")) || 1,
          rowspan: Number(dom.getAttribute("rowspan")) || 1,
        }),
      }],
      toDOM(node: ProsemirrorNode) {
        const attrs: {
          style?: string
          colspan?: string
          rowspan?: string
        } = {};
        if (node.attrs.alignment) {
          attrs.style = `text-align: ${node.attrs.alignment}`;
        }
        if (node.attrs.colspan && node.attrs.colspan > 1) {
          attrs.colspan = node.attrs.colspan;
        }
        if (node.attrs.rowspan && node.attrs.rowspan > 1) {
          attrs.rowspan = node.attrs.rowspan;
        }
        return ["td", attrs, 0];
      },
      attrs: {
        colspan: { default: 1 },
        rowspan: { default: 1 },
        alignment: { default: null },
      },
    };
  }

  toMarkdown() {
    // see: renderTable
  }

  parseMarkdown() {
    return {
      block: "td",
      getAttrs: tok => ({
        alignment: tok.info,
        colspan: tok.attrGet("colspan") || undefined,
        rowspan: tok.attrGet("rowspan") || undefined,
      }),
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          decorations: state => {
            const { doc, selection } = state;
            const decorations: Decoration[] = [];
            const cells = getCellsInColumn(0)(selection);

            if (cells) {
              cells.forEach(({ pos }, index) => {
                if (index === 0) {
                  decorations.push(
                    Decoration.widget(pos + 1, () => {
                      let className = "grip-table";
                      const selected = isTableSelected(selection);
                      if (selected) {
                        className += " selected";
                      }
                      const grip = document.createElement("a");
                      grip.className = className;
                      grip.addEventListener("mousedown", event => {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        this.options.onSelectTable(state);
                      });
                      return grip;
                    })
                  );
                }
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const rowSelected = isRowSelected(index)(selection);

                    let className = "grip-row";
                    if (rowSelected) {
                      className += " selected";
                    }
                    if (index === 0) {
                      className += " first";
                    }
                    if (index === cells.length - 1) {
                      className += " last";
                    }
                    const grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", event => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      this.options.onSelectRow(index, state);
                    });
                    return grip;
                  })
                );
              });
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  }
}
