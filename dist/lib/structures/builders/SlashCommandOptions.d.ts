import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v8';
import type { ToJSON } from './SlashCommand';
export declare class Shared__Options {
    protected options: ToJSON[];
    /**
     * Adds a boolean option
     * @param input A function that returns an option builder, or an already built builder
     */
    addBooleanOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)): this;
    /**
     * Adds a user option
     * @param input A function that returns an option builder, or an already built builder
     */
    addUserOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)): this;
    /**
     * Adds a channel option
     * @param input A function that returns an option builder, or an already built builder
     */
    addChannelOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)): this;
    /**
     * Adds a role option
     * @param input A function that returns an option builder, or an already built builder
     */
    addRoleOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)): this;
    /**
     * Adds a string option
     * @param input A function that returns an option builder, or an already built builder
     */
    addStringOption(input: SlashCommandStringOption | ((builder: SlashCommandStringOption) => SlashCommandStringOption)): this;
    addIntegerOption(input: SlashCommandIntegerOption | ((builder: SlashCommandIntegerOption) => SlashCommandIntegerOption)): this;
    private __sharedOptionMethod;
}
export declare class Shared__NameAndDescription {
    protected name: string;
    protected description: string;
    /**
     * Sets the name
     * @param name The name
     */
    setName(name: string): this;
    /**
     * Sets the description
     * @param description The description
     */
    setDescription(description: string): this;
}
export declare class SlashCommandOptionBase extends Shared__NameAndDescription implements ToJSON {
    protected type: ApplicationCommandOptionType;
    protected required: boolean;
    constructor(type: ApplicationCommandOptionType);
    /**
     * Marks the option as required
     * @param required If this option should be required
     */
    setRequired(required: boolean): this;
    toJSON(): {
        type: ApplicationCommandOptionType;
        name: string;
        description: string;
        required: boolean;
    };
}
declare abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number> extends SlashCommandOptionBase implements ToJSON {
    protected abstract type: ApplicationCommandOptionType.STRING | ApplicationCommandOptionType.INTEGER;
    protected choices?: APIApplicationCommandOptionChoice[];
    /**
     * Adds a choice for this option
     * @param name The name of the choice
     * @param value The value of the choice
     */
    addChoice(name: string, value: T): this;
    /**
     * Adds multiple choices for this option
     * @param choices The choices array
     */
    addChoices(choices: Record<string, T> | [name: string, value: T][]): this;
    toJSON(): {
        choices: APIApplicationCommandOptionChoice[] | undefined;
        type: ApplicationCommandOptionType;
        name: string;
        description: string;
        required: boolean;
    };
}
export declare class SlashCommandStringOption extends ApplicationCommandOptionWithChoicesBase<string> {
    protected type: ApplicationCommandOptionType.STRING;
}
export declare class SlashCommandIntegerOption extends ApplicationCommandOptionWithChoicesBase<number> {
    protected type: ApplicationCommandOptionType.INTEGER;
}
export {};
//# sourceMappingURL=SlashCommandOptions.d.ts.map