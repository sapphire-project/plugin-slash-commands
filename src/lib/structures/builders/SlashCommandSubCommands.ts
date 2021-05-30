import { ApplicationCommandOptionType } from 'discord-api-types/v8';
import { mix } from 'ts-mixer';
import { validateMaxOptionsLength, validateRequiredParameters } from './Assertions';
import type { ToJSON } from './SlashCommand';
import { Shared__NameAndDescription, Shared__Options } from './SlashCommandOptions';

/**
 * Represents a folder for sub commands
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
export class SlashCommandSubCommandGroupBuilder extends Shared__NameAndDescription implements ToJSON {
	private options: ToJSON[] = [];

	/**
	 * Adds a new sub command to this group
	 * @param input A function that returns a sub command builder, or an already built builder
	 */
	public addSubCommand(input: SlashCommandSubCommandBuilder | ((subCommandGroup: SlashCommandSubCommandBuilder) => SlashCommandSubCommandBuilder)) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandSubCommandBuilder()) : input;

		// Push it
		options.push(result);

		return this;
	}

	public toJSON() {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.SUB_COMMAND_GROUP,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON())
		};
	}
}

/**
 * Represents a sub command
 *
 * For more information, go to https://discord.com/developers/docs/interactions/slash-commands#subcommands-and-subcommand-groups
 */
@mix(Shared__Options, Shared__NameAndDescription)
export class SlashCommandSubCommandBuilder implements ToJSON {
	protected name: string = undefined!;

	protected description: string = undefined!;
	protected options: ToJSON[] = [];

	public toJSON() {
		validateRequiredParameters(this.name, this.description, this.options);
		return {
			type: ApplicationCommandOptionType.SUB_COMMAND,
			name: this.name,
			description: this.description,
			options: this.options.map((option) => option.toJSON())
		};
	}
}

export interface SlashCommandSubCommandBuilder extends Shared__Options, Shared__NameAndDescription {}
