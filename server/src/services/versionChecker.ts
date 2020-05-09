import { Platforms } from '../constants/enum';
import { GitProvider } from './gitProvider';
import { Npm } from './packageManagers/npm';
import { IPackage } from './interfaces';

export class VersionChecker {
  private _platform: Platforms;

  constructor(platform: string) {
    this._platform = this._findPlatform(platform);
  }

  private _findPlatform(platform: string): Platforms {
    if (platform?.toLowerCase() === 'gitlab') return Platforms.Gitlab;
    else return Platforms.Github;
  }

  async checkPackages(namespace: string, repository: string): Promise<IPackage[]> {
    const gitProvider = new GitProvider(this._platform);

    const packageJson = await gitProvider.git.getPackageJson(namespace, repository);
    const composerJson = await gitProvider.git.getComposerJson(namespace, repository);

    if (packageJson) {
      // check packages from npm
      const npm = new Npm();
      const result = await npm.findOutdatedPackages(packageJson);
      return result;
    } else if (composerJson) {
      // check packages from composer : NOT IMPLEMENTED
      return [];
    } else {
      return [];
    }
  }
}
