import { expect } from "@playwright/test";

export class Checkout {
  instancePage = null;
  basketCards = null;
  basketItemPrice = null;
  basketItemRemoveButton = null;

  constructor(page) {
    this.instancePage = page;
    this.basketItemPrice = this.instancePage.locator(
      '[data-qa="basket-item-price"]'
    );
    this.basketCards = this.instancePage.locator('[data-qa="basket-card"]');
    this.basketItemRemoveButton = this.instancePage.locator(
      '[data-qa="basket-card-remove-item"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const itemsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPrices = await this.basketItemPrice.allInnerTexts();
    const justPrices = allPrices.map((element) => {
      const withoutDollarSign = element.replace("$", "");
      return parseInt(withoutDollarSign, 10);
    });
    const smallestPrice = Math.min(...justPrices);
    const smallestPriceIdx = justPrices.indexOf(smallestPrice);
    const specificRemoveButton =
      this.basketItemRemoveButton.nth(smallestPriceIdx);
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
  };
}
