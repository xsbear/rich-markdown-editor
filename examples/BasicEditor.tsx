import React, { ReactElement } from "react";

import RMEditor from "../src";
import CustomTheme from "./custom-theme";

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

const Theme = {
  ...CustomTheme,
  // noticeInfoBackground: "#F5BE31",
  // noticeInfoText: colors.almostBlack,
  // noticeTipBackground: "#9E5CF7",
  // noticeTipText: colors.white,
  noticeWarningText: "#333",
  noticeWarningBackground: "rgba(255, 171, 10, 0.06)",
};

const onImageUpload = (file: File) =>
  new Promise<string>(resolve => {
    resolve(window.URL.createObjectURL(file));
  });

const onChange = (callback: () => string) => {
  console.log(callback());
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
        <RMEditor
          dictionary={Dictionary}
          theme={Theme}
          uploadImage={onImageUpload}
          onChange={onChange}
          // noticeIcons={{ info: PageEidtIcon }}
        />
      </div>
    </div>
  );
};

export default Editor;
