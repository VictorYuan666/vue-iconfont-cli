import path from "path";
import fs from "fs-extra";
import handlebars from "handlebars";

export interface Config {
  symbol_url: string;
  save_dir: string;
}

export const getConfig = () => {
  const targetFile = path.resolve("iconfont.json");
  const config = require(targetFile) as Config;
  if (config.symbol_url.startsWith("//")) {
    config.symbol_url = "https:" + config.symbol_url;
  }

  return config;
};

export const checkConfigExist = async (): Promise<boolean> => {
  const configFile = path.resolve("iconfont.json");
  const isExist = await fs.existsSync(configFile);
  return isExist;
};

export const getTemplate = (filePath: string) => {
  const fileName = path.join(__dirname, filePath);
  const content = fs.readFileSync(fileName).toString();
  return handlebars.compile(content);
};
