const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    removeUrl: '/deleteFromBasket.json',
    addUrl: '/addToBasket.json',
    products: [],
    filtered: [],
    cart: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    searchLine: '',
    isVisibleCart: false,
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },
    addProduct(product) {
      this.getJson(`${API + this.addUrl}`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cart.find(item => item.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let item = {
                id_product: product.id_product,
                price: product.price,
                product_name: product.product_name,
                quantity: 1
              };
              this.cart.push(item);
            }
          } else {
            alert('Error');
          }
        });
    },
    removeProduct(product) {
      this.getJson(`${API + this.removeUrl}`)
        .then(data => {
          if (data.result === 1) {
            if (product.quantity > 1) {
              product.quantity--
            } else {
              this.cart.splice(this.cart.indexOf(product), 1);
            }
          } else {
            alert('Error');
          }
        });
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(product => regexp.test(product.product_name));
    }
  },
  computed: {
    areProductsEmpty() {
      if (this.filtered.length === 0) {
        return true;
      } else {
        return false;
      }
    },
    isCartEmpty() {
      if (this.cart.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  beforeCreated() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        this.products = data;
        this.filtered = this.products;
      });
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        this.cart = data.contents;
      });
  },
  beforeMount() {

  },
  mounted() {

  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  }
});