import latestVer from 'latest-version';
import semver from 'semver';
import { BasePackageManager } from './basePackageManager';
import { IPackage } from '../interfaces';

export class Npm extends BasePackageManager {
  async getLatestVersion(packageName: string): Promise<string> {
    try {
      return await latestVer(packageName);
    } catch (error) {
      return '';
    }
  }

  compareVersion(current: string, latest: string): boolean {
    const _current = semver.clean(current) || '';
    return semver.eq(_current, latest);
  }

  async findOutdatedPackages(packages: Array<[string, string]>): Promise<IPackage[]> {
    let result = [];
    for (let index = 0; index < packages.length; index++) {
      const packageName = packages[index][0];
      const currentVersion = packages[index][1].replace(/[~^]/gi, '');

      const latestVersion = await this.getLatestVersion(packages[index][0]);
      const isUpToDate = this.compareVersion(currentVersion, latestVersion);

      if (!isUpToDate) {
        const res = {
          packageName: packageName,
          currentVersion: currentVersion,
          latestVersion: latestVersion,
        };

        result.push(res);
      }
    }

    return result;
  }
}
