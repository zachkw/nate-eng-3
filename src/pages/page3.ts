
import { By, until, WebElement } from 'selenium-webdriver';
import { ActionType, PageElement } from '../element';
import { Page } from './page';

export class Page3 extends Page {
    startButton = new PageElement(By.css("input"), "document.querySelector('input')");
    popUpContainer = new PageElement(By.id('popup'));
    popUpCloseButton = new PageElement(By.css('input'))
    titleText = new PageElement(By.css('h1'), undefined);
    submitButton = new PageElement(By.id('btn'), "document.getElementById('btn')");

    async ensureLoad(): Promise<void> {
        await this.client.driver.wait(until.elementLocated(this.titleText.by), 10000)     
    }

    async popUpCheck(): Promise<void> {
        try {
            await this.driver.wait(until.elementIsVisible(await this.client.driver.findElement(this.popUpContainer.by)), 30000);
            const button = (await this.client.driver.findElements(this.popUpCloseButton.by)).find(async element => (await element.getText()) === 'X');
            await this.client.setActionType(this.popUpCloseButton, ActionType.CLICK);
            await this.client.capturePageHTML(`Pop Up Close Button - ${ActionType.CLICK}`);
            button!.click();
        } catch {
            console.log('no pop up appeared');
        }
    }

    findForm(): WebElement {
        return this.client.driver.findElement(By.css('form'));
    }

    async clickSubmit(): Promise<void> {
        await this.client.setActionType(this.submitButton, ActionType.CLICK);
        this.client.capturePageHTML(`Submit Button ${ActionType.CLICK}`);
        await this.client.driver.wait(until.elementIsNotVisible(this.driver.findElement(this.popUpContainer.by)));
        await this.client.driver.findElement(By.id('btn')).click();
    }    
}
