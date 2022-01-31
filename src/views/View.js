class View {
  appElem;
  productManageMenuButton;
  changeChargeMenuButton;
  productPurchaseMenuButton;

  productManageMenu;
  changeChargeMenu;
  productPurchaseMenu;

  constructor(productManageMenu, changeChargeMenu, productPurchaseMenu) {
    this.appElem = document.querySelector('#app');

    this.productManageMenu = productManageMenu;
    this.changeChargeMenu = changeChargeMenu;
    this.productPurchaseMenu = productPurchaseMenu;

    this.appElem.insertAdjacentElement(
      'beforeend',
      this.productManageMenu.getProductManageMenuTemplate()
    );

    this.productManageMenu.init();

    this.init();
  }

  getAppElem() {
    return this.appElem;
  }

  getProductManageMenu() {
    return this.productManageMenu;
  }
  getChangeChargeMenu() {
    return this.changeChargeMenu;
  }
  getProductPurchaseMenu() {
    return this.productPurchaseMenu;
  }

  getProductManageMenuButton() {
    return this.productManageMenuButton;
  }
  getChangeChargeMenuButton() {
    return this.changeChargeMenuButton;
  }
  getProductPurchaseMenuButton() {
    return this.productPurchaseMenuButton;
  }

  init() {
    this.productManageMenuButton = document.querySelector('#product-add-menu');
    this.changeChargeMenuButton = document.querySelector(
      '#vending-machine-manage-menu'
    );
    this.productPurchaseMenuButton = document.querySelector(
      '#product-purchase-menu'
    );
  }
}

export default View;
