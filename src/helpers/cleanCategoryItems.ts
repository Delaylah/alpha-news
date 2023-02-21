import { CategoryItems } from "@/const/categories";
import { Post } from "@/types/Post";

//Dynamically filter unique article categories and show them as top navigation menu (if category has 0 articles, don't show the category)
export function cleanCategoryItems(data: Post[]) {
  const hasPostsTmp: { [categoryId: number]: boolean } = {};
  CategoryItems.forEach((category) => {
    let post = data.find(
      (i: { post_category_id: number }) =>
        i.post_category_id == category.post_category_id
    );
    if (post) {
      hasPostsTmp[category.post_category_id] = true;
    }
  });

  return CategoryItems.filter((i) => hasPostsTmp[i.post_category_id]);
}
