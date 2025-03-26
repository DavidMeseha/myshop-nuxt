import en from "./locales/en.json";

export type FieldError = string | false;

export type Language = "en" | "ar" | "fr";
export type Translation = typeof en;
export type TranslationKey = keyof Translation;
export type TFunction = (key: TranslationKey) => string;

export interface Pagination {
  current: number;
  limit: number;
  hasNext: boolean;
}

export interface FeedProduct {
  gender: string[];
  category: ICategory;
  defaultPicture?: IPicture;
  pictures: IPicture[];
  name: string;
  shortDescription: string;
  fullDescription: string;
  seName: string;
  sku: string;
  vendor?: string;
  productTags: ITag[];
  hasAttributes: boolean;
  productReviewOverview?: {
    ratingSum: number;
    totalReviews: number;
  };
  likes?: number;
  carts?: number;
  saves?: number;
  inStock?: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isVendor: boolean;
  isRegistered: boolean;
  imageUrl: string;
  _id: string;
  language: Language;
}

export interface Review {
  customer_id: number;
  customer_avatar_url: string;
  customer_name: string;
  allow_viewing_profiles: true;
  title: string;
  review_text: string;
  reply_text: string;
  rating: number;
  written_on_str: string;
  helpfulness: {
    product_review_id: number;
    helpful_yes_total: number;
    helpful_no_total: number;
  };
  id: number;
}

export interface Tag {
  tag_name: string;
  tag_se_name: string;
  id: number;
}

export interface TagsListItem {
  name: string;
  se_name: string;
  product_count: number;
  id: number;
}

export interface Vendor {
  name: string;
  products_count: number;
  description: string;
  picture: {
    image_url: string;
    thumb_image_url: string;
    full_size_image_url: string;
    title: string;
    alternate_text: string;
    id: number;
  };
  id: number;
}

export interface IOrder {
  _id: string;
  customer: User;
  billingStatus: string;
  billingMethod: string;
  shippingAddress: IAddress;
  shippingStatus: string;
  items: {
    product: IFullProduct;
    quantity: number;
    attributes: IProductAttribute[];
  }[];
  subTotal: number;
  totalValue: number;
  shippingFees: number;
}

export interface UserProfile {
  email: string;
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirthDay: number;
  dateOfBirthMonth: number;
  dateOfBirthYear: number;
  phone: string;
  imageUrl: string;
  ordersCount: number;
  // street_address: string;
  // street_address2: string;
  // zip_postal_code: string;
  // city: string;
  // county: string;
  // country_id: number;
  // state_province_id: number;
}

export interface Address {
  first_name: string;
  last_name: string;
  email: string;
  country_id: number;
  country_name: string;
  state_province_id: number;
  state_province_name: string;
  county: string;
  city: string;
  address1: string;
  address2: string;
  zip_postal_code: string;
  phone_number: string;
  fax_number: string;
  address_line: string;
  id: number;
}

export interface ProductPrice {
  old_price: string;
  old_price_value: number;
  price: string;
  price_value: number;
  base_price_p_ang_v: string;
  base_price_p_ang_v_value: number;
  disable_buy_button: boolean;
  disable_wishlist_button: boolean;
  disable_add_to_compare_list_button: boolean;
  available_for_pre_order: boolean;
  pre_order_availability_start_date_time_utc: string;
  is_rental: boolean;
  force_redirection_after_adding_to_cart: boolean;
  display_tax_shipping_info: boolean;
}

export interface ProductPicture {
  image_url: string;
  thumb_image_url: string;
  full_size_image_url: string;
  title: string;
  alternate_text: string;
  id: number;
}
export interface ProductsListItem {
  name: string;
  short_description: string;
  full_description: string;
  se_name: string;
  sku: string;
  product_type: number;
  mark_as_new: boolean;
  has_attributes: boolean;
  product_price: ProductPrice;
  pictures: ProductPicture[];
  product_specification: {
    groups: [
      {
        name: string;
        attributes: [
          {
            name: string;
            values: [
              {
                attribute_type_id: number;
                value_raw: string;
                color_squares_rgb: string;
              }
            ];
            id: number;
          }
        ];
        id: number;
      }
    ];
  };
  review_overview: {
    product_id: number;
    rating_sum: number;
    total_reviews: number;
    allow_customer_reviews: boolean;
    can_add_new_review: boolean;
    can_current_customer_leave_review: boolean;
  };
  id: number;
}

export interface ShoppingCartProduct {
  picture: ProductPicture;
  product_id: number;
  product_name: string;
  product_se_name: string;
  unit_price: string;
  unit_price_value: number;
  quantity: number;
  attribute_info: string;
  id: number;
}

export interface ProductListResponse extends PaginatedResponse {
  products: ProductsListItem[];
}

export interface PaginatedResponse {
  page_index: number;
  page_number: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  first_item: number;
  last_item: number;
  has_previous_page: boolean;
  has_next_page: boolean;
}

