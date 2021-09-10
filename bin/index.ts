#!/usr/bin/env node

import { Command } from "commander";
import { fetchXml } from "iconfont-parser";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import camelCase from "camelCase";
import { getConfig, checkConfigExist, getTemplate } from "./utils";
import pkg from "../package.json";

const program = new Command();

program
  .version(pkg.version, "-v, --version", "当前 vue-iconfont-cli 版本")
  .command("init")
  .alias("i")
  .description("初始化 vue-iconfont-cli")
  .action(async () => {
    const isConfigExist = await checkConfigExist();
    if (isConfigExist) {
      console.log(
        chalk.red("当前目录已存在iconfont.json 检查是否已初始化过该项目")
      );
    } else {
      await fs.copySync(
        path.join(__dirname, "../templates/iconfont.json"),
        path.resolve("iconfont.json")
      );
      console.log(chalk.green("初始化成功开始配置您的symbol_url开始使用吧！"));
    }
  });

program
  .command("generate")
  .alias("g")
  .description("生成 iconfont 组件")
  .action(async () => {
    const isConfigExist = await checkConfigExist();
    if (!isConfigExist) {
      console.log(
        chalk.red("当前目录未发现 iconfont.json 请检查是否已初始化过该项目")
      );
      return;
    }

    const config = getConfig();

    fetchXml(config.symbol_url).then(async (data) => {
      const iconTemplate = getTemplate("../templates/Icon.hbs");
      const entryTemplate = getTemplate("../templates/entry.hbs");

      await fs.ensureDirSync(path.join(process.cwd(), config.save_dir));

      let iconNameList: Array<{ name: string; component: string }> = [];

      data.svg.symbol.forEach((item) => {
        const iconName = camelCase(item["$"].id, { pascalCase: true });
        const svgPaths = item.path.map((pathItem) => pathItem["$"]);

        fs.writeFileSync(
          `${config.save_dir}/${iconName}.vue`,
          iconTemplate({ svgPaths })
        );
        iconNameList.push({ name: item["$"].id, component: iconName });
      });

      fs.writeFileSync(
        `${config.save_dir}/index.vue`,
        entryTemplate({ iconNameList })
      );
      console.log(chalk.green("生成 iconfont 组件成功"));
    });
  });

program.exitOverride();

try {
  program.parse(process.argv);
} catch (error) {
  program.outputHelp();
}
