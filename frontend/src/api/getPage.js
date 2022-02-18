import { GET } from "./fetch";

export const getPage = async (pageId) => {
  if (pageId.length > 0) {
    const json = await GET("page/get/" + pageId);
    return json.data[0].pages;
  }
  return null;
};
