import type { Command } from '@sapphire/framework';
import type { APIApplicationCommandInteractionData } from 'discord-api-types/v8';
import type { SlashCommandContext, SlashCommandInteraction } from './SlashCommandInteraction';

export class SlashCommandArgs {
	/**
	 * The original interaction that triggered the command
	 */
	public readonly interaction: SlashCommandInteraction;

	/**
	 * The command that is being run
	 */
	public readonly command: Command;

	/**
	 * The context of the command being run
	 */
	public readonly context: SlashCommandContext;

	/**
	 * The internal data that is processed
	 */
	protected readonly rawData: Readonly<APIApplicationCommandInteractionData>;

	public constructor(
		interaction: SlashCommandInteraction,
		command: Command,
		context: SlashCommandContext,
		data: APIApplicationCommandInteractionData
	) {
		this.interaction = interaction;
		this.command = command;
		this.context = context;
		this.rawData = Object.freeze(data);
	}
}
