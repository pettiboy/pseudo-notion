import { GET } from "./fetch";

export const getAllPages = async () => {
  const json = await GET("page/get");
  return json.data;
};
