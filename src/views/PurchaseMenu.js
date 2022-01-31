class PurchaseMenu {
  productPurchaseMenuTemplate;

  moneyChargeInputElem;

  moneyChargeButtonElem;
  totalMoneyElem;

  allProductsTableElem;

  allPurchaseButtonElems;

  allProductQuantityElems;

  returnChangeButtonElem;

  change_500_quantity_elem;
  change_100_quantity_elem;
  change_50_quantity_elem;
  change_10_quantity_elem;

  constructor() {
    this.setProductPurchaseMenuTemplate();
  }

  init() {
    this.moneyChargeInputElem = document.querySelector('#charge-input');

    this.moneyChargeButtonElem = document.querySelector('#charge-button');
    this.totalMoneyElem = document.querySelector('#charge-amount');

    this.allProductsTableElem = document.querySelector('#all-products-table');

    this.change_500_quantity_elem =
      document.querySelector('#coin-500-quantity');
    this.change_100_quantity_elem =
      document.querySelector('#coin-100-quantity');
    this.change_50_quantity_elem = document.querySelector('#coin-50-quantity');
    this.change_10_quantity_elem = document.querySelector('#coin-10-quantity');
    this.returnChangeButtonElem = document.querySelector('#coin-return-button');
  }

  getProductPurchaseMenuTemplate() {
    return this.productPurchaseMenuTemplate;
  }

  getMoneyChargeInputElem() {
    return this.moneyChargeInputElem;
  }

  getMoneyChargeButtonElem() {
    return this.moneyChargeButtonElem;
  }

  getAllPurchaseButtonElems() {
    return this.allPurchaseButtonElems;
  }

  getReturnChangeButtonElem() {
    return this.returnChangeButtonElem;
  }

  setAllPurchaseButtonElems() {
    this.allPurchaseButtonElems = document.querySelectorAll('.purchase-button');
  }

  setAllProductQuantityElems() {
    this.allProductQuantityElems = document.querySelectorAll(
      '.product-purchase-quantity'
    );
  }

  printTotalMoney(totalMoney) {
    this.totalMoneyElem.innerHTML = `${totalMoney}`;
  }

  printChangeCoinQuantity(coinQuantity) {
    this.change_500_quantity_elem.innerHTML = `${coinQuantity.coin_500}개`;
    this.change_100_quantity_elem.innerHTML = `${coinQuantity.coin_100}개`;
    this.change_50_quantity_elem.innerHTML = `${coinQuantity.coin_50}개`;
    this.change_10_quantity_elem.innerHTML = `${coinQuantity.coin_10}개`;
  }

  updateProductQuantity(idx, value) {
    this.allProductQuantityElems[idx].innerHTML = value;
  }

  addAllProductsToPurchaseTable(allProducts) {
    this.allProductsTableElem.innerHTML = '';
    allProducts.forEach((product) => {
      const template = document.createElement('template');
      template.innerHTML = `
      <tr class="product-purchase-item">
        <td class="product-purchase-name" data-product-name="${product.name}">${product.name}</td>
        <td class="product-purchase-price" data-product-price="${product.price}">${product.price}</td>
        <td class="product-purchase-quantity" data-product-quantity="${product.quantity}">${product.quantity}</td>
        <td>
          <button class="purchase-button">구매하기</button>
        </td>
      </tr>
    `;

      this.allProductsTableElem.insertAdjacentElement(
        'beforeend',
        template.content.firstElementChild
      );
    });
  }

  setProductPurchaseMenuTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div>
        <h1>자판기</h1>
        <div>
          <button id="product-add-menu">상품 관리</button>
          <button id="vending-machine-manage-menu">잔돈 충전</button>
          <button id="product-purchase-menu">상품 구매</button>
        </div>
        <h2>금액 투입</h2>
        <form>
          <input id="charge-input" type="number" />
          <button id="charge-button" type="submit">투입하기</button>
        </form>
        <p id="charge-amount"></p>

        <h2>구매할 수 있는 상품 현황</h2>
        <table id="all-products-table">
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </tr>
        </table>

        <h2>잔돈</h2>
        <button id="coin-return-button" type="button">반환하기</button>
        <table>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
          <tr>
            <td>500원</td>
            <td id="coin-500-quantity"></td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="coin-100-quantity"></td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="coin-50-quantity"></td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="coin-10-quantity"></td>
          </tr>
        </table>
      </div>
    `;

    this.productPurchaseMenuTemplate = template.content.firstElementChild;
  }
}

export default PurchaseMenu;
