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

    beforeAll(async () => {
        clearSnapshotDirectory();
        driver = new Builder().forBrowser('chrome').build();
        client = new Client(driver, dict);
        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html')
    });
    

    it('Page 1', async () => {
        client.currentPage = '1';
        await client.page1.ensureLoad();
        await client.page1.nextPage();
    });

    it('Page 2', async () => {
        client.currentPage = '2';
        await client.page2.ensureLoad();
        
        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);

        await client.page2.clickNextPage();
    });

    it('Page 3', async () => {
        client.currentPage = '3';
        await client.page3.ensureLoad();

        client.page3.popUpCheck();

        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);
        await client.page3.clickSubmit();
    });

    afterAll(() => {
        driver.close();
    })
});

