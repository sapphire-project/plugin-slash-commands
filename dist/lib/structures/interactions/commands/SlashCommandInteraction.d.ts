import type { APIApplicationCommandInteraction, APIApplicationCommandInteractionData, APIGuildInteraction, APIUser, InteractionType, Snowflake } from 'discord-api-types/v8';
import { Client, DMChannel, Guild, GuildMember, NewsChannel, TextChannel, User, WebhookClient } from 'discord.js';
export declare class SlashCommandInteraction {
    client: Client;
    /**
     * The ID of the interaction
     */
    readonly id: Snowflake;
    /**
     * The application ID this interaction is for
     */
    readonly applicationID: Snowflake;
    /**
     * The type of the interaction - will always be APPLICATION_COMMAND
     */
    readonly type: InteractionType;
    /**
     * The channel ID this interaction was sent in
     */
    readonly channelID: Snowflake;
    /**
     * A continuation token for this interaction
     *
     * This is used when creating the Followup Webhook client
     */
    readonly token: string;
    /**
     * The guild ID this interaction was sent in, if it was sent in a guild
     */
    readonly guildID: Snowflake | null;
    /**
     * The author of this interaction
     */
    readonly rawUser: APIUser;
    /**
     * The raw member that created this interaction, if the interaction was sent in a guild
     */
    readonly rawMember: APIGuildInteraction['member'] | null;
    /**
     * A webhook client that can be used for sending followup responses to the interaction
     *
     * Note: This client becomes invalid after **15 minutes**, due to the token expiry
     */
    readonly followupClient: WebhookClient;
    /**
     * The raw interaction data received with this interaction.
     *
     * `SlashCommandArgs` is constructed from this.
     */
    readonly rawInteractionData: Readonly<APIApplicationCommandInteractionData>;
    /**
     * The command being ran in this interaction
     */
    readonly commandData: SlashCommandData;
    constructor(client: Client, interaction: APIApplicationCommandInteraction);
    /**
     * Gets the user that created this interaction
     * @returns The user, if present
     */
    getUser(): User | null;
    /**
     * Gets the channel in which this interaction was created
     * @returns The channel, if present
     */
    getChannel(): DMChannel | TextChannel | NewsChannel | null;
    /**
     * Gets the guild in which this interaction was created
     * @returns The guild, if present
     */
    getGuild(): Guild | null;
    /**
     * Gets the member that created this interaction in the guild
     * @returns The member, if the interaction was created in a guild
     */
    getMember(): GuildMember | null;
}
export interface SlashCommandContext extends Record<PropertyKey, unknown> {
    rawData: APIApplicationCommandInteraction;
}
export interface SlashCommandData {
    /**
     * The ID of the slash command that was executed
     */
    id: Snowflake;
    /**
     * The name of the slash command that was executed
     */
    name: string;
}
//# sourceMappingURL=SlashCommandInteraction.d.ts.map