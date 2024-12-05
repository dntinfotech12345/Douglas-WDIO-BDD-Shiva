import { ParfumPageConstants } from "../pageconstants/parfum.page.constants";
import { webActions } from "../../helper/util/web.actions.util";
import logger from "../../helper/logger/logger";
import { assert } from "../../helper/util/assert.util";

class ParfumPageObject {
  
  public async selectParfumPageDropdown(filterOption: string): Promise<void> {
    const searchBarSelector = $(ParfumPageConstants.searchBar);
    await webActions.mouseHoverOnElement(searchBarSelector,"Search bar selector");
    logger.info("Hovered over the search bar to ensure dropdown visibility");

    const dropdownLocator=$(ParfumPageConstants.parfumPageDropdown(filterOption));
    await webActions.clickOnElement(dropdownLocator, `Dropdown value '${filterOption}' selected`);
  }

  public async selectDropdownOption(filterOption: string): Promise<void> {
    const filterOpt= $(ParfumPageConstants.highlightFilterOption(filterOption));
    await webActions.clickOnElement(filterOpt, `Filter option '${filterOption}' selected`);
  }

  public async validateFilteredOptionTextMatches(expectedFilterOptionText: string): Promise<void> {
    const filteredOptions = await $$(ParfumPageConstants.appliedFilters);
    const filterOptionsText: string[] = [];
    for (const filter of filteredOptions) {
      await webActions.isElementVisible(filter,`Filter option '${expectedFilterOptionText}'`);
      filterOptionsText.push((await webActions.getElementText(filter,`Filter option '${expectedFilterOptionText}'`)).trim());
    }
  
    assert.assertElementTextContains(filterOptionsText, expectedFilterOptionText);
    logger.info(`Filter option text matches: ${expectedFilterOptionText}`);
  }
  
  public async validateFilteredOptionProductsDisplayedAcrossPages(actualFilterText: string): Promise<void> {
    let currentPage = 1;
    let totalPages = 1;
  
    const pageInfoText = await $(ParfumPageConstants.pageInfoLocator).getText();
    const match = pageInfoText.match(/Seite (\d+) von (\d+)/);
  
    match && [parseInt(match[1]), parseInt(match[2])].forEach((value, index) => index === 0 ? (currentPage = value) : (totalPages = value));
  
    logger.info(`Total pages to validate: ${totalPages}`);

    while (currentPage <= totalPages) {
      logger.info(`Validating filter tag on page ${currentPage} of ${totalPages}`);

      const filteredProducts = await $$(ParfumPageConstants.filterTag(actualFilterText));

      const filteredProductTexts: string[] = [];      
        
      for (const filteredproduct of filteredProducts) {
        await webActions.isElementVisible(filteredproduct,`Filtered product '${actualFilterText.toUpperCase()}'`);
        filteredProductTexts.push(await webActions.getElementText(filteredproduct,`Filtered product '${actualFilterText.toUpperCase()}'`));
        }
        const matchingFilter = filteredProductTexts.find(filter => filter.toUpperCase() === actualFilterText.toUpperCase());
        matchingFilter 
          ? logger.info(`Expected filter text '${actualFilterText}' found. It matches the filter: ${matchingFilter}`)
          : (() => {
              logger.error(`Expected filter text '${actualFilterText}' not found. Available filters: ${filteredProductTexts}`);
              throw new Error(`Expected filter text '${actualFilterText}' not found on page ${currentPage}`);
            })();
        logger.info("Filter verification successful on this page");
      
        if (currentPage < totalPages) {
          logger.info(`Navigating to page ${currentPage + 1}`);
          const nextPageButton =await $(ParfumPageConstants.nextPageArrow);
          await webActions.scrollElementIntoView(nextPageButton,"Next button");
          await webActions.clickOnElement(nextPageButton,"Next button");
          await $(ParfumPageConstants.paginationText(`${currentPage+1}`, `${totalPages}`)).isDisplayed();
          currentPage++;
        } else {
          logger.info("Reached the last page, stopping pagination.");
          break;
        }  

    }

  }
  
  public async validateParfumPageURL(expectedURL: string): Promise<void> {
    await assert.assertPageURL(await webActions.getCurrentURL(), expectedURL);
    logger.info(`User successfully navigated to: ${expectedURL}`);
  }
  
}

export const parfumPage = new ParfumPageObject();
