import { By, until, WebDriver, WebElement } from 'selenium-webdriver';
import { PageElement } from './element';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { Page3 } from './pages/page3';
import { capitalize } from './utilities';
import fs from 'fs';

export enum ActionType {
    CLICK = 'click',
    SELECT = 'select',
    INPUT = 'input',
    CHECK = 'check'
}

export class Client {
    
    driver!: WebDriver
    page1!: Page1
    page2!: Page2
    page3!: Page3

    currentPage: string

    dict: Record<string, string>

    formFillFunctions: Array<(value: string) => Promise<void>>;

    constructor(driver: WebDriver, dict: Record<string, string>) {
        this.driver = driver;
        this.dict = dict;
        this.currentPage = '1';
        this.page1 = new Page1(this);
        this.page2 = new Page2(this);
        this.page3 = new Page3(this);
        this.formFillFunctions = [ this.openGenericDropdownAndSelect, this.writeGenericTextField, this.checkGenericRadioButton ];
    }

    async getPageProperties() {
        const textElements: string[] = 
            (await this.driver.executeScript('return document.documentElement.innerText') as string)
            .toLowerCase()
            .split(/\r?\n/g)
            .map(text => text.replace(/[^a-zA-Z ]/g, "").trim());
        const keys = Object.keys(this.dict);
        return textElements.filter(text => 
            keys.includes(text)
        )
    }

    async attemptToFillPage(properties: string[]) {
        properties.forEach(async key => {
            for(const func of this.formFillFunctions) {
                try {
                    await func.call(this, key);
                } catch {
                    continue;
                }
            }
        })
    }

    genericSelectQuery: string = "document.getElementsByClassName('custom-select-wrapper')[0]";
    genericSelectElement = new PageElement(By.className('custom-select-wrapper'), this.genericSelectQuery);

    genericSelectOptionQuery: string = "";
    genericSelectOptionElement = new PageElement(By.className('custom-select-wrapper'), this.genericSelectOptionQuery);
    async openGenericDropdownAndSelect(key: string) {
        const value = this.dict[key];
        const dropdownElement = await this.getDropdown(key);
        if(!dropdownElement) return;
        this.setActionType(this.genericSelectElement, ActionType.SELECT);
        this.capturePageHTML(`${this.currentPage} Dropdown Menu - ${key} ${value}`)
        await dropdownElement.click();
        
        // FAIL - to select option
        // this.setNateKey(genericSelectOptionElement, key);
        // this.setActionType(genericSelectOptionElement, ActionType.SELECT);
        // this.capturePageHTML(`${this.currentPage} Dropdown Option - ${key} ${value}`)
        // await this.driver.manage().setTimeouts( { implicit: 2000 } )
        // await (await this.getDropdownOption(dropdownElement, key)).click()
    
    }

    async getDropdown(name: string): Promise<WebElement> {
        const selectElements =  await this.driver.findElements(By.className('custom-select-wrapper'))
        selectElements.filter(async element =>
            (await element.findElements(By.xpath(`//*[ text() = '${name}' ]`))).length > 0) 
        return selectElements[0] 
    }

    async getDropdownOption(element: WebElement, input: string): Promise<WebElement> {
        await this.driver.manage().setTimeouts( { implicit: 2000 } )
        const customOptions = await element.findElement(By.className('custom-options'));
        const query = `//*[ text() = '${capitalize(input)}' ]`;
        return await this.driver.wait(until.elementIsVisible(customOptions.findElement(By.xpath(query))));
       
    }

    async writeGenericTextField(key: string) {
        const value = this.dict[key];
        key = key !== 'password' ? key : 'pwd';
        const pageElement = new PageElement(By.id(key), `document.getElementById(${key})`);
        const inputField = await this.page3.findForm().findElement(pageElement.by); 
        this.setNateKey(pageElement, key);
        this.setActionType(pageElement, ActionType.INPUT);
        this.capturePageHTML(`${this.currentPage} Text Input - ${key} ${value}`)
        inputField.sendKeys(value);
    }

    async checkGenericRadioButton(key: string) {
        const value = this.dict[key];
        const checkBoxes: WebElement[] = await this.driver.findElements(By.className('form-check'));
        for(let i = 0;  i < checkBoxes.length; i++) {
            const checkBox = checkBoxes[i];
            if(await checkBox.getAttribute("value") === value) {
                const pageElement = 
                    new PageElement(
                        By.className('form-check'), 
                        `document.getElementById('defaultCheck${i}')`
                    );
                this.setNateKey(pageElement, key);
                this.setActionType(pageElement, ActionType.CHECK);
                this.capturePageHTML(`${this.currentPage} Radio Button - ${key} ${value}`)
                checkBox.click();
            }
        }
    }

    async setActionType(element: PageElement, actionType: ActionType) {
        element.query && this.setAttribute(element.query, 'action-type', actionType);
    }

    async setNateKey(element: PageElement, key: string) {
        element.query && this.setAttribute(element.query, 'nate-dict-key', key);
    }

    async setAttribute(query: string, key: string, value: string) {
        this.driver.executeScript(`${query}.setAttribute("${key}", "${value}")`);
    }

    async capturePageHTML(title: string) {
        const body: string = await this.driver.executeScript('return document.documentElement.innerHTML');
        fs.writeFileSync(__dirname + `/snapshots/Page${this.currentPage} - ${title}.txt`, body); 
    }
}


