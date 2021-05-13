# Nate Automation Challenge

Zach Walker's attempt at Nate Engineer Challenge 3

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the required dependencies.

```bash
yarn
```

## Run

This will run the main script.
```bash
yarn start
```

This will run the unit test which tests the Page Scanning function
```bash
yarn test
```

## Not Achieved
1. Unable to get the selection on the dropdown options
2. Pop up removal did not work
3. Generally I think the async/wait are not staging correctly and I read some stuff online saying there could be issues. I think in hindsight I may have used Java/C#/Python instead of JavaScript for this reason

## Tech Stack
TypeScript - Personally I am enjoying Typescript quite a lot these days, and I tend to prefer it over raw JavaScript.

Selenium - It was a choice between this and cypress (as I have no puppeteer experience), and I personally think selenium is a rawer framework, and considering the type of problems in the challenge, I didn't want to have to create workarounds for Cypress, as I have had to do in the past. I do think Cypress is great for straightforward e2e automation testing.

NodeJS - Not much discussion needed here.

Jest - simply my preferred JavaScript testing framework.

## Unit Test
Testing the main mechanism that updates the action-type and saves the file. Core functionality to the exercise.

## My Experience on the Exercise

I have to say, I enjoyed this test more than I initially expected, and the further I went into it, the more interesting it became.

I felt the exercise was almost asking to build the base of the kind of system I imagine you use for Nate's checkout processing, and that appealed to me quite a lot. I have tried to focus on a design that would scale well, as more web pages were tackled.

I would have liked to have created my own WebElement class, which offered more of the inbuilt functions like updating the nate-key and action-types at the action points, as well as creating specific web elements for the different action types.

Ultimately, I wish I had more time for this task, as the potential seems quite grand and I imagine you could create a really nice system for this operation, but I have failed in managing my time well due to my lack of recent practice with Selenium and the amount I have on currently.