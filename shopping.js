//Get the ui elements
let cart = document.querySelectorAll('input');
let cartlist = document.querySelector('#itemlist');
const totalprice = document.querySelector('#total');
//console.log(parseInt(totalprice.innerHTML));



//Item Class
class Item {
    constructor(name, price, quantity, total) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.total = total;
    }
}

//UI class
class UI {
    static addItemList(item) {
        let list = document.querySelector('#itemlist');
        const row = document.createElement('tr');


        for (let i = 0; i < list.children.length; i++) {
            if (list.children[i].children[0].textContent.toString() == item.name.toString()) {
                list.children[i].remove();
            }
        }

        //list.innerHTML='';

        row.innerHTML = `<td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price * item.quantity}</td>
        <td><a href='#' class='delete'>X</a></td>`;
        list.appendChild(row);
        totalprice.innerHTML = item.total;
        //console.log(list.children[0]);

    }

    showAlert(message, className) {
        this.clearAlert();

        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let table = document.querySelector('#item_table');
        container.insertBefore(div, table);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 500);
    }

    clearAlert() {
        let currentAlert = document.querySelector('.alert')
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    removefromcart(target) {

        if (target.hasAttribute('href')) {
            totalprice.innerHTML = (parseInt(totalprice.textContent) - parseInt(target.parentElement.previousElementSibling.textContent)).toString();

            target.parentElement.parentElement.remove();
            Store.removeitemfromlocalstorage(target.parentElement.parentElement.firstChild.textContent.trim());
            this.showAlert("Book Removed!", 'success')
        }
    }

}

class Store {
    static getItems() {
        let items;
        if (localStorage.getItem('items') === null) {
            items = []
        }
        else {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addItem(item) {
        let items = Store.getItems();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    static displayItems() {
        let items = Store.getItems();
        items.forEach(item => {
            UI.addItemList(item);
        })
    }

    static removeitemfromlocalstorage(name) {
        let items = Store.getItems();
        items.forEach((item, index) => {
            if (item.name === name) {
                items.splice(index, 1);
            }
        })
        localStorage.setItem('items', JSON.stringify(items));
    }
}
//Add event listeners
cartlist.addEventListener('click', removeitem);
document.addEventListener('DOMContentLoaded', Store.displayItems());

//Defining Functions
for (let i = 0; i < cart.length; i++) {
    let button = cart[i];
    let count = 0;
    var total = 0;
    button.addEventListener('click', function (e) {
        let product_name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        let product_price = e.target.parentElement.previousElementSibling.textContent;
        count += 1;
        total += parseInt(product_price);
        console.log(total);
        //totalprice.innerHTML = total;
        product_quantity = count;
        let item = new Item(product_name, product_price, product_quantity, total);
        UI.addItemList(item);
        let ui = new UI();
        ui.showAlert("Book Added!", 'success');
        Store.addItem(item);
        e.preventDefault();

    })
}

function removeitem(e) {
    let ui = new UI();
    ui.removefromcart(e.target);
    e.preventDefault();

}


