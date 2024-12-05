import logger from "../logger/logger";

class WebActions {

  public async clickOnElement(locator:ChainablePromiseElement,elementDescription:string):Promise<ChainablePromiseElement> {
    await locator.isDisplayed();
    await locator.waitForClickable();
    await locator.click();
    logger.info(`Successfully clicked on the element: ${elementDescription}`);
  }
  
  public async navigateToURL(url: string): Promise<void> {
    await browser.maximizeWindow();
    await browser.url(url);
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === "complete"
    );
    logger.info(`Successfully navigated to URL: ${url}`);
  }
  
  public async getElementText(locator: string | WebdriverIO.Element, elementDescription: string): Promise<string> {
    await $(locator).isDisplayed();
    const text = await $(locator).getText();
    logger.info(`Successfully retrieved text from element: ${elementDescription}. Text: ${text}`);
    return text;
  }
  
  public async isElementVisible(locator: string | WebdriverIO.Element, elementDescription: string): Promise<boolean> {
    const isVisible = await $(locator).isDisplayed();
    logger.info(`Visibility of element '${elementDescription}': ${isVisible ? "Visible" : "Not Visible"}`);
    return isVisible;
  }
  
  public async waitForElementToDisappear(locator: ChainablePromiseElement): Promise<ChainablePromiseElement> {
    await locator.waitForDisplayed({ reverse: true });
    logger.info(`Successfully waited for element to disappear.`);
  }
  
  public async waitForPageToLoad(): Promise<void> {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === "complete");
    logger.info("Page loaded successfully.");
  }
  
  public async getCurrentURL(): Promise<string> {
    const url = await browser.getUrl();
    logger.info(`Current URL retrieved: ${url}`);
    return url;
  }  

  public async scrollElementIntoView(locator: ChainablePromiseElement, elementDescription: string): Promise<ChainablePromiseElement> {
    logger.info(`Attempting to scroll element into view: ${elementDescription}`);
    await locator.isDisplayed();
    await locator.scrollIntoView({ block: "center" });
    logger.info(`Element successfully scrolled into view: ${elementDescription}`);
    return locator;
  } 

  public async mouseHoverOnElement(locator:ChainablePromiseElement,elementDescription:string):Promise<ChainablePromiseElement> {
    await locator.isDisplayed();
    await locator.moveTo();
    logger.info(`Mouse hover on element: ${elementDescription}`);
    return locator;
}

}
export const webActions = new WebActions();
