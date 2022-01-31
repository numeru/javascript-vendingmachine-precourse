class ChargeMenu {
  changeChargeMenuTemplate;
  changeChargeInputElem;
  changeChargeButtonElem;
  totalChangeElem;
  changeTableElem;

  change_500_quantity_elem;
  change_100_quantity_elem;
  change_50_quantity_elem;
  change_10_quantity_elem;

  constructor() {
    this.setChangeChargeMenuTemplate();
  }

  init() {
    this.changeChargeInputElem = document.querySelector(
      '#vending-machine-charge-input'
    );
    this.changeChargeButtonElem = document.querySelector(
      '#vending-machine-charge-button'
    );
    this.totalChangeElem = document.querySelector(
      '#vending-machine-charge-amount'
    );
    this.changeTableElem = document.querySelector('#change-table');

    this.change_500_quantity_elem = document.querySelector(
      '#vending-machine-coin-500-quantity'
    );
    this.change_100_quantity_elem = document.querySelector(
      '#vending-machine-coin-100-quantity'
    );
    this.change_50_quantity_elem = document.querySelector(
      '#vending-machine-coin-50-quantity'
    );
    this.change_10_quantity_elem = document.querySelector(
      '#vending-machine-coin-10-quantity'
    );
  }

  getChangeChargeMenuTemplate() {
    return this.changeChargeMenuTemplate;
  }

  getChangeChargeInputElem() {
    return this.changeChargeInputElem;
  }
  getChangeChargeButtonElem() {
    return this.changeChargeButtonElem;
  }
  getTotalChangeElem() {
    return this.totalChangeElem;
  }
  getChangeTableElem() {
    return this.changeTableElem;
  }

  printTotalChange(totalChange) {
    this.totalChangeElem.innerHTML = `${totalChange}원`;
  }

  printChangeCoinQuantity(coinQuantity) {
    this.change_500_quantity_elem.innerHTML = `${coinQuantity.coin_500}개`;
    this.change_100_quantity_elem.innerHTML = `${coinQuantity.coin_100}개`;
    this.change_50_quantity_elem.innerHTML = `${coinQuantity.coin_50}개`;
    this.change_10_quantity_elem.innerHTML = `${coinQuantity.coin_10}개`;
  }

  setChangeChargeMenuTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div>
        <h1>자판기</h1>
        <div>
          <button id="product-add-menu">상품 관리</button>
          <button id="vending-machine-manage-menu">잔돈 충전</button>
          <button id="product-purchase-menu">상품 구매</button>
        </div>
        <h2>자판기 동전 충전하기</h2>
        <form>
          <input id="vending-machine-charge-input" type="number" />
          <button id="vending-machine-charge-button" type="submit">
            충전하기
          </button>
        </form>
        <p id="vending-machine-charge-amount"></p>

        <h2>자판기가 보유한 동전</h2>
        <table id="change-table">
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
          <tr>
            <td>500원</td>
            <td id="vending-machine-coin-500-quantity"></td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="vending-machine-coin-100-quantity"></td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="vending-machine-coin-50-quantity"></td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="vending-machine-coin-10-quantity"></td>
          </tr>
        </table>
      </div>
    `;

    this.changeChargeMenuTemplate = template.content.firstElementChild;
  }
}

export default ChargeMenu;
