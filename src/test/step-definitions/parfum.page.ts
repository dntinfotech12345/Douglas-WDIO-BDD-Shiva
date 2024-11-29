import { Given, Then, When } from "@wdio/cucumber-framework";
import { webActions } from "../../helper/util/web.actions.util";
import { config } from "../../../config/wdio.test.conf";
import { homepage } from "../../pages/pageobjects/home.page";
import { assert } from "../../helper/util/assert.util";
import * as data from "../../data/test-data/douglasPage.json"
import { parfumPage } from "../../pages/pageobjects/parfum.page";

Given(/^User navigates to the application$/, async () => {
  await webActions.navigateToURL(config.douglasURL);
});

When(/^User click on parfum tab$/, async () => {
  await homepage.acceptCookies();
  await homepage.clickHomePageTab(data.headingTabs.parfum);
});

Then(/^Verify user on the parfum page$/, async () => {
  assert.assertURL(data.parfumPage.parfumPageUrl,await homepage.getHomePageURL());
});

When(/^I select the "(.*)" dropdown$/, async (dropdown:string) => {
  await parfumPage.selectParfumPageDropdown(dropdown);
});

Then(/^I select the "(.*)" filter option from the dropdown$/, async (filterOption:string) => {
await parfumPage.selectDropdownOption(filterOption)
});

Then(/^Verify the "(.*)" filter is applied$/, async (filterOption:string) => {
await parfumPage.getTheFilterTextAndVerify(filterOption);
await parfumPage.verifyTheFilterTagAcrossPages(filterOption);

});