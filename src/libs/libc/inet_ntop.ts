import { load_libc } from "./loader";
import { init_posix_struct_in_addr } from "~/structs/in_addr/posix";
import { init_posix_struct_in6_addr } from "~/structs/in6_addr/posix";
import { cached } from "~/utils/initializers";

/**
 * @see https://opensource.apple.com/source/Libc/Libc-1439.141.1/net/inet_ntop.c.auto.html
 */
export const inet_ntop = (af: number, addr: any, buf: [string], len: number): string => {
  return cached(inet_ntop, () => {
    const libc = load_libc();
    init_posix_struct_in_addr();
    init_posix_struct_in6_addr();

    return libc.func("const char *inet_ntop(int af, const void *addr, _Out_ char *buf, size_t len)");
  })(af, addr, buf, len);
};
