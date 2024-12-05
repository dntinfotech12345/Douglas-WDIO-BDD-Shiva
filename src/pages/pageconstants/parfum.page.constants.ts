export class ParfumPageConstants {

  public static appliedFilters = "//button[@class='selected-facets__value']";

  public static pageInfoLocator = "div[data-testid='pagination-title-dropdown']";

  public static nextPageArrow = "a[data-testid='pagination-arrow-right']";

  public static searchBar = "input[data-testid='typeAhead-input']";

  public static parfumPageDropdown = (dropdownOption: string): string =>
    `//div[@class='facet__title' and text()= '${dropdownOption}']`;

  public static highlightFilterOption = (filterOption: string): string =>
    `//div[@class='facet-option__label']//div[text()='${filterOption}']`;

  public static filterTag = (filterTag: string): string =>
    `//div[contains(@data-testid,'product-eyecatcher') and text()='${filterTag}']`;

  public static paginationText=(nextPageNumber:string,totalPageNumber:string): string=>
    `//div[text()='Seite ${nextPageNumber} von ${totalPageNumber}']`;

}
