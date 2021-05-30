import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import type { ToJSON } from './SlashCommand';
import { Shared__NameAndDescription, Shared__Options } from './SlashCommandOptions';
/**
 * Represents a folder for sub commands
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
export declare class SlashCommandSubCommandGroupBuilder extends Shared__NameAndDescription implements ToJSON {
    private options;
    /**
     * Adds a new sub command to this group
     * @param input A function that returns a sub command builder, or an already built builder
     */
    addSubCommand(input: SlashCommandSubCommandBuilder | ((subCommandGroup: SlashCommandSubCommandBuilder) => SlashCommandSubCommandBuilder)): this;
    toJSON(): {
        type: ApplicationCommandOptionType;
        name: string;
        description: string;
        options: import("discord-api-types/v8").APIApplicationCommandOption[];
    };
}
/**
 * Represents a sub command
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
export declare class SlashCommandSubCommandBuilder implements ToJSON {
    protected name: string;
    protected description: string;
    protected options: ToJSON[];
    toJSON(): {
        type: ApplicationCommandOptionType;
        name: string;
        description: string;
        options: import("discord-api-types/v8").APIApplicationCommandOption[];
    };
}
export interface SlashCommandSubCommandBuilder extends Shared__Options, Shared__NameAndDescription {
}
//# sourceMappingURL=SlashCommandSubCommands.d.ts.map