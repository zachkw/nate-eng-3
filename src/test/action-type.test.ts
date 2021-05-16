import { Builder, By } from "selenium-webdriver";
import { Client } from "../client"
import { ActionType, PageElement } from "../element";
import fs from 'fs';

const buttonElement = new PageElement(By.css('button'), "document.getElementById('btn')");
const directory = __dirname + '/.././snapshots/Page0 - Generic Button click.txt';

describe('Update Action Type', () => {
    it('when updating action type a snapshot should be taken showing the update', async () => {
        const driver = await new Builder().forBrowser('chrome').build();
        const client = new Client(driver, {});
        client.currentPage = '0';

        await client.driver.get('https://www.google.com/'); 
        await driver.executeScript(`document.documentElement.innerHTML = '<button id="btn" type="button">ClickMe</button>'`)
        
        await client.setActionType(buttonElement, ActionType.CLICK);
        await client.capturePageHTML(
            `Generic Button ${ActionType.CLICK}`
        );
        const fileText = fs.readFileSync(directory, 'utf8')
            .replace(/\\\//g, "/");
        expect(fileText).toContain(`action-type="click"`);
    })

    afterAll(() => {
        fs.unlinkSync(directory);
    })
})