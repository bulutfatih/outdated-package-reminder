import { IPackage } from '../interfaces';

export abstract class BasePackageManager {
  abstract getLatestVersion(packageName: string): Promise<string>;

  abstract compareVersion(current: string, latest: string): boolean;

  abstract findOutdatedPackages(packages: Array<[string, string]>): Promise<IPackage[]>;
}
