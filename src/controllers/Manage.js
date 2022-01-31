import { LOCAL_STORAGE_PRODUCTS_KEY } from '../constants/local_storage.js';

class Manage {
  manageMenu;
  vendingMachine;

  productName;
  productPrice;
  productQuantity;
  constructor(manageMenu, vendingMachine, localStorage) {
    this.manageMenu = manageMenu;
    this.vendingMachine = vendingMachine;
    this.localStorage = localStorage;

    this.bindNameInputHandler();
    this.bindPriceInputHandler();
    this.bindQuantityInputHandler();
    this.bindAddButtonHandler();

    this.productName = '';
    this.productPrice = '';
    this.productQuantity = '';

    this.fetchAllProducts();

    this.addAllProductToTable();
  }

  bindNameInputHandler() {
    const productNameInputElem = this.manageMenu.getProductNameInputElem();
    productNameInputElem.addEventListener('change', (event) => {
      this.productName = event.target.value;
    });
  }

  bindPriceInputHandler() {
    const productPriceInputElem = this.manageMenu.getProductPriceInputElem();

    productPriceInputElem.addEventListener('change', (event) => {
      this.productPrice = event.target.value;
    });
  }

  bindQuantityInputHandler() {
    const productQuantityInputElem =
      this.manageMenu.getProductQuantityInputElem();

    productQuantityInputElem.addEventListener('change', (event) => {
      this.productQuantity = event.target.value;
    });
  }

  bindAddButtonHandler() {
    const productAddButtonElem = this.manageMenu.getProductAddButtonElem();

    productAddButtonElem.addEventListener('click', (event) => {
      event.preventDefault();

      try {
        this.checkProductInfoValidation();

        const product = {
          name: this.productName,
          price: this.productPrice,
          quantity: this.productQuantity,
        };

        this.addProduct(product);

        this.manageMenu.addProductTable(product);
      } catch (error) {
        alert(error.message);
      }
    });
  }

  checkProductInfoValidation() {
    if (
      this.productName === '' ||
      this.productPrice === '' ||
      this.productQuantity === ''
    ) {
      throw new Error('상품 정보를 입력해주세요.');
    }

    if (!this.productPrice.endsWith(0)) {
      throw new Error('상품의 가격의 10의 배수여야 합니다.');
    }

    if (parseInt(this.productQuantity) <= 0) {
      throw new Error('상품의 갯수는 1개 이상이어야 합니다.');
    }
  }

  addProduct(product) {
    const allProducts =
      this.localStorage.getStorageItem(LOCAL_STORAGE_PRODUCTS_KEY) || [];

    this.localStorage.removeStorageItem(LOCAL_STORAGE_PRODUCTS_KEY);

    this.localStorage.setStorageItem(LOCAL_STORAGE_PRODUCTS_KEY, [
      ...allProducts,
      product,
    ]);

    this.vendingMachine.addProduct(product);
  }

  fetchAllProducts() {
    const allProducts =
      this.localStorage.getStorageItem(LOCAL_STORAGE_PRODUCTS_KEY) || [];

    this.vendingMachine.setProducts(allProducts);
  }

  addAllProductToTable() {
    const allProducts = this.vendingMachine.getProducts();

    if (allProducts.length === 0) return;

    allProducts.forEach((product) => {
      this.manageMenu.addProductTable(product);
    });
  }
}

export default Manage;
