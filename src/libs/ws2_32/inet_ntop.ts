import { load_Ws2_32_dll } from "~/libs/ws2_32/loader";
import { init_windows_struct_in_addr } from "~/structs/in_addr/windows";
import { init_windows_struct_in6_addr } from "~/structs/in6_addr/windows";
import { cached } from "~/utils/initializers";

/** @see https://learn.microsoft.com/en-us/windows/win32/api/ws2tcpip/nf-ws2tcpip-inet_ntop */
export const inet_ntop = (Family: number, pAddr: any, pStringBuf: [string], StringBufSize: number): string => {
  return cached(inet_ntop, () => {
    const ws2_32 = load_Ws2_32_dll();
    init_windows_struct_in_addr();
    init_windows_struct_in6_addr();

    return ws2_32.func("const char *inet_ntop(int Family, const void *pAddr, _Out_ char *pStringBuf, size_t StringBufSize)");
  })(Family, pAddr, pStringBuf, StringBufSize);
};
