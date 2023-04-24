import React, { ReactElement } from "react";

import RMEditor from "../src";

const NoticePluginTitles = {
  infoTitle: "说明",
  tipTitle: "提示",
  warningTitle: "注意",
  dangerTitle: "警告",
};

const Dictionary = {
  dangerNotice: "Danger notice",
  info: "说明",
  tip: "提示",
  warning: "注意",
  danger: "警告",
  ...NoticePluginTitles,
};

const Editor = (): ReactElement => {
  return (
    <div style={{ margin: "50px 100px" }}>
      <h2>Basic Example</h2>
      <div
        style={{
          border: "1px solid #dedede",
          height: "600px",
          padding: "10px 30px",
        }}
      >
        <RMEditor dictionary={Dictionary} />
      </div>
    </div>
  );
};

export default Editor;
