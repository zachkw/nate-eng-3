
import { By, until } from 'selenium-webdriver';
import { ActionType, PageElement } from '../element';
import { Page } from './page';

export class Page1 extends Page {

    titleText = new PageElement(By.css('h1'), undefined)
    startButton = new PageElement(By.css("input"), "document.querySelector('input')")

    async ensureLoad() {
        await this.driver.wait(until.elementLocated(this.titleText.by), 20000)
    }

    nextPage() {
        this.client.setActionType(this.startButton, ActionType.CLICK);
        this.driver.findElement(this.startButton.by).click()
    }
}
