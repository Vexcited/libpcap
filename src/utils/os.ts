export const os = process.platform;
export const is_win32 = os === 'win32';
export const is_darwin = os === 'darwin';
export const is_posix = !is_win32;

export const variants = <T extends unknown>(
  win32: T,
  darwin: T = win32,
  linux: T = darwin,
  openbsd: T = linux
) => {
  switch (os) {
    case 'win32': return win32;
    case 'darwin': return darwin;
    case 'linux': return linux;
    case 'openbsd': return openbsd;
  }
}

export class UnsupportedOS extends Error {
  constructor () {
    super(`Unsupported OS, should be '${os}'`);
    this.name = "UnsupportedOS";
  }
}
