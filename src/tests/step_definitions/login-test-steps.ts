import { Given, When, Then } from "@cucumber/cucumber"
import { LoginPage } from "../pages/LoginPage"
import { expect } from "@playwright/test"
import { pageFixture } from "../../page-fixture"

let loginPage: LoginPage

Given('the customer navigates to {string}', async (url: string) => {
    loginPage = new LoginPage(pageFixture.page)
    await loginPage.navigateToUrl(url)
    await pageFixture.page.waitForLoadState('domcontentloaded');
    await pageFixture.page.waitForTimeout(2000)
})

When('the customer clicks on Logon button', async () => {
    await loginPage.clickLogin()
    await pageFixture.page.waitForTimeout(2000)
})

Then('the sign-up link is visible', async () => {
    const netBankLogin = await pageFixture.page.locator(loginPage.elements.netBankLink())
    await expect(netBankLogin).toBeVisible({ timeout: 10000 })
    await netBankLogin.click()
})

When('the customer enters {string}', async (clientId: string) => {
    // Generate 8-digit random client id
    const clientNum = await Math.floor(10000000 + Math.random() * 90000000)
    clientId = clientNum.toString()
    await pageFixture.page.locator(loginPage.elements.usernameInput()).fill(clientId)
    await pageFixture.page.waitForTimeout(2000)
    const isRememberCheckbox = await loginPage.validateCheckbox()
    expect(isRememberCheckbox).toBe(true)
})

Then('the customer clicks on Next button', async () => {
    await expect(pageFixture.page.locator(loginPage.elements.nextButton())).toBeVisible({ timeout: 10000 })
    await pageFixture.page.waitForTimeout(2000)
    await pageFixture.page.locator(loginPage.elements.nextButton()).click()
})

When('the customer enters password {string}', async (password: string) => {
    let passwordElement = await pageFixture.page.locator(loginPage.elements.passwdInput())
    await passwordElement.fill(password)
    await pageFixture.page.waitForTimeout(1000)
})

When('the customer clicks on the Logon to netbank button', async () => {
    await pageFixture.page.locator(loginPage.elements.loginNetbankButton()).click({ timeout: 10000 })
    await pageFixture.page.waitForTimeout(1000)
})

Then('an error message is displayed', async () => {
    await expect(pageFixture.page.locator(loginPage.elements.errorElement())).toBeVisible({ timeout: 10000 })
    const errMsg = await pageFixture.page.locator(loginPage.elements.errMsgTextElem()).textContent()
    console.log(`Error message Text is -> ${errMsg}`)
    await expect(errMsg).toContain('The client number or password you entered is incorrect')
})
