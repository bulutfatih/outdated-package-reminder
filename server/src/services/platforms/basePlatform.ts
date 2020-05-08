export abstract class BasePlatform {
  abstract getPackageJson(namespace: string, repository: string): Promise<Array<[string, string]>>;

  abstract getComposerJson(namespace: string, repository: string): Promise<Array<[string, string]>>;
}
