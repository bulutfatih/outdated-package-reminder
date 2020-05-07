export interface IReminder {
  email: string;
  namespace: string;
  repository: string;
  platform: string;
  date: Date;
}

export interface IPackage {
  packageName: string;
  currentVersion: string;
  latestVersion: string;
}
