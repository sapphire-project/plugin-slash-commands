import type { Command } from '@sapphire/framework';
import type { APIApplicationCommandInteractionData } from 'discord-api-types/v8';
import type { SlashCommandContext, SlashCommandInteraction } from './SlashCommandInteraction';
export declare class SlashCommandArgs {
    /**
     * The original interaction that triggered the command
     */
    readonly interaction: SlashCommandInteraction;
    /**
     * The command that is being run
     */
    readonly command: Command;
    /**
     * The context of the command being run
     */
    readonly context: SlashCommandContext;
    /**
     * The internal data that is processed
     */
    protected readonly rawData: Readonly<APIApplicationCommandInteractionData>;
    constructor(interaction: SlashCommandInteraction, command: Command, context: SlashCommandContext, data: APIApplicationCommandInteractionData);
}
//# sourceMappingURL=SlashCommandArgs.d.ts.map