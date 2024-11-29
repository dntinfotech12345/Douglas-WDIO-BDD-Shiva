import logger from "../logger/logger";

class WebActions {
  private async getElement(locator: string | WebdriverIO.Element): Promise<WebdriverIO.Element> {
    return typeof locator === "string" ? $(locator) : locator;
  }

  public async waitAndClick(locator: string | WebdriverIO.Element, elementDescription: string): Promise<void> {
    try {
      const element = await this.getElement(locator);
      await element.waitForDisplayed({ timeout: 5000 });
      await element.click();
      logger.info(`Successfully clicked on the element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to click on the element: ${elementDescription}`, error);
      throw new Error(`Error in waitAndClick for element '${elementDescription}': ${error.message}`);
    }
  }

  public async navigateToURL(url: string): Promise<void> {
    try {
      await browser.maximizeWindow();
      await browser.url(url);
      await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === "complete",
        { timeout: 5000, timeoutMsg: "Page did not load within timeout" }
      );
      logger.info(`Successfully navigated to URL: ${url}`);
    } catch (error) {
      logger.error(`Failed to navigate to URL: ${url}`, error);
      throw error;
    }
  }

  public async navigateUsingElement(locator: string | WebdriverIO.Element, elementDescription: string): Promise<void> {
    try {
      const element = await this.getElement(locator);
      await Promise.all([
        this.waitAndClick(element, elementDescription),
        browser.waitUntil(
          async () => (await browser.execute(() => document.readyState)) === "complete",
          { timeout: 5000, timeoutMsg: "Page did not fully load" }
        ),
      ]);
      logger.info(`Successfully navigated using element: ${elementDescription}`);
    } catch (error) {
      logger.error(`Failed to navigate using element: ${locator}`, error);
      throw error;
    }
  }

  public async setInputValue(locator: string | WebdriverIO.Element, value: string, elementDescription: string): Promise<void> {
    try {
      const element = await this.getElement(locator);
      await element.waitForDisplayed({ timeout: 5000 });
      await element.setValue(value);
      logger.info(`Successfully set value for element: ${elementDescription} to: ${value}`);
    } catch (error) {
      logger.error(`Failed to set value for element: ${locator} with value: ${value}`, error);
      throw error;
    }
  }

  public async getElementText(locator: string | WebdriverIO.Element, elementDescription: string): Promise<string> {
    try {
      const element = await this.getElement(locator);
      await element.waitForDisplayed({ timeout: 5000 });
      const text = await element.getText();
      logger.info(`Successfully retrieved text from element: ${elementDescription}. Text: ${text}`);
      return text;
    } catch (error) {
      logger.error(`Failed to retrieve text from element: ${locator}`, error);
      throw error;
    }
  }

  public async isElementVisible(locator: string | WebdriverIO.Element, elementDescription: string): Promise<boolean> {
    try {
      const element = await this.getElement(locator);
      const isVisible = await element.isDisplayed();
      logger.info(`Visibility of element '${elementDescription}': ${isVisible}`);
      return isVisible;
    } catch (error) {
      logger.error(`Failed to check visibility for element: ${locator}`, error);
      throw error;
    }
  }

  public async waitForElementToDisappear(locator: string | WebdriverIO.Element): Promise<void> {
    try {
      const element = await this.getElement(locator);
      await element.waitForDisplayed({ reverse: true, timeout: 5000 });
      logger.info(`Successfully waited for element to disappear.`);
    } catch (error) {
      logger.error(`Failed to wait for element to disappear: ${locator}`, error);
      throw error;
    }
  }

  public async clearCookies(): Promise<void> {
    try {
      await browser.deleteCookies();
      logger.info("Successfully cleared cookies.");
    } catch (error) {
      logger.error("Failed to clear cookies", error);
      throw error;
    }
  }

  public async waitForPageToLoad(): Promise<void> {
    try {
      await browser.waitUntil(
        async () => (await browser.execute(() => document.readyState)) === "complete",
        { timeout: 10000, timeoutMsg: "Page did not load within 10 seconds" }
      );
      logger.info("Page loaded successfully.");
    } catch (error) {
      logger.error("Failed to wait for page load", error);
      throw error;
    }
  }

  public async getCurrentURL(): Promise<string> {
    try {
      const url = await browser.getUrl();
      logger.info(`Current URL retrieved: ${url}`);
      return url;
    } catch (error) {
      logger.error("Failed to retrieve the current URL", error);
      throw error;
    }
  }
}

export const webActions = new WebActions();
