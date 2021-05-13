import { WebDriver } from "selenium-webdriver";
import { Client } from "../client";

export class Page {

    client: Client;
    driver: WebDriver;

    constructor(client: Client) {
        this.client = client;
        this.driver = client.driver;
    }
}
