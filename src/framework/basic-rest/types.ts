
export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type CategoriesQueryOptionsTypeImages = {
  title?: string;
  slug?: string;
  image?: string;
  limit?: number;
  id?: number;
};
export type BannerQueryOptionsTypeImages = {
  title?: string;
  image?: string;
  limit?: number;
  id?: number;
  url?:string;
  description?:string;
};

export type QueryOptionsType = {
  id?:number;
  status?: string;
  order_type?: string;
  total_amount?: string;
  provider?: string;
  process?:string
  limit?: number;
};

export type Category = {
  id: number | string;
  title: string;
  slug: string;
  image?: any;
  children?: [Category];
  productCount?: number;
  [key: string]: unknown;
};
export type Category_Images = {
  id: number | string;
  title: string;
  slug: string;
  image?: string;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: string;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: string;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  title: string;
  slug: string;
  price: number | string;
  discount?: number;
  discount_price?: number | string;
  image: string;
  quantity: number;
  video_url	?: any;
  galleries?:any;
  body: any;
  description?: string;
  view_count?:number;
  [key: string]: unknown;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};


