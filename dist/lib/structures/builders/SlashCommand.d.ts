import type { APIApplicationCommandOption } from 'discord-api-types/v8';
import { Shared__NameAndDescription, Shared__Options } from './SlashCommandOptions';
import { SlashCommandSubCommandBuilder, SlashCommandSubCommandGroupBuilder } from './SlashCommandSubCommands';
export declare class SlashCommand {
    protected name: string;
    protected description: string;
    protected options: ToJSON[];
    /**
     * Returns the final data that should be sent to Discord. You won't need this unless you're manually
     * creating slash commands via this builder.
     *
     * **Note:** Calling this getter will validate required properties based on their conditions.
     */
    toJSON(): {
        name: string;
        description: string;
        options: APIApplicationCommandOption[];
    };
    /**
     * Adds a new sub command group to this command
     * @param input A function that returns a sub command group builder, or an already built builder
     */
    addSubCommandGroup(input: SlashCommandSubCommandGroupBuilder | ((subCommandGroup: SlashCommandSubCommandGroupBuilder) => SlashCommandSubCommandGroupBuilder)): this;
    /**
     * Adds a new sub command to this command
     * @param input A function that returns a sub command builder, or an already built builder
     */
    addSubCommand(input: SlashCommandSubCommandBuilder | ((subCommandGroup: SlashCommandSubCommandBuilder) => SlashCommandSubCommandBuilder)): this;
}
export interface SlashCommand extends Shared__NameAndDescription, Shared__Options {
}
export interface ToJSON {
    toJSON(): APIApplicationCommandOption;
}
//# sourceMappingURL=SlashCommand.d.ts.map