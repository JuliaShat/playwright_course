import { test, expect } from "@playwright/test"; // function from playwrigt library

// function declaration ES5
// async function callbackFunction({ page }) {
//     await page.goto("localhost:2221")
//     const addToBasketButton = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
//     await addToBasketButton.waitFor()
//     await addToBasketButton.click()
// }

// arrow function ES6
// const callbackFunctionArrow = async ({ page }) => {
//     await page.goto("localhost:2221")
//     const addToBasketButton = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
//     await addToBasketButton.waitFor()
//     await addToBasketButton.click()
// }

// the second parameter as a anonymous function
test.skip("Product Page Add to Basket", async ({ page }) => {
  await page.goto("/");

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');

  await addToBasketButton.waitFor();
  await expect(addToBasketButton).toHaveText("Add to Basket");
  await expect(basketCounter).toHaveText("0");
  //await page.pause()
  await addToBasketButton.click();
  await expect(addToBasketButton).toHaveText("Remove from Basket");
  await expect(basketCounter).toHaveText("1");

  const checkoutLink = page.getByRole("link", { name: "Checkout" });
  await checkoutLink.waitFor();
  await checkoutLink.click();
  await page.waitForURL("/basket");
});
// test("explaine what this test about", async callback);

// Core JS:
// Promises
// EventLoop
// Objects/Prototype/Enheritence
// Scope/Closure/Hoisting
// This
