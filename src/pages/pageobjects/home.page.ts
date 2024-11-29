import { HomePageConstants } from "../pageconstants/home.page.constants";
import { webActions } from "../../helper/util/web.actions.util";
import logger from "../../helper/logger/logger";

class HomePageObject {
  
  public async acceptCookies(): Promise<void> {
    try {
      await webActions.waitAndClick(
        HomePageConstants.AcceptAllButton,
        "Accept All button"
      );
      logger.info("Clicked on Accept All button");
    } catch (error) {
      await webActions.clearCookies();
      logger.info("Deleted cookies programmatically after failure");
      logger.error(error);
    }
  }

  public async clickHomePageTab(tabName: string): Promise<void> {
    const tabSelector = HomePageConstants.HeadingTab(tabName);
    await webActions.waitAndClick(tabSelector, `tab ${tabName}`);
    logger.info(`Clicked on tab ${tabName}`);
  }

  public async getHomePageURL(): Promise<string> {
    const currentURL = await webActions.getCurrentURL();
    logger.info(`Current page URL: ${currentURL}`);
    return currentURL;
  }
}

export const homepage = new HomePageObject();
