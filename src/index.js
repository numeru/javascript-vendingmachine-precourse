import View from './views/View.js';
import VendingMachine from './models/VendingMachine.js';
import ManageMenu from './views/ManageMenu.js';
import ChargeMenu from './views/ChargeMenu.js';
import PurchaseMenu from './views/PurchaseMenu.js';
import Controller from './controllers/Controller.js';
document.addEventListener('DOMContentLoaded', () => {
  const vendingMachine = new VendingMachine();

  const productManageMenu = new ManageMenu();
  const changeChargeMenu = new ChargeMenu();
  const productPurchaseMenu = new PurchaseMenu();

  const view = new View(
    productManageMenu,
    changeChargeMenu,
    productPurchaseMenu
  );

  new Controller(view, vendingMachine);
});
