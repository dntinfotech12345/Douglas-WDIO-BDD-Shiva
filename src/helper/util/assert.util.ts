import { expect } from "chai";

class AssertUtil {
  
  public async assertPageURL(expectedURL: string, actualURL: string): Promise<void> {
    expect(actualURL).to.equal(expectedURL, `Expected URL to be '${expectedURL}', but got '${actualURL}'`);
  }

  public async assertElementTextContains(actualText: string[], expectedText: string): Promise<void> {
    expect(actualText).to.include(expectedText, `Expected element text to include '${expectedText}', but got '${actualText}'`);
  }
  
}

export const assert = new AssertUtil();
