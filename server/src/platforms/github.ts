import axios from "axios";
import { BasePlatform } from "./basePlatform";

export class Github extends BasePlatform {
  async getPackageJson(
    namespace: string,
    repository: string
  ): Promise<Array<[string, string]>> {
    // get package.json file and return dependencies
    try {
      const result = await axios.get(
        `https://raw.githubusercontent.com/${namespace}/${repository}/master/package.json`
      );

      const dependencies = result.data.dependencies;
      const devDependencies = result.data.devDependencies;

      const packageList = { ...dependencies, ...devDependencies };

      return Object.entries(packageList);
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }

  async getComposerJson(
    namespace: string,
    repository: string
  ): Promise<Array<[string, string]>> {
    // get composer.json file

    // THIS IS NOT IMPLEMENTED YET
    return [];
  }
}
