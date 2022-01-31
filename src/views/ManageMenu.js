class ManageMenu {
  productManageMenuTemplate;

  productNameInputElem;
  productPriceInputElem;
  productQuantityInputElem;

  productAddButtonElem;

  productTableElem;

  constructor() {
    this.setProductManageMenuTemplate();
  }

  init() {
    this.productNameInputElem = document.querySelector('#product-name-input');
    this.productPriceInputElem = document.querySelector('#product-price-input');
    this.productQuantityInputElem = document.querySelector(
      '#product-quantity-input'
    );
    this.productAddButtonElem = document.querySelector('#product-add-button');
    this.productTableElem = document.querySelector('#product-table');
  }

  getProductManageMenuTemplate() {
    return this.productManageMenuTemplate;
  }

  getProductNameInputElem() {
    return this.productNameInputElem;
  }
  getProductPriceInputElem() {
    return this.productPriceInputElem;
  }
  getProductQuantityInputElem() {
    return this.productQuantityInputElem;
  }
  getProductAddButtonElem() {
    return this.productAddButtonElem;
  }

  setProductManageMenuTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div>
        <h1>자판기</h1>
        <div>
          <button id="product-add-menu">상품 관리</button>
          <button id="vending-machine-manage-menu">잔돈 충전</button>
          <button id="product-purchase-menu">상품 구매</button>
        </div>
        <h2>상품 추가하기</h2>
        <form>
          <input id="product-name-input" type="text" placeholder="상품명" />
          <input id="product-price-input" type="number" placeholder="가격" />
          <input id="product-quantity-input" type="number" placeholder="수량" />
          <button id="product-add-button" type="submit">추가하기</button>
        </form>

        <h2>상품 현황</h2>
        <table id="product-table">
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </table>
      </div>
    `;

    this.productManageMenuTemplate = template.content.firstElementChild;
  }

  addProductTable(product) {
    const template = document.createElement('template');
    template.innerHTML = `
      <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
      </tr>
    `;

    this.productTableElem.insertAdjacentElement(
      'beforeend',
      template.content.firstElementChild
    );
  }
}

export default ManageMenu;
