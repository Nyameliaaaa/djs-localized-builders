export type ArgsWithRawParam = { raw?: boolean; [key: string]: unknown };
export type ArgsWithRawOrKeyedParam = { raw?: boolean; localized?: boolean; [key: string]: unknown };

type FieldNameSource =
	| {
			// Raw Name
			name: string;
			nameRef?: never;
			// No args for raw strings
			nameArgs?: never;
	  }
	| {
			name?: never;
			// Localized Ref Name
			nameRef: string;
	  }
	| {
			name?: never;
			// Base Key Name (Implicit)
			nameRef?: never;
	  };

type FieldValueSource =
	| {
			// Raw Value
			value: string;
			valueRef?: never;
			// No args for raw strings
			valueArgs?: never;
	  }
	| {
			value?: never;
			// Localized Ref Value
			valueRef: string;
	  }
	| {
			value?: never;
			// Base Key Value (Implicit)
			valueRef?: never;
	  };

type BaseKeySource =
	| {
			key: string;
			// Base Key overrides local ref keys
			nameRef?: never;
			valueRef?: never;
	  }
	| {
			key?: never;
	  };

/**
 * @group Embeds
 */
export type LocaleFieldOptions = {
	inline?: boolean;
	nameArgs?: Record<string, unknown>;
	valueArgs?: Record<string, unknown>;
} & FieldNameSource &
	FieldValueSource &
	BaseKeySource;

export type TextLocaleAuthor = {
	nameRef?: string;
	name?: never;
	nameArgs?: Record<string, unknown>;
};

export type RawTextLocaleAuthor = {
	nameRef?: never;
	name?: string;
	nameArgs?: never;
};

/**
 * @group Embeds
 */
export type LocaleAuthor = (TextLocaleAuthor | RawTextLocaleAuthor) & { url?: string; iconURL?: string };

export type TextLocaleFooter = {
	textRef?: string;
	text?: never;
	textArgs?: Record<string, unknown>;
};

export type RawTextLocaleFooter = {
	textRef?: never;
	text?: string;
	textArgs?: never;
};

/**
 * @group Embeds
 */
export type LocaleFooter = (TextLocaleFooter | RawTextLocaleFooter) & { iconURL?: string };
