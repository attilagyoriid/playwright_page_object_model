import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage';
import { HomePage } from '../../page-objects/HomePage';

test.describe.parallel('Login / Logout Flow', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await homePage.visit();
  });

  test('Invalid input for Login', async ({ page }) => {
    await homePage.clickOnSignIn();
    await loginPage.login('invalid username', 'invalid password');
    await loginPage.wait(3000);
    await loginPage.assertErrorMessage();
  });

  test('Login successfull', async ({ page }) => {
    await homePage.clickOnSignIn();
    await loginPage.login('username', 'password');
    await homePage.visit();

    const userDropdownIcon = await page.locator('.dropdown-toggle>.icon-user');
    await expect(userDropdownIcon).toBeVisible();
    const userDropdown = await page
      .locator('a.dropdown-toggle .icon-user')
      .locator('..');
    await expect(userDropdown).toContainText('username');

    await page.goto('http://zero.webappsecurity.com/logout.html');
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
  });
});
