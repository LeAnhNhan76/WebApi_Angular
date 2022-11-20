import { apiService } from "../shared/api/agent";
import { productCategoryUrls } from "../shared/constants/api.constant";

const searchProductCategories = (keyword: string, pageIndex: number, pageSize: number) => {
  return apiService.getAsync(`${productCategoryUrls.getAllUrl}?keyword=` + keyword + '&page=' + pageIndex + '&pageSize=' + pageSize);
};

export const productCategoryService = {
  searchProductCategories
};