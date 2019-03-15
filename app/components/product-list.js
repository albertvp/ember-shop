import Component from '@ember/component';

export default Component.extend({
  actions: {
    filterByName(filter) {
      if (filter) {
        return this.store.query('product', { name: filter });
      } else {
        return this.store.findAll('product');
      }
    },
  },
});
