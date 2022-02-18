import { POST } from "./fetch";

export const deletePage = (pageId) => {
  const json = POST("page/delete/" + pageId, {
    pageId,
  });
  return json;
};
