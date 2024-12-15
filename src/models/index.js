// API - Restaurant Response
export const RestaurantResponse = {
  count: 0,
  results: [], // Array of RestaurantItemResponse
};

// API - Restaurant Item Response
export const RestaurantItemResponse = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  address: "",
  fcm: "",
  role: "",
  description: "",
  image: null, // or string
  cover: null, // or string
  status: "open", // or 'close' | 'busy' | 'soon'
  areas: [], // Array of Area
  free_delivery_limit: "",
};

// API - Area
export const Area = {
  id: 0,
  name: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  delivery_cost: {
    id: 0,
    cost: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 0,
    areaId: 0,
  },
};

// API - Create Restaurant Params
export const CreateRestaurantParams = {
  name: "",
  email: "",
  phone: "",
  address: "",
  fcm: null,
  open: true,
  description: null,
  password: "",
  confirm_password: "",
  image: null,
  cover: null,
  delivery_time: "",
  distance: "",
  free_delivery_limit: "",
  direction: "",
};

// API - Edit Restaurant Params
export const EditRestaurantParams = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  address: "",
  image: null,
  cover: null,
};

// API - Create Restaurant Response
export const CreateRestaurantResponse = {
  message: "",
  user: {
    id: 0,
    name: "",
    email: "",
    address: "",
    phone: "",
    description: "",
    image: null,
    fcm: null,
    token: "",
    role: "",
    open: true,
  },
};

// API - Restaurant
export const Restaurant = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
};

// API - Category
export const Category = {
  id: 0,
  name: "",
  image: null,
  order: 0,
  createdAt: "",
  updatedAt: "",
};

// Admin-related objects
export const AdminStatus = "active"; // or "suspended"
export const Admin = {
  id: 0,
  name: "",
  phone: "",
  roles: [],
  roleLabel: "",
  status: AdminStatus,
};

// API - Roles
export const Roles = {
  manage_orders: false,
  manage_products: false,
  manage_admins: false,
  manage_deliveries: false,
  manage_vendors: false,
};

// API - Add Admin Params
export const AddAdminParams = {
  name: "",
  email: "",
  phone: "",
  fcm: null,
  password: "",
  confirm_password: "",
  roles: Roles,
  image: null,
};

// API - Add Admin Response
export const AddAdminResponse = {
  message: "",
  user: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    fcm: null,
    super_admin: false,
    role: "",
    roles: {
      id: 0,
      manage_orders: false,
      manage_products: false,
      manage_admins: false,
      manage_deliveries: false,
      manage_vendors: false,
      adminId: 0,
      createdAt: "",
      updatedAt: "",
    },
    token: "",
  },
};

// Repeat this pattern for other interfaces, using objects or documentation comments where needed
