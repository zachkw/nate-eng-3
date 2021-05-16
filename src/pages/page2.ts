
import { By, until } from 'selenium-webdriver';
import { ActionType, PageElement } from '../element';
import { Page } from './page';

export class Page2 extends Page {
    titleText = new PageElement(By.css('h1'), undefined)
    loadingText = new PageElement(By.id('loading-msg'), undefined)
    nextPageButton = new PageElement(By.id("next-page-btn"), "document.querySelector('input')")
    cityDropdown = new PageElement(By.id("sources"), "document.querySelector('select')")
    
    async clickNextPage() {
        this.client.setActionType(this.nextPageButton, ActionType.CLICK);
        this.client.capturePageHTML(`Next Page Button - ${ActionType.CLICK}`);
        this.driver.findElement(this.nextPageButton.by).click();
    }

    async ensureLoad() {
        await this.driver.wait(until.elementLocated(this.loadingText.by), 20000);
        await this.driver.wait(until.elementIsNotVisible(this.driver.findElement(this.loadingText.by)), 60000);
    }
}
