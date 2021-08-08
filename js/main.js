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

        // this._fetchGoods();
        this._getProducts().then(data => {
            this._goods = data;
            this._render();
        });

    }

    // _fetchGoods() { // метод который будет забирать с сервера (условно) массив товаров
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this._goods = JSON.parse(data);
    //         this.render();

    //         console.log(this._goods);
    //     });
    // }

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
        // const block = document.querySelector(this.container); // сохраняем ссылку на блок-контейнер
        for (const product of this._goods) { // перебираем массив товаров из this.goods
            const productObject = new ProductItem(product); // для каждого товара создаем объект - экземпляр класса ProductItem
            this._allProducts.push(productObject); // эти объекты складываем в массив this.allProducts
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString()) // и добавляем в блок-контейнер кусок разметки связанный с этим объектом
        }
    }

    // getSum() { // Задание №2 к уроку 2. Метод вычисляет суммарную стоимость всех товаров
    //     let sum = 0;
    //     for (const product of this.goods) {
    //         sum += product.price;
    //     }
    //     return sum;
    // }
}
// Далее по логике нужно сделать следущее
const list = new ProductList(); // создать экземпляр класса ProductList
// list.fetchGoods(); // запросить в него данные с сервера
// list.render(); // отрисовать разметку
// Однако запрос данных с сервера и отрисовка разметки будет всегда происходить вместе с созданием экземпляра класса ProductList, поэтому вызовы функций fetchGoods и render мы добавляем сразу в конструктор класса, таким образом они будут вызываться в момент создания экземпляра автоматически!

// console.log(list.getSum()); // Выводим в консоль суммарную стоимость всех товаров (Задание 2 к уроку 2)

class CartItem { // Задание 1 ко 2 уроку. Заготовки классов корзины и элемента корзины

    render() {

    }
}

class CartList {

    addGood() {

    }

    removeGood() {

    }

    changeGoods() {

    }

    render() {

    }

}