class VandingMachine {
  products;

  chargedMoney;

  change_500_quantity;
  change_100_quantity;
  change_50_quantity;
  change_10_quantity;

  constructor() {
    this.products = [];

    this.chargedMoney = 0;

    this.change_500_quantity = 0;
    this.change_100_quantity = 0;
    this.change_50_quantity = 0;
    this.change_10_quantity = 0;
  }

  getProducts() {
    return this.products;
  }

  getChange500Quantity() {
    return this.change_500_quantity;
  }
  getChange100Quantity() {
    return this.change_100_quantity;
  }
  getChange50Quantity() {
    return this.change_50_quantity;
  }
  getChange10Quantity() {
    return this.change_10_quantity;
  }

  getChargedMoney() {
    return this.chargedMoney;
  }

  setProducts(products) {
    this.products = products;
  }

  addProduct(product) {
    this.products.push(product);
  }

  setChange(allCoins) {
    this.change_500_quantity = parseInt(allCoins.coin_500);
    this.change_100_quantity = parseInt(allCoins.coin_100);
    this.change_50_quantity = parseInt(allCoins.coin_50);
    this.change_10_quantity = parseInt(allCoins.coin_10);
  }

  setChargedMoney(money) {
    this.chargedMoney = money;
  }

  chargeMoney(money) {
    this.chargedMoney += money;
  }

  spendMoney(price) {
    this.chargedMoney -= price;
  }

  chargeChange(money) {
    let coin_500 = 0;
    let coin_100 = 0;
    let coin_50 = 0;
    let coin_10 = 0;
    let coinRange = [10, 50, 100, 500].filter((value) => value <= money);

    while (money > 0) {
      const coin = MissionUtils.Random.pickNumberInList(coinRange);

      switch (coin) {
        case 10:
          coin_10 += 1;
          money -= 10;
          coinRange = [10, 50, 100, 500].filter((value) => value <= money);
          break;

        case 50:
          coin_50 += 1;
          money -= 50;
          coinRange = [10, 50, 100, 500].filter((value) => value <= money);
          break;

        case 100:
          coin_100 += 1;
          money -= 100;
          coinRange = [10, 50, 100, 500].filter((value) => value <= money);
          break;

        case 500:
          coin_500 += 1;
          money -= 500;
          coinRange = [10, 50, 100, 500].filter((value) => value <= money);
          break;

        default:
          break;
      }
    }

    this.change_500_quantity += coin_500;
    this.change_100_quantity += coin_100;
    this.change_50_quantity += coin_50;
    this.change_10_quantity += coin_10;
  }

  returnChange() {
    const remainedChange = {
      coin_500: 0,
      coin_100: 0,
      coin_50: 0,
      coin_10: 0,
    };
    const spentChange = {
      coin_500: this.change_500_quantity,
      coin_100: this.change_100_quantity,
      coin_50: this.change_50_quantity,
      coin_10: this.change_10_quantity,
    };

    const totalChange =
      this.change_500_quantity * 500 +
      this.change_100_quantity * 100 +
      this.change_50_quantity * 50 +
      this.change_10_quantity * 10;

    if (this.chargedMoney >= totalChange) {
      return { remainedChange, spentChange };
    }

    const curChange = [
      {
        value: 500,
        quantity: this.change_500_quantity,
      },
      {
        value: 100,
        quantity: this.change_100_quantity,
      },
      {
        value: 50,
        quantity: this.change_50_quantity,
      },
      {
        value: 10,
        quantity: this.change_10_quantity,
      },
    ].sort((a, b) => a.quantity - b.quantity);

    curChange.forEach((change) => {
      const spentChangeCoin =
        Math.floor(this.chargedMoney / change.value) > change.quantity
          ? change.quantity
          : Math.floor(this.chargedMoney / change.value);

      this.chargedMoney -= change.value * spentChangeCoin;

      remainedChange[`coin_${change.value}`] =
        change.quantity - spentChangeCoin;
      spentChange[`coin_${change.value}`] = spentChangeCoin;

      if (this.chargedMoney === 0) {
        return { remainedChange, spentChange };
      }
    });

    return { remainedChange, spentChange };
  }
}

export default VandingMachine;
