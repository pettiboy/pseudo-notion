import { POST } from "./fetch";

export const updateTitle = async (pageId, title) => {
  const json = await POST("page/update/" + pageId, {
    title: title || "Untitled",
    action: "title",
  });
  return json;
};
export const updateContent = async (pageId, content) => {
  const json = await POST("page/update/" + pageId, {
    content: content || "",
    action: "content",
  });
  return json;
};
