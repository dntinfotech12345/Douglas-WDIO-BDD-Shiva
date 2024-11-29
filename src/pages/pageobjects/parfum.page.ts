import { ParfumPageConstants } from "../pageconstants/parfum.page.constants";
import { webActions } from "../../helper/util/web.actions.util";
import logger from "../../helper/logger/logger";

class ParfumPageObject {

  public async getParfumPageTitle(): Promise<string> {
    await webActions.waitForPageToLoad();
    const title = await browser.getTitle();
    logger.info(`Parfum page title is: ${title}`);
    return title;
  }

  public async selectParfumPageDropdown(filterOption: string): Promise<void> {
    const searchBarSelector =await $(ParfumPageConstants.searchBar);
    await searchBarSelector.moveTo();
    logger.info("Hovered over the search bar to ensure dropdown visibility");

    const dropdownLocator = ParfumPageConstants.parfumPageDropdown(filterOption);
    await webActions.waitAndClick(dropdownLocator, `Dropdown filter option '${filterOption}' selected`);
  }

  public async selectDropdownOption(filterOption: string): Promise<void> {
    const filterOpt = ParfumPageConstants.highlightFilterOption(filterOption);
    await webActions.waitAndClick(filterOpt,`Filter option '${filterOption}' selected`);
  }

  public async getTheFilterTextAndVerify(
    actualFilterText: string): Promise<void> {
    const filterSelector = ParfumPageConstants.appliedFilters;
    await browser.waitUntil(async () => {
        const filters = await $$(filterSelector);
        return filters.length > 0;},{timeout:2000,timeoutMsg:"Applied filters not found"}
    );

    const filters = await $$(filterSelector);
    const filterTexts: string[] = await Promise.all(
      filters.map(async (filter) => (await filter.getText()).trim())
    );

    logger.info(`Verifying if the filter contains text: '${actualFilterText}'`);
    if (!filterTexts.includes(actualFilterText)) {
      throw new Error(`Expected filter text '${actualFilterText}' not found`);
    }
    logger.info(`Filter text '${actualFilterText}' verified successfully`);
  }

  public async verifyTheFilterTagAcrossPages(
    actualFilterText: string): Promise<void> {
    let currentPage = 1;
    let totalPages = 1;

    const pageInfoLocator = ParfumPageConstants.pageInfoLocator;
    const pageInfoText = await $(pageInfoLocator).getText();

    const match = pageInfoText.match(/Seite (\d+) von (\d+)/);
    if (match) {
      currentPage = parseInt(match[1]);
      totalPages = parseInt(match[2]);
    }

    logger.info(`Total pages to validate: ${totalPages}`);

    while (currentPage <= totalPages) {
      logger.info(`Validating filter tag on page ${currentPage} of ${totalPages}`);

      const filterTagSelector = ParfumPageConstants.filterTag(actualFilterText);
      await browser.waitUntil(async () => {
          const tag = await $(filterTagSelector);
          return tag.isDisplayed();
        }
      );

      const filters = await $$(filterTagSelector);
      logger.info(`Found ${filters.length} filters on page ${currentPage}`);
      
      const filterTexts: string[] = [];
      for (const filter of filters) {
        await filter.scrollIntoView();
        await filter.isDisplayed();
        const filterText = await filter.getText();
        filterTexts.push(filterText.trim());
      }
      
      logger.info(`Verifying if the applied filters contain: '${actualFilterText}' on page ${currentPage}`);

      if (!filterTexts.includes(actualFilterText.toUpperCase())) {
        logger.error(
          `Expected filter text '${actualFilterText}' not found. Available filters: ${filterTexts}`
        );
        throw new Error(
          `Expected filter text '${actualFilterText}' not found on page ${currentPage}`
        );
      }

      logger.info("Filter verification successful on this page");

      if (currentPage < totalPages) {
        logger.info(`Navigating to page ${currentPage + 1}`);
        const nextPageButton = await $(ParfumPageConstants.nextPageArrow);
        await nextPageButton.click();
        await webActions.waitForPageToLoad();
        currentPage++;
      } else {
        logger.info("Reached the last page, stopping pagination.");
        break;
      }
    }
  }
}

export const parfumPage = new ParfumPageObject();
