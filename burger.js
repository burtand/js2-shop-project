'use strict';
class Burger {
    constructor(size, add, toppings) {
        this.size = document.querySelector(`input[name='${size}']:checked`);
        this.add = document.querySelector(`input[name='${add}']:checked`);
        this.toppings = document.querySelectorAll(`input[name='${toppings}']:checked`);
        this.result = {
            price: 0,
            calories: 0
        }
        this._getSize();
        this._getAdd();
        this._getToppings();
        this._showSum()
    }

    _getSize() {
        this.result.price += +this.size.dataset.price
        this.result.calories += +this.size.dataset.calories
    }
    _getAdd() {
        this.result.price += +this.add.dataset.price
        this.result.calories += +this.add.dataset.calories
    }
    _getToppings() {
        if (this.toppings) {
            this.toppings.forEach(topping => this.result.price += +topping.dataset.price);
            this.toppings.forEach(topping => this.result.calories += +topping.dataset.calories);
        }
    }
    _showSum() {
        document.querySelector('#price').textContent = this.result.price
        document.querySelector('#calories').textContent = this.result.calories
    }

}