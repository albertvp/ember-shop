export function initialize(application) {
  application.inject('route', 'cart', 'service:cart');
}

export default {
  initialize
};
