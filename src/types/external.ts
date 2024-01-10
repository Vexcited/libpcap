class ExternalModule<Struct extends unknown> {
  constructor (public struct: Struct) {}
};

// An attempt to type [External] from Node.js
export type ext<Struct extends unknown> = ExternalModule<Struct>
export type struct<Ext extends ExternalModule<NonNullable<unknown>>> = Ext["struct"];
