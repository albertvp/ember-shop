import Controller from '@ember/controller';

export default Controller.extend({
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
