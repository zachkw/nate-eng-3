import { Builder, WebDriver } from 'selenium-webdriver';
import { Client } from "../client";
import { clearSnapshotDirectory } from '../utilities';

jest.setTimeout(30000);

const dict = {
        "city": "london",
        "name": "nate",
        "password": "07000000000",
        "email": "nate@nate.tech",
        "gender": "female"
    };

describe('Main Run', () => {
    let driver: WebDriver;
    let client: Client;
    let properties;

    beforeAll(() => {
        clearSnapshotDirectory();
        driver = new Builder().forBrowser('chrome').build();
        client = new Client(driver, dict);
    });
    

    it('Page 1', async () => {
        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html')
        client.currentPage = '1';
        await client.page1.ensureLoad();
        client.page1.nextPage();
    });

    it('Page 2', async () => {
        client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page2.html')
        client.currentPage = '2';
        await client.page2.ensureLoad();
        
        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);

        await client.page2.clickNextPage();
    });

    it.only('Page 3', async () => {
        client.currentPage = '3';
        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page3.html');
        await client.page3.ensureLoad();

        // FAIL: can't get this to work
        // client.page3.popUpCheck();

        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);
        await client.page3.clickSubmit();

        await client.page3.popUpCheck();
        await driver.manage().setTimeouts( { implicit: 30000 } );
    });
});

