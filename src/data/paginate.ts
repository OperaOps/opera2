export interface PaginateOptions<T> {
  fetchPage: (page: number, pageSize: number) => Promise<T[]>;
  pageSize?: number;
  softCap?: number;
}

export interface PaginateResult<T> {
  items: T[];
  pages: number;
}

export async function paginate<T>({
  fetchPage,
  pageSize = 20,
  softCap = 200
}: PaginateOptions<T>): Promise<PaginateResult<T>> {
  const items: T[] = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore && items.length < softCap) {
    try {
      const pageItems = await fetchPage(page, pageSize);
      
      if (pageItems.length === 0) {
        hasMore = false;
        break;
      }
      
      items.push(...pageItems);
      
      // If we got fewer items than requested, we've reached the end
      if (pageItems.length < pageSize) {
        hasMore = false;
      }
      
      page++;
      
      // Stop if we've hit the soft cap
      if (items.length >= softCap) {
        console.log(`📊 Hit soft cap of ${softCap} items, stopping pagination`);
        break;
      }
      
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error);
      throw error;
    }
  }
  
  return {
    items,
    pages: page - 1
  };
}
