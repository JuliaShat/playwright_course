export class Navigation {
  instancePage = null;
  basketCounter = null;

  constructor(page) {
    this.instancePage = page;

    this.basketCounter = this.instancePage.locator(
      '[data-qa="header-basket-count"]'
    );
    this.checkoutLink = this.instancePage.getByRole("link", {
      name: "Checkout",
    });
  }

  getBasketCounts = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.instancePage.waitForURL("/basket");
  };
}
