import comicApi from "@/lib/api-client";
import type {
  ListComicStyleResponse,
  StylesQueryParams,
} from "@/types/comic-styles";

export const getStyles = async (params: StylesQueryParams = {}) => {
  const {
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const response = await comicApi.get<ListComicStyleResponse>("/styles", {
    params: { page, limit, sortBy, sortOrder },
  });

  return response.data;
};
