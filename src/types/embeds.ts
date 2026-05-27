export type ArgsWithRawParam = { raw?: boolean; [key: string]: any };
export type ArgsWithRawOrKeyedParam = { raw?: boolean; localized?: boolean; [key: string]: any };

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
    nameArgs?: Record<string, any>;
    valueArgs?: Record<string, any>;
} & FieldNameSource &
    FieldValueSource &
    BaseKeySource;

export type TextLocaleAuthor = {
    nameRef?: string;
    name?: never;
    nameArgs?: Record<string, any>;
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
    textArgs?: Record<string, any>;
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
