'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error!');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     }
//     xhr.send();
// }

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
            }
        }
        xhr.send();
    });
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.img = img;
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
    }
    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`;
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = document.querySelector(container); // селектор класса блока в который будем выводить разметку
        this._goods = []; // условный ответ от сервера
        this._allProducts = []; // массив экземпляров класса ProductItem

        this._getProducts().then(data => {
            this._goods = data;
            this._render();
        });

    }

    // _getProducts() {
    //     return fetch(`${API}/catalogData.json`)
    //         .then(response => response.json())
    //         .catch(error => {
    //             console.log(error)
    //         });
    // }

    _getProducts() {
        return getRequest(`${API}/catalogData.json`)
            .then(data => JSON.parse(data))
            .catch(error => console.log(error));
    }

    _render() {
        for (const product of this._goods) { // перебираем массив товаров из this.goods
            const productObject = new ProductItem(product); // для каждого товара создаем объект - экземпляр класса ProductItem
            this._allProducts.push(productObject); // эти объекты складываем в массив this.allProducts
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString()) // и добавляем в блок-контейнер кусок разметки связанный с этим объектом
        }
    }
}

const list = new ProductList(); // создать экземпляр класса ProductList

class CartItem { // Задание 1 ко 2 уроку. Заготовки классов корзины и элемента корзины

    render() {

    }
}

class CartList {
    constructor() {
        this._goods = [];
        this._cartList = [];

        this._getCart().then(data => {
            this._goods = data.contents;
            console.log('В данный момент в корзине находятся следущие товары:');
            console.log(data.contents);
            console.log(`На сумму ${data.amount} \n\n\n`);
        });
        this.addToCart().then(data => {
            if (data.result === 1) {
                console.log('Товар успешно добавлен в корзину!');
            }
        });
        this.removeFromCart().then(data => {
            if (data.result === 1) {
                console.log('Товар успешно удален из корзины!');
            }
        });
    }

    addToCart() {
        return fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            });
    }

    removeFromCart() {
        return fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            });
    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
}

const cart = new CartList();