
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
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  title: string;
  slug: string;
  image?: Attachment;
  children?: [Category];
  productCount?: number;
  [key: string]: unknown;
};
export type Category_Images = {
  id: number | string;
  title: string;
  slug: string;
  image?: Attachment;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
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


