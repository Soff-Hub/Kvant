import isEmpty from 'lodash/isEmpty';

interface Item {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  price: number;
  discount_price?: number;
  quantity?: number;
  discount?: number;
  [key: string]: unknown;
}

interface Variation {
  id: string | number;
  title: string;
  slug: string;
  image: string;
  price: number;
  discount_price?: number;
  quantity?: number;
  discount?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item, variation: Variation) {
  const { id, title, slug, image, price, discount, discount_price, quantity } = item;

  // isEmpty funksiyasi orqali variation obyekti bo'sh bo'lsa true qaytariladi
  if (!isEmpty(variation)) {
    return {
      id:variation.id,
      title:variation.title,
      slug,
      quantity,
      stock: variation.quantity,
      price:  variation.price,
      image: variation?.image,
      variationId: variation.id,
    };
  }

  return {
    id,
    title,
    slug,
    quantity,
    image,
    stock: quantity,
    price,
    discount,
    discount_price,
  };
}
