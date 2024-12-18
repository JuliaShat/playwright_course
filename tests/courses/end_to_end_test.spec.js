import { test } from "@playwright/test";
import { ProductsPage } from "../../page-objects/ProductsPage";
import { Navigation } from "../../page-objects/Navigation";
import { Checkout } from "../../page-objects/Checkout";

test.skip("New user end-to-end test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();
  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
});
