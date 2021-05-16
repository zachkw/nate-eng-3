import { Builder } from 'selenium-webdriver';
import { Client } from "./client";
import { clearSnapshotDirectory } from './utilities';

const dict = {
        "city": "london",
        "name": "nate",
        "password": "07000000000",
        "email": "nate@nate.tech",
        "gender": "female"
    };

const run = async () => {
        let properties;
        clearSnapshotDirectory();

        const driver = new Builder().forBrowser('chrome').build();
        const client = new Client(driver, dict);

        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html')
        client.currentPage = '1';
        await client.page1.ensureLoad();
        await client.page1.nextPage();

        client.currentPage = '2';
        await client.page2.ensureLoad();
        
        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);

        await client.page2.clickNextPage();

        client.currentPage = '3';
        await client.page3.ensureLoad();

        client.page3.popUpCheck();

        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);
        await client.page3.clickSubmit();

        driver.quit();
}

run();


