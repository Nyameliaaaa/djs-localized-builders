# Interface: ConfigType

The type for the library config.

## Properties

### caseFormat

• **caseFormat**: ``"uppercase"`` \| ``"lowercase"`` \| ``"keep"``

The case your strings are coded in.
If you are using camelCase key names, you must use 'keep'

**`Default Value`**

`false`

#### Defined in

[types/config.ts:67](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L67)

___

### getLocalizedString

• **getLocalizedString**: (`options`: [`GetLocalizedStringOptions`](GetLocalizedStringOptions.md)) => `string`

#### Type declaration

▸ (`options`): `string`

The function which is responsible for fetching a localized string. You must define this for the library to function.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`GetLocalizedStringOptions`](GetLocalizedStringOptions.md) | The options passed by the function. |

##### Returns

`string`

#### Defined in

[types/config.ts:60](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L60)

___

### langs

• **langs**: `string`[]

The languages that the builders should support.

**`Default Value`**

'en-US'

#### Defined in

[types/config.ts:84](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L84)

___

### namespaces

• `Optional` **namespaces**: [`NamespaceMap`](NamespaceMap.md)

Modify the default namespace names used by the library for string fetching.

#### Defined in

[types/config.ts:78](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L78)

___

### seperatorChar

• **seperatorChar**: `string`

The char to join the base keys with.

**`Default Value`**

'.'

#### Defined in

[types/config.ts:73](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L73)

___

### validators

• `Optional` **validators**: `boolean`

Whether to enable the Discord.js Builder validators.

**`Default Value`**

`true`

#### Defined in

[types/config.ts:90](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/types/config.ts#L90)
