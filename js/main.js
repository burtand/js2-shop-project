'use strict';
const products = [{
        id: 1,
        title: 'Notebook',
        price: 20000
    },
    {
        id: 2,
        title: 'Mouse',
        price: 1500
    },
    {
        id: 3,
        title: 'Keyboard',
        price: 5000
    },
    {
        id: 4,
        title: 'Gamepad',
        price: 4500
    },
];


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.img = img;
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
    }
    render() {
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
        this.container = container; // селектор класса блока в который будем выводить разметку
        this.goods = []; // условный ответ от сервера
        this.allProducts = []; // массив экземпляров класса ProductItem

        this.fetchGoods();
        this.render();
    }

    fetchGoods() { // метод который будет забирать с сервера (условно) массив товаров
        this.goods = products;
    }

    render() { // метод создающий разметку в указанном блоке this.container
        const block = document.querySelector(this.container); // сохраняем ссылку на блок-контейнер

        for (const product of this.goods) { // перебираем массив товаров из this.goods
            const productObject = new ProductItem(product); // для каждого товара создаем объект - экземпляр класса ProductItem
            this.allProducts.push(productObject); // эти объекты складываем в массив this.allProducts
            block.insertAdjacentHTML('beforeend', productObject.render()) // и добавляем в блок-контейнер кусок разметки связанный с этим объектом
        }
    }
}
// Далее по логике нужно сделать следущее
const list = new ProductList(); // создать экземпляр класса ProductList
// list.fetchGoods(); // запросить в него данные с сервера
// list.render(); // отрисовать разметку
// Однако запрос данных с сервера и отрисовка разметки будет всегда происходить вместе с созданием экземпляра класса ProductList, поэтому вызовы функций fetchGoods и render мы добавляем сразу в конструктор класса, таким образом они будут вызываться в момент создания экземпляра автоматически!