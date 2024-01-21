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

const defaultText = `
* 为了更精细地调整格式，我们还提供了纯Markdown源码编辑方式，可以随时切换

sdfds

dsfdsf

\
 ![dsdfsdfdffdfddsfds](blob:http://localhost:3000/d4c844e5-723b-4838-99e7-22ea4366d1a9)

\
dfdsfsddsdf

\
* Markdown 作为轻量级标记语言被广泛使用，多数产研同学熟悉Markdown语法，是撰写技术文档的首选方案；2
* 编辑器在文本格式编辑上提供了交互友好的可视化工具，如图片上传、链接、代码、表格等；    ![](https://s3-gz01.didistatic.com/base-docs/base-docs/20220711205536478cf99orw5ly.png "right-50")
`;

const Editor = (): ReactElement => {
  return (
    <div style={{ margin: "50px 100px" }}>
      <h2>Basic Example</h2>
      <div
        style={{
          border: "1px solid #dedede",
          height: "600px",
          padding: "10px 30px",
          overflowY: "auto",
        }}
      >
        <RMEditor
          defaultValue={defaultText}
          dictionary={Dictionary}
          theme={Theme}
          uploadImage={onImageUpload}
          enableImageResize={true}
          onChange={onChange}
          linkAutoAddProtocol={false}
          // noticeIcons={{ info: PageEidtIcon }}
        />
      </div>
    </div>
  );
};

export default Editor;
