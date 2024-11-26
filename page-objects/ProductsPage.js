import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {
  instancePage = null;
  addButtons = null;
  basketCounter = null;

  constructor(page) {
    this.instancePage = page;

    this.addButtons = this.instancePage.locator('[data-qa="product-button"]');
  }

  visit = async () => {
    await this.instancePage.goto("/");
  };

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");

    const navigation = new Navigation(this.instancePage);

    const basketCountBeforeAdding = await navigation.getBasketCounts();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await navigation.getBasketCounts();
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  };
}
