import { LOCAL_STORAGE_COINS_KEY } from '../constants/local_storage.js';

class Charge {
  chargeMenu;
  vendingMachine;
  localStorage;

  changeToCharge;

  constructor(chargeMenu, vendingMachine, localStorage) {
    this.chargeMenu = chargeMenu;
    this.vendingMachine = vendingMachine;
    this.localStorage = localStorage;

    this.changeToCharge = '';

    this.fetchAllCoins();

    this.bindChangeChargeInputHandler();

    this.bindChangeChargeButtonElem();
  }

  bindChangeChargeInputHandler() {
    const changeChargeInputElem = this.chargeMenu.getChangeChargeInputElem();

    changeChargeInputElem.addEventListener('change', (event) => {
      this.changeToCharge = event.target.value;
    });
  }

  bindChangeChargeButtonElem() {
    const changeChargeButtonElem = this.chargeMenu.getChangeChargeButtonElem();

    changeChargeButtonElem.addEventListener('click', (event) => {
      event.preventDefault();

      if (
        !this.changeToCharge?.trim() ||
        parseInt(this.changeToCharge) <= 0 ||
        !this.changeToCharge.endsWith(0)
      ) {
        return alert('0 이상의 10의 배수의 잔돈만 투입 가능합니다.');
      }

      this.chargeChange();
    });
  }

  fetchAllCoins() {
    const allCoins = this.localStorage.getStorageItem(LOCAL_STORAGE_COINS_KEY);

    if (!allCoins) return;

    this.vendingMachine.setChange(allCoins);

    this.showTotalChange(allCoins);
  }

  chargeChange() {
    this.vendingMachine.chargeChange(this.changeToCharge);

    this.localStorage.removeStorageItem(LOCAL_STORAGE_COINS_KEY);

    const newCoins = {
      coin_500: this.vendingMachine.getChange500Quantity(),
      coin_100: this.vendingMachine.getChange100Quantity(),
      coin_50: this.vendingMachine.getChange50Quantity(),
      coin_10: this.vendingMachine.getChange10Quantity(),
    };

    this.localStorage.setStorageItem(LOCAL_STORAGE_COINS_KEY, newCoins);

    this.showTotalChange(newCoins);
  }

  showTotalChange(allCoins) {
    this.chargeMenu.printChangeCoinQuantity(allCoins);

    const totalChange =
      parseInt(allCoins.coin_500) * 500 +
      parseInt(allCoins.coin_100) * 100 +
      parseInt(allCoins.coin_50) * 50 +
      parseInt(allCoins.coin_10) * 10;

    this.chargeMenu.printTotalChange(totalChange);
  }
}

export default Charge;
