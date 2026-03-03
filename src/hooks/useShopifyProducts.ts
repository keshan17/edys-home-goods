import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first = 20, searchQuery?: string) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first, query: searchQuery || null });
      return data?.data?.products?.edges || [];
    },
  });
}
