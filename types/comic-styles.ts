export interface StylesQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ListComicStyleResponse {
  success: boolean;
  data: ComicStyle[];
  pagination: Pagination;
}

export interface ComicStyle {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  promptTemplate: string;
  imageSettings: ImageSettings;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

export interface ImageSettings {
  styleKeywords: string[];
  aesthetics: string[];
  colorPalette: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
