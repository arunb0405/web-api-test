import { Page, expect } from "@playwright/test"

export class LoginPage {

    constructor(public page: Page) {
        this.page = page
    }

    elements = {
        loginLink: () => 'a[aria-label="Login"]',
        netBankLink: () => '//a[contains(text(),"NetBank log on")]',
        usernameInput: () => '#txtMyClientNumber_field',
        nextButton: () => '[sp-automation-id="sp-form-submit-button"] button',
        passwdInput: () => '#txtMyPassword_field',
        forgotPassword: () => 'a:has-text("Forgot password")',
        loginNetbankButton: () => '#btnLogon_field',
        errorElement: () => 'div.message_icon.error',
        remClientIdChkBox: () => 'input#chkRemember_field',
        errMsgTextElem: () => 'li.last'
    }

    async navigateToUrl(url: string) {
        // await this.page.setViewportSize({ width: 1280, height: 720 })
        await this.page.goto(url)
    }

    async clickLogin() {
        await this.page.locator(this.elements.loginLink()).nth(0).click({ timeout: 10000 })
        await this.page.locator(this.elements.netBankLink()).click({timeout:10000})
    }

    async validateCheckbox() {
        return await this.page.locator(this.elements.remClientIdChkBox()).isVisible()
    }

}