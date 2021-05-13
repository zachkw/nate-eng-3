import { Builder, By, Key, until, WebDriver, WebElement } from 'selenium-webdriver';

export class PageElement {
    by: By
    query?: string

    constructor(by: By, query?: string) {
        this.by = by
        this.query = query
    }
} 

export enum ActionType {
    CLICK = 'click',
    SELECT = 'select',
    INPUT = 'input',
    CHECK = 'check'
}