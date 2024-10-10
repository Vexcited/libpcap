import { cached } from "~/utils/initializers";
import { is_win32 } from "~/utils/os";

export const inet_ntop = async (af: number, addr: any, buf: [string], len: number): Promise<string> => {
  const fn = await cached(inet_ntop, async () => {
    if (is_win32) {
      const { inet_ntop: fn } = await import("~/libs/ws2_32/inet_ntop");
      return fn;
    }
    else {
      const { inet_ntop: fn } = await import("~/libs/libc/inet_ntop");
      return fn;
    }
  });

  return fn(af, addr, buf, len);
};
