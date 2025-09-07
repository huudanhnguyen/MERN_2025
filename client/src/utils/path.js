const path = {
  PUBLIC: "/",
  HOME: "home",
  LOGIN: "login",
  // MEMBER: 'member',
  MY_ACCOUNT:"my-account",
  PROFILE:"profile",
  ORDERS:"orders",
  WISHLIST:"wishtlist",
  PRODUCTS: "products",
  BLOGS: "blogs",
  OUR_SERVICES: "our-services",
  FAQs: "faqs",
  REGISTER: "register",
  FINAL_REGISTER: "finalRegister/:status",
  FORGOT_PASSWORD:"forgot-password",
  RESET_PASSWORD: "reset-password/:token",
  CART: "cart",
  CHECKOUT: "checkout",
  DETAIL_PRODUCT__ID__SLUG: "detail-product/:id/:slug",
  DETAIL_PRODUCT: "detail-product",
  NOT_FOUND: "*",
  VERIFY_EMAIL: "finalRegister/:token",
VERIFY_PENDING: "verify-pending",

};

export default path;
