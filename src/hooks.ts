import { pageFixture } from "./page-fixture";
import { Page, Browser, BrowserContext, chromium } from "@playwright/test";
import { AfterAll, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";

let browser: Browser
let page: Page
let context: BrowserContext

setDefaultTimeout(30 * 1000)

BeforeAll(async () => {
    browser = await chromium.launch({
        headless: true, slowMo: 200, args: ['--start-maximized'], channel: 'chrome'
    })
    context = await browser.newContext({
        recordVideo: {
            dir: 'videos/'
        }, viewport: null
    })
    await context.setDefaultTimeout(15000)
    page = await context.newPage()
    pageFixture.page = page
    pageFixture.context = context
})

AfterAll(async () => {
    await page.close()
    await browser.close()
})