import { Builder } from 'selenium-webdriver';
import { Client } from "./client";

const dict = {
        "city": "london",
        "name": "nate",
        "password": "07000000000",
        "email": "nate@nate.tech",
        "gender": "female"
    };

const run = async () => {
        let properties;
        const driver = new Builder().forBrowser('chrome').build();
        const client = new Client(driver, dict);

        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page1.html')
        client.currentPage = '1';
        await client.page1.ensureLoad();
        client.page1.nextPage();

        client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page2.html')
        client.currentPage = '2';
        await client.page2.ensureLoad();
        
        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);

        await client.page2.clickNextPage();

        client.currentPage = '3';
        await client.driver.get('https://nate-eu-west-1-prediction-test-webpages.s3-eu-west-1.amazonaws.com/tech-challenge/page3.html');
        await client.page3.ensureLoad();

        // FAIL: can't get this to work
        client.page3.popUpCheck();

        properties = await client.getPageProperties();
        await client.attemptToFillPage(properties);
        await client.page3.clickSubmit();

        await client.page3.popUpCheck();
        await driver.manage().setTimeouts( { implicit: 30000 } );



}

run();


