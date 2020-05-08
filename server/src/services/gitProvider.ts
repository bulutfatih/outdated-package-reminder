import { Platforms } from '../constants/enum';
import { BasePlatform } from './platforms/basePlatform';
import { Github } from './platforms/github';

export class GitProvider {
  private _git: BasePlatform;

  constructor(platform: Platforms) {
    switch (platform) {
      case Platforms.Github:
        this._git = new Github();
      case Platforms.Gitlab:
        this._git = new Github(); // Gitlab is not implemented.
    }
  }

  get git() {
    return this._git;
  }
}
