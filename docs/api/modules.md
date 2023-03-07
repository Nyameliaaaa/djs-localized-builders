# djs-localized-builders

## Config Interfaces

- [ConfigType](interfaces/ConfigType.md)
- [GetLocalizedStringOptions](interfaces/GetLocalizedStringOptions.md)
- [NamespaceMap](interfaces/NamespaceMap.md)

## Config Functions

- [getConfig](modules.md#getconfig)
- [setConfig](modules.md#setconfig)

## Helpers Functions

- [getAllStrings](modules.md#getallstrings)
- [getDefaultString](modules.md#getdefaultstring)
- [joinKeys](modules.md#joinkeys)

## Config Functions

### getConfig

▸ **getConfig**(): [`ConfigType`](interfaces/ConfigType.md)

Get the currently selected config.

#### Returns

[`ConfigType`](interfaces/ConfigType.md)

#### Defined in

[config.ts:52](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/config.ts#L52)

___

### setConfig

▸ **setConfig**(`newConfig`): `void`

Set config for the library.

**`Example`**

```ts
setConfig({
	getLocalizedString: ({ namespace, string, lang, options }) => {
		return client.i18n.getString({ namespace, string, lang, options }) ?? 'fetch_fail'
	},
	caseFormat: 'lowercase',
	seperatorChar: '_',
	validators: proccess.ENV.NODE_ENV === 'production',
       langs: client.i18n.langs , // use discord i18n codes
	namespaces: {
		components: 'components',
		commands: 'commands',
		embeds: 'responses'
	}
});
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | `Partial`<[`ConfigType`](interfaces/ConfigType.md)\> | The new config to use. |

#### Returns

`void`

#### Defined in

[config.ts:38](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/config.ts#L38)

___

## Helpers Functions

### getAllStrings

▸ **getAllStrings**(`string`, `namespace`, `options?`): `Record`<`string`, `string`\>

Get a string in all possible locales.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to get. |
| `namespace` | ``"components"`` \| ``"commands"`` \| ``"embeds"`` | The namespace to use. |
| `options?` | `Record`<`string`, `any`\> | Any additional args. |

#### Returns

`Record`<`string`, `string`\>

#### Defined in

[helpers.ts:57](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/helpers.ts#L57)

___

### getDefaultString

▸ **getDefaultString**(`string`, `namespace`, `options?`): `string`

Get a string in the en-US locale.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `string` | `string` | The string to get. |
| `namespace` | ``"components"`` \| ``"commands"`` \| ``"embeds"`` | The namespace to use. |
| `options?` | `Record`<`string`, `any`\> | Any additional args. |

#### Returns

`string`

#### Defined in

[helpers.ts:35](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/helpers.ts#L35)

___

### joinKeys

▸ **joinKeys**(`keys`): `string`

A helper to join multiple base key parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | `string`[] | The keys to join. |

#### Returns

`string`

The joined key.

#### Defined in

[helpers.ts:9](https://github.com/night-lake/djs-localized-builders/blob/4956135/src/helpers.ts#L9)
