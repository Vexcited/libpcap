export type ptr = [any];
export const make_ptr = <T extends unknown>(init: T): ptr => [init];
export const read_ptr = (ptr: [any]) => ptr[0];