export interface Category {
  name: string;
  description: string;
  meta_keywords: string;
  meta_description: string;
  meta_title: string;
  se_name: string;
  picture: {
    image_url: string;
    thumb_image_url: string;
    full_size_image_url: string;
    title: string;
    alternate_text: string;
    id: number;
  };
  sub_categories: [
    {
      name: string;
      se_name: string;
      description: string;
      picture: {
        image_url: string;
        thumb_image_url: string;
        full_size_image_url: string;
        title: string;
        alternate_text: string;
        id: number;
      };
      id: number;
    }
  ];
  id: number;
}

export interface OrderListItem {
  custom_order_number: string;
  order_total: string;
  is_return_request_allowed: boolean;
  order_status_enum: number;
  order_status: string;
  payment_status: string;
  shipping_status: string;
  created_on: string;
  id: number;
}

export interface OrderAddress {
  state_province_name: string;
  county: string;
  city: string;
  address1: string;
  phone_number: string;
  fax_number: string;
  id: number;
}

interface OrderShippment {
  tracking_number: string;
  shipped_date: string;
  ready_for_pickup_date: string;
  delivery_date: string;
  id: number;
}

export interface OrderProduct {
  order_item_guid: string;
  sku: string;
  product_id: number;
  product_name: string;
  product_se_name: string;
  unit_price: string;
  unit_price_value: number;
  sub_total: string;
  sub_total_value: number;
  quantity: number;
  picture: ProductPicture;
  attribute_info: string;
  rental_info: string;
  vendor_name: string;
  download_id: number;
  license_id: number;
  id: number;
}

export interface Order {
  custom_order_number: string;
  created_on: string;
  order_status: string;
  pickup_address: OrderAddress;
  shipping_status: string;
  shipping_address: OrderAddress;
  shipping_method: string;
  shipments: OrderShippment[];
  billing_address: OrderAddress;
  vat_number: string;
  payment_method: string;
  payment_method_status: string;
  order_subtotal: string;
  order_subtotal_value: number;
  order_sub_total_discount: string;
  order_sub_total_discount_value: number;
  order_shipping: string;
  order_shipping_value: number;
  payment_method_additional_fee: string;
  payment_method_additional_fee_value: number;
  checkout_attribute_info: string;
  prices_include_tax: boolean;
  tax: string;
  tax_rates: [
    {
      rate: string;
      value: string;
    }
  ];
  order_total_discount: string;
  order_total_discount_value: number;
  redeemed_reward_points: number;
  redeemed_reward_points_amount: string;
  order_total: string;
  order_total_value: number;
  gift_cards: [
    {
      coupon_code: string;
      amount: string;
    }
  ];
  items: OrderProduct[];
  order_notes: [
    {
      has_download: true;
      note: string;
      created_on: string;
      id: number;
    }
  ];
  id: number;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | string;
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
}

//be interfaces============================
//be interfaces============================
//be interfaces============================
export interface ICountry {
  _id: string;
  name: string;
  code: string;
  cities: ICity[];
}

export interface ICity {
  _id: string;
  name: string;
  code: string;
}

export interface IAddress {
  _id: string;
  address: string;
  city: ICity;
  country: ICountry;
}

export interface ICategory {
  name: string;
  seName: string;
  productsCount: number;
  _id: string;
}

export interface IPicture {
  imageUrl: string;
  _id: string;
}

export interface IPrice {
  old: number;
  price: number;
}

export interface IProductAttribute {
  name: string;
  attributeControlType: string;
  values: IProductAttributeValue[];
  _id: string;
}

export interface IProductAttributeValue {
  name: string;
  priceAdjustmentValue?: number;
  colorRgb?: string;
  _id: string;
}

export interface IProductReview {
  product?: IFullProduct;
  customer: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    _id: string;
  };
  reviewText: string;
  rating: number;
  _id: string;
  createdAt: string;
}

export interface IVendor {
  name: string;
  seName: string;
  imageUrl: string;
  productCount: number;
  followersCount: number;
  isFollowed: boolean;
  _id: string;
}

export interface ITag {
  name: string;
  seName: string;
  productCount: number;
  _id: string;
}

export interface IFullProduct {
  gender: string[];
  category: ICategory;
  pictures: IPicture[];
  name: string;
  shortDescription: string;
  fullDescription: string;
  seName: string;
  sku: string;
  vendor: IVendor;
  price: IPrice;
  productTags: ITag[];
  productAttributes: IProductAttribute[];
  hasAttributes: boolean;
  productReviewOverview: {
    ratingSum: number;
    totalReviews: number;
  };
  likes: number;
  carts: number;
  saves: number;
  productReviews: IProductReview[];
  inStock: boolean;
  _id: string;
  updatedAt: string;
  isLiked: boolean;
  isSaved: boolean;
  isReviewed: boolean;
  isInCart: boolean;
}

export interface UserInfoForm {
  email: string;
  gender?: "male" | "female";
  firstName: string;
  lastName: string;
  dateOfBirthDay?: number;
  dateOfBirthMonth?: number;
  dateOfBirthYear?: number;
  phone?: string;
  imageUrl: string;
}
