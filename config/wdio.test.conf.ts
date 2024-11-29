import { config as baseConfig } from "../wdio.conf"

export const config = Object.assign(baseConfig, {
    environment: "TEST",
    douglasURL: "https://www.douglas.de/de",
});
