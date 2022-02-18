import { POST } from "./fetch";

export const newPage = async () => {
  const json = await POST("page/new");
  return json.message;
};
