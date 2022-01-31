import {
  LOCAL_STORAGE_PRODUCTS_KEY,
  LOCAL_STORAGE_COINS_KEY,
} from '../constants/local_storage.js';

class Purchase {
  purchaseMenu;
  vendingMachine;
  localStorage;

  moneyToCharge;

  constructor(purchaseMenu, vendingMachine, localStorage) {
    this.purchaseMenu = purchaseMenu;
    this.vendingMachine = vendingMachine;
    this.localStorage = localStorage;

    this.bindMoneyChargeInputHandler();
    this.bindMoneyChargeButtonElem();
    this.addAllProductsToTable();

    this.purchaseMenu.setAllPurchaseButtonElems();
    this.purchaseMenu.setAllProductQuantityElems();

    this.bindAllPurchaseButtonElems();
    this.bindReturnChangeButtonElem();
  }

  bindMoneyChargeInputHandler() {
    const moneyChargeInputElem = this.purchaseMenu.getMoneyChargeInputElem();

    moneyChargeInputElem.addEventListener('change', (event) => {
      this.moneyToCharge = event.target.value;
    });
  }

  bindMoneyChargeButtonElem() {
    const moneyChargeButtonElem = this.purchaseMenu.getMoneyChargeButtonElem();

    moneyChargeButtonElem.addEventListener('click', (event) => {
      event.preventDefault();

      if (
        !this.moneyToCharge?.trim() ||
        parseInt(this.moneyToCharge) <= 0 ||
        !this.moneyToCharge.endsWith(0)
      ) {
        return alert('0 이상의 10의 배수의 금액만 투입 가능합니다.');
      }

      this.vendingMachine.chargeMoney(parseInt(this.moneyToCharge));

      this.purchaseMenu.printTotalMoney(this.vendingMachine.getChargedMoney());
    });
  }

  bindAllPurchaseButtonElems() {
    const allPurchaseButtonElems =
      this.purchaseMenu.getAllPurchaseButtonElems();

    allPurchaseButtonElems.forEach((button, idx) => {
      button.addEventListener('click', () => {
        this.purchaseProduct(idx);
      });
    });
  }

  bindReturnChangeButtonElem() {
    const returnChangeButtonElem =
      this.purchaseMenu.getReturnChangeButtonElem();
    returnChangeButtonElem.addEventListener('click', () => {
      if (this.vendingMachine.getChargedMoney() === 0) {
        return alert('투입된 금액이 없습니다.');
      }

      const { remainedChange, spentChange } =
        this.vendingMachine.returnChange();

      this.localStorage.removeStorageItem(LOCAL_STORAGE_COINS_KEY);
      this.localStorage.setStorageItem(LOCAL_STORAGE_COINS_KEY, remainedChange);

      this.purchaseMenu.printChangeCoinQuantity(spentChange);

      this.purchaseMenu.printTotalMoney(this.vendingMachine.getChargedMoney());
    });
  }

  addAllProductsToTable() {
    const allProducts = this.vendingMachine.getProducts();

    if (allProducts.length === 0) return;

    this.purchaseMenu.addAllProductsToPurchaseTable(allProducts);
  }

  purchaseProduct(productIdx) {
    const allProducts = this.vendingMachine.getProducts();

    const curMoney = this.vendingMachine.getChargedMoney();

    if (curMoney < parseInt(allProducts[productIdx].price)) {
      return alert('투입한 돈이 부족합니다.');
    }

    const newProductList = allProducts.map((product, idx) => {
      if (idx === productIdx) {
        return {
          ...product,
          quantity: parseInt(product.quantity) - 1,
        };
      }
      return product;
    });

    this.vendingMachine.setProducts(newProductList);

    this.localStorage.removeStorageItem(LOCAL_STORAGE_PRODUCTS_KEY);

    this.localStorage.setStorageItem(
      LOCAL_STORAGE_PRODUCTS_KEY,
      newProductList
    );

    const selectedProduct = newProductList[productIdx];

    this.vendingMachine.spendMoney(selectedProduct.price);

    this.purchaseMenu.printTotalMoney(this.vendingMachine.getChargedMoney());

    this.purchaseMenu.updateProductQuantity(
      productIdx,
      selectedProduct.quantity
    );
  }
}

export default Purchase;
