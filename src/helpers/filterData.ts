import { Post } from "@/types/Post";
import Fuse from "fuse.js";

export function filterData(data: Post[], query: any) {
  if (!data) { return []; }

  let tmpFilter = parseInt(query.filter as string);
  let tmpQuery = query.query as string;

  let filteredData = [...data];

  if (tmpFilter) {
    filteredData = filteredData.filter(item => item.post_category_id == tmpFilter);
  }

  if (tmpQuery) {
    const fuse = new Fuse(filteredData, { keys: ['title', 'excerpt'] });
    filteredData = fuse.search(tmpQuery).map(o => o.item);
  }

  return filteredData;
}

