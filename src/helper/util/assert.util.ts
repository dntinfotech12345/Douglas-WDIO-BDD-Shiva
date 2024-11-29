import { expect } from "chai";

class AssertUtil {
  
  public async assertTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await browser.getTitle();
    expect(actualTitle).to.equal(expectedTitle, `Expected title to be '${expectedTitle}', but got '${actualTitle}'`);
  }

  public async assertTitleContains(partialTitle: string): Promise<void> {
    const actualTitle = await browser.getTitle();
    expect(actualTitle).to.include(partialTitle, `Expected title to contain '${partialTitle}', but got '${actualTitle}'`);
  }

  public async assertURL(expectedURL: string,actualURL:string): Promise<void> {
    expect(expectedURL).to.equal(actualURL, `Expected URL to be '${expectedURL}', but got '${actualURL}'`);
  }

  public async assertURLContains(partialURL: string): Promise<void> {
    const actualURL = await browser.getUrl();
    expect(actualURL).to.include(partialURL, `Expected URL to contain '${partialURL}', but got '${actualURL}'`);
  }

  public async assertElementVisible(locator: string): Promise<void> {
    const element = await $(locator);
    const isDisplayed = await element.isDisplayed();
    expect(isDisplayed).to.be.true;
  }

  public async assertElementContainsText(locator: string, expectedText: string): Promise<void> {
    const element = await $(locator);
    const actualText = await element.getText();
    expect(actualText).to.include(expectedText, `Expected element text to include '${expectedText}', but got '${actualText}'`);
  }

  public async assertElementExists(locator: string): Promise<void> {
    const element = await $(locator);
    const exists = await element.isExisting();
    expect(exists).to.be.true;
  }

  public async assertElementHidden(locator: string): Promise<void> {
    const element = await $(locator);
    const isDisplayed = await element.isDisplayed();
    expect(isDisplayed).to.be.false;
  }
}

export const assert=new AssertUtil();