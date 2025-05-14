export const HttpCode = {
  400: 'Invalid request parameters',
  401: 'Session expired. Please login again',
  403: 'Access denied',
  404: 'Resource not found',
  408: 'Request timeout',
  409: 'Data Already Exists',
  500: 'Internal server error',
  502: 'Bad gateway',
  503: 'Service unavailable',
  504: 'Gateway timeout',
}

export const options = [
  {
    value: 1,
    label: 'Kitchenware',
  },
  {
    value: 2,
    label: 'Electronics',
  },
  {
    value: 3,
    label: 'Furniture',
  },
  {
    value: 4,
    label: 'Books',
  },
  {
    value: 5,
    label: 'Food',
  },
];