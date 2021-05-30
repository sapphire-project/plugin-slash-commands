import { isApplicationCommandGuildInteraction } from 'discord-api-types/utils/v8';
import type {
	APIApplicationCommandInteraction,
	APIApplicationCommandInteractionData,
	APIGuildInteraction,
	APIUser,
	InteractionType,
	Snowflake
} from 'discord-api-types/v8';
import { Client, DMChannel, Guild, GuildMember, NewsChannel, TextChannel, User, WebhookClient } from 'discord.js';
// import { SlashCommandArgs } from './SlashCommandArgs';

export class SlashCommandInteraction {
	/**
	 * The ID of the interaction
	 */
	public readonly id: Snowflake;

	/**
	 * The application ID this interaction is for
	 */
	public readonly applicationID: Snowflake;

	/**
	 * The type of the interaction - will always be APPLICATION_COMMAND
	 */
	public readonly type: InteractionType;

	/**
	 * The channel ID this interaction was sent in
	 */
	public readonly channelID: Snowflake;

	/**
	 * A continuation token for this interaction
	 *
	 * This is used when creating the Followup Webhook client
	 */
	public readonly token: string;

	/**
	 * The guild ID this interaction was sent in, if it was sent in a guild
	 */
	public readonly guildID: Snowflake | null;

	/**
	 * The author of this interaction
	 */
	public readonly rawUser: APIUser;

	/**
	 * The raw member that created this interaction, if the interaction was sent in a guild
	 */
	public readonly rawMember: APIGuildInteraction['member'] | null;

	/**
	 * A webhook client that can be used for sending followup responses to the interaction
	 *
	 * Note: This client becomes invalid after **15 minutes**, due to the token expiry
	 */
	public readonly followupClient: WebhookClient;

	/**
	 * The raw interaction data received with this interaction.
	 *
	 * `SlashCommandArgs` is constructed from this.
	 */
	public readonly rawInteractionData: Readonly<APIApplicationCommandInteractionData>;

	/**
	 * The command being ran in this interaction
	 */
	public readonly commandData: SlashCommandData;

	public constructor(public client: Client, interaction: APIApplicationCommandInteraction) {
		this.id = interaction.id;
		this.applicationID = interaction.application_id;
		this.type = interaction.type;
		this.rawInteractionData = Object.freeze(interaction.data);
		this.channelID = interaction.channel_id;
		this.token = interaction.token;
		this.guildID = isApplicationCommandGuildInteraction(interaction) ? interaction.guild_id : null;
		this.rawUser = isApplicationCommandGuildInteraction(interaction) ? interaction.member.user : interaction.user;
		this.rawMember = isApplicationCommandGuildInteraction(interaction) ? interaction.member : null;

		this.followupClient = new WebhookClient(interaction.application_id, interaction.token);

		this.commandData = { id: interaction.data.id, name: interaction.data.name };
	}

	/**
	 * Gets the user that created this interaction
	 * @returns The user, if present
	 */
	public getUser(): User | null {
		return this.client.users.add(this.rawUser, false);
	}

	/**
	 * Gets the channel in which this interaction was created
	 * @returns The channel, if present
	 */
	public getChannel(): DMChannel | TextChannel | NewsChannel | null {
		return (this.client.channels.cache.get(this.channelID) as DMChannel | TextChannel | NewsChannel) ?? null;
	}

	/**
	 * Gets the guild in which this interaction was created
	 * @returns The guild, if present
	 */
	public getGuild(): Guild | null {
		return this.client.guilds.cache.get(this.guildID!) ?? null;
	}

	/**
	 * Gets the member that created this interaction in the guild
	 * @returns The member, if the interaction was created in a guild
	 */
	public getMember(): GuildMember | null {
		const guild = this.getGuild();
		return guild?.members.add(this.rawMember, false, { id: this.rawUser.id, extras: [guild] }) ?? null;
	}
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
