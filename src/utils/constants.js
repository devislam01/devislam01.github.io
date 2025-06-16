export const HttpCode = {
  400: "Invalid request parameters",
  401: "Session expired. Please login again",
  403: "Access denied",
  404: "Resource not found",
  408: "Request timeout",
  409: "Data Already Exists",
  500: "Internal server error",
  502: "Bad gateway",
  503: "Service unavailable",
  504: "Gateway timeout",
};

export const category = [
  {
    value: 1,
    label: "Kitchenware",
  },
  {
    value: 2,
    label: "Electronics",
  },
  {
    value: 3,
    label: "Furniture",
  },
  {
    value: 4,
    label: "Books",
  },
  {
    value: 5,
    label: "Food",
  },
];

export const claimTypes = {
  userId:
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
  email: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  role: "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
};

export const paymentMethods = [
  {
    label: "Cash on Delivery",
    value: 1,
  },
  {
    label: "QR Code",
    value: 2,
  },
];

export const ResidentialColleges = [
  {
    label: "Dahlia College",
    value: "Dahlia College",
  },
  {
    label: "Allamanda College",
    value: "Allamanda College",
  },
  {
    label: "Cempaka College",
    value: "Cempaka College",
  },
  {
    label: "Tun Ahmad Zaidi College",
    value: "Tun Ahmad Zaidi College",
  },
  {
    label: "Rafflesia College",
    value: "Rafflesia College",
  },
  {
    label: "Kasturi College",
    value: "Kasturi College",
  },
  {
    label: "Kenanga College",
    value: "Kenanga College",
  },
  {
    label: "Seroja College",
    value: "Seroja College",
  },
  {
    label: "Sakura College",
    value: "Sakura College",
  },
];

export const gender = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

export const productConditions = [
  {
    label: "Brand New",
    value: "Brand New",
  },
  {
    label: "Like New",
    value: "Like New",
  },
  {
    label: "Gently Used",
    value: "Gently Used",
  },
  {
    label: "Moderately Used",
    value: "Moderately Used",
  },
  {
    label: "Heavily Used",
    value: "Heavily Used",
  },
];

export const getTagColor = {
  Pending: "primary",
  Processing: "primary",
  PartiallyRequestCancel: "warning",
  RequestCancel: "warning",
  Cancelled: "danger",
  Completed: "success",
};

export const orderStatus = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Processing",
    value: "Processing",
  },
  {
    label: "PartiallyRequestCancel",
    value: "PartiallyRequestCancel",
  },
  {
    label: "RequestCancel",
    value: "RequestCancel",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];

export const paymentStatus = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Paid",
    value: "Paid",
  },
];
