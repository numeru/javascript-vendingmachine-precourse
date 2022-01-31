import LocalStorage from './LocalStorage.js';
import Manage from './Manage.js';
import Charge from './Charge.js';
import Purchase from './Purchase.js';

class Controller {
  view;
  vendingMachine;
  localStorage;
  manage;
  charge;
  purchase;

  constructor(view, vendingMachine) {
    this.view = view;
    this.vendingMachine = vendingMachine;
    this.localStorage = new LocalStorage();

    this.manage = new Manage(
      this.view.getProductManageMenu(),
      this.vendingMachine,
      this.localStorage
    );

    this.bindButtonHandlers();
  }

  bindButtonHandlers() {
    const productManageButton = this.view.getProductManageMenuButton();
    const changeChargeButton = this.view.getChangeChargeMenuButton();
    const productPurchaseButton = this.view.getProductPurchaseMenuButton();
    productManageButton.addEventListener('click', () => {
      const productManageMenu = this.view.getProductManageMenu();
      this.setCurMenu(productManageMenu.getProductManageMenuTemplate());
      productManageMenu.init();
      if (!this.manage) {
        this.manage = new Manage(
          productManageMenu,
          this.vendingMachine,
          this.localStorage
        );
      }
    });

    changeChargeButton.addEventListener('click', () => {
      const changeChargeMenu = this.view.getChangeChargeMenu();
      this.setCurMenu(changeChargeMenu.getChangeChargeMenuTemplate());
      changeChargeMenu.init();
      if (!this.charge) {
        this.charge = new Charge(
          changeChargeMenu,
          this.vendingMachine,
          this.localStorage
        );
      }
      this.charge.fetchAllCoins();
    });

    productPurchaseButton.addEventListener('click', () => {
      const productPurchaseMenu = this.view.getProductPurchaseMenu();
      this.setCurMenu(productPurchaseMenu.getProductPurchaseMenuTemplate());
      productPurchaseMenu.init();
      if (!this.purchase) {
        this.purchase = new Purchase(
          productPurchaseMenu,
          this.vendingMachine,
          this.localStorage
        );
      }
    });
  }

  setCurMenu(curMenu) {
    const appElem = this.view.getAppElem();

    appElem.innerHTML = '';

    appElem.insertAdjacentElement('beforeend', curMenu);

    this.view.init();

    this.bindButtonHandlers();
  }
}

export default Controller;
