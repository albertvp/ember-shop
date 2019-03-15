import DS from 'ember-data'
import Product from './product'

export default Product.extend({
  discount: DS.attr(),
  quantity: DS.attr(),
  promotion: DS.attr(),
  discounted: DS.attr(),
  amount: DS.attr(),
  total: DS.attr(),
});
