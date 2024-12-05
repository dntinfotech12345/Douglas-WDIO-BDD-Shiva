export class HomePageConstants {

  public static acceptAllButton = '[data-testid="uc-accept-all-button"]';

  public static headingTab = (tabName: string): string =>
    `//a[@type='nav-heading' and text()='${tabName}']`;

}
