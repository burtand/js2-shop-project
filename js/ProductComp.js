Vue.component('products', {
  data() {
    return {
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
      imgCatalog: 'https://via.placeholder.com/200x150',
    }
  },
  methods: {
    filter(searchLine) {
      let regexp = new RegExp(searchLine, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  mounted() {
    this.$parent.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  },
  template: `
            <div>
              <div class="products">
                <product
                  v-for="item of filtered"
                  :key="item.id_product"
                  :img="imgCatalog"
                  :product="item"
                ></product>
              </div>
              <div v-if="!$root.errorFlag&&!filtered.length" class="empty-products">
                Такого товара не найдено
              </div>
            </div>
  `
});
Vue.component('product', {
  props: ['product', 'img'],
  template: `
          <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
              <h3>{{product.product_name}}</h3>
              <p>{{product.price}}₽</p>
              <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
          </div>
  `
});