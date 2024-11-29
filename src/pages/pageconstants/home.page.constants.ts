export class HomePageConstants {

  public static AcceptAllButton = '[data-testid="uc-accept-all-button"]';

  public static HeadingTab = (tabName: string): string =>
    `//a[@type='nav-heading' and text()='${tabName}']`;

}
