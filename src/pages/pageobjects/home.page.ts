import { HomePageConstants } from "../pageconstants/home.page.constants"; 
import { webActions } from "../../helper/util/web.actions.util";
import logger from "../../helper/logger/logger";

class HomePageObject {
  
  public async acceptCookies(): Promise<void> {
    const acceptAllBtn = $(HomePageConstants.acceptAllButton);
      await webActions.clickOnElement(acceptAllBtn, "Accept All button"),
      logger.info("Clicked on Accept All button");
  }

  public async clickOnHeadingTab(tabName: string): Promise<void> {
    const tabSelector = $(HomePageConstants.headingTab(tabName));
    await webActions.clickOnElement(tabSelector, `tab ${tabName}`);
    logger.info(`Clicked on tab ${tabName}`);
  }

}

export const homepage = new HomePageObject();
