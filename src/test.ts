import { SlashCommandBuilder } from '@discordjs/builders';
import { NumberOption, setConfig } from 'index';
import { getAllStrings, getDefaultString, joinKeys } from 'lib/helpers';
import { BaseKeyMixin, PermsV2Mixin, SharedOptionsMixin } from 'mixins';
import { mix, settings } from 'ts-mixer';

settings.initFunction = 'init';

export interface Funny
    extends PermsV2Mixin<SlashCommandBuilder>,
        SharedOptionsMixin<SlashCommandBuilder>,
        BaseKeyMixin {}

@mix(PermsV2Mixin, SharedOptionsMixin, BaseKeyMixin)
export class Funny {
    // eslint-disable-next-line
    constructor(baseKey?: string) {
        this.builder = new SlashCommandBuilder();
    }

    protected init(baseKey?: string) {
        if (baseKey) {
            this.setName(getDefaultString(joinKeys([baseKey, 'name']), 'commands'));
            this.setDescription(getDefaultString(joinKeys([baseKey, 'description']), 'commands'));
            this.setNameLocalizations(getAllStrings(joinKeys([baseKey, 'name']), 'commands'));
            this.setDescriptionLocalizations(getAllStrings(joinKeys([baseKey, 'description']), 'commands'));
        }
    }
}

const locs = {
    'en-US': {
        'funny name': 'funny',
        'funny description': 'im going to',
        'funny options first name': 'first',
        'funny options first description': 'first desc',
        'funny options third name': 'third',
        'funny options third description': 'third desc',
        'funny options third choices cock': 'kurwa',
        'funny options third choices 1': 'another kurwa'
    },
    pl: {
        'funny name': 'funny_kurwa',
        'funny description': 'im going to kurwa',
        'funny options first name': 'first_kurwa',
        'funny options first description': 'first desc kurwa',
        'funny options third name': 'third_kurwa',
        'funny options third description': 'third desc kurwa',
        'funny options third choices cock': 'kurwa kurwa',
        'funny options third choices 1': 'another kurwa kurwa'
    }
};

setConfig({
    getLocalizedString(options) {
        // @ts-expect-error
        return locs[options.lang][options.string];
    },
    seperatorChar: ' ',
    caseFormat: 'lowercase',
    langs: Object.keys(locs),
    validators: false
});

const funny = new Funny('funny')
    .setDMPermission(false)
    .addNumberOption('first', option => option.setAutocomplete(true))
    .addNumberOption(option => option.setName('cock').setDescription('how very'))
    .addNumberOption(new NumberOption('third').addChoices([{ key: 'cock', value: 2 }]).addChoices(1));

console.log(funny.toJSON());
