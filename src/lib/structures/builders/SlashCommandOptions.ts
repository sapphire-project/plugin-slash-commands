import { APIApplicationCommandOptionChoice, ApplicationCommandOptionType } from 'discord-api-types/v8';
import ow from 'ow';
import { validateDescription, validateMaxChoicesLength, validateMaxOptionsLength, validateName } from './Assertions';
import type { ToJSON } from './SlashCommand';

// #region Mixins

export class Shared__Options {
	protected options!: ToJSON[];

	/**
	 * Adds a boolean option
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addBooleanOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)) {
		return this.__sharedOptionMethod(input, ApplicationCommandOptionType.BOOLEAN);
	}

	/**
	 * Adds a user option
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addUserOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)) {
		return this.__sharedOptionMethod(input, ApplicationCommandOptionType.USER);
	}

	/**
	 * Adds a channel option
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addChannelOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)) {
		return this.__sharedOptionMethod(input, ApplicationCommandOptionType.CHANNEL);
	}

	/**
	 * Adds a role option
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addRoleOption(input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase)) {
		return this.__sharedOptionMethod(input, ApplicationCommandOptionType.ROLE);
	}

	/**
	 * Adds a string option
	 * @param input A function that returns an option builder, or an already built builder
	 */
	public addStringOption(input: SlashCommandStringOption | ((builder: SlashCommandStringOption) => SlashCommandStringOption)) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandStringOption(ApplicationCommandOptionType.STRING)) : input;

		if (!(result instanceof SlashCommandStringOption))
			throw new TypeError(`Expected to receive a string option builder, got "${typeof result}" instead`);

		// Push it
		options.push(result);

		return this;
	}

	public addIntegerOption(input: SlashCommandIntegerOption | ((builder: SlashCommandIntegerOption) => SlashCommandIntegerOption)) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandIntegerOption(ApplicationCommandOptionType.INTEGER)) : input;

		if (!(result instanceof SlashCommandIntegerOption))
			throw new TypeError(`Expected to receive an integer option builder, got "${typeof result}" instead`);

		// Push it
		options.push(result);

		return this;
	}

	private __sharedOptionMethod(
		input: SlashCommandOptionBase | ((builder: SlashCommandOptionBase) => SlashCommandOptionBase),
		type: ApplicationCommandOptionType
	) {
		const { options } = this;

		// First, assert options conditions - we cannot have more than 25 options
		validateMaxOptionsLength(options);

		// Get the final result
		const result = typeof input === 'function' ? input(new SlashCommandOptionBase(type)) : input;

		if (!(result instanceof SlashCommandOptionBase)) throw new TypeError(`Expected to receive an option builder, got "${typeof result}" instead`);

		// Push it
		options.push(result);

		return this;
	}
}

export class Shared__NameAndDescription {
	protected name!: string;
	protected description!: string;

	/**
	 * Sets the name
	 * @param name The name
	 */
	public setName(name: string) {
		// Assert the name matches the conditions
		validateName(name);

		this.name = name;

		return this;
	}

	/**
	 * Sets the description
	 * @param description The description
	 */
	public setDescription(description: string) {
		// Assert the description matches the conditions
		validateDescription(description);

		this.description = description;

		return this;
	}
}

// #endregion

// #region Basic options

export class SlashCommandOptionBase extends Shared__NameAndDescription implements ToJSON {
	protected required = false;

	public constructor(protected type: ApplicationCommandOptionType) {
		super();
	}

	/**
	 * Marks the option as required
	 * @param required If this option should be required
	 */
	public setRequired(required: boolean) {
		// Assert that you actually passed a boolean
		ow(required, 'required', ow.boolean);

		this.required = required;

		return this;
	}

	public toJSON() {
		return {
			type: this.type,
			name: this.name,
			description: this.description,
			required: this.required
		};
	}
}

// #endregion

// #region Options with choices

abstract class ApplicationCommandOptionWithChoicesBase<T extends string | number> extends SlashCommandOptionBase implements ToJSON {
	protected abstract type: ApplicationCommandOptionType.STRING | ApplicationCommandOptionType.INTEGER;
	protected choices?: APIApplicationCommandOptionChoice[];

	/**
	 * Adds a choice for this option
	 * @param name The name of the choice
	 * @param value The value of the choice
	 */
	public addChoice(name: string, value: T) {
		if (typeof this.choices === 'undefined') this.choices = [];

		validateMaxChoicesLength(this.choices);

		// Validate name
		ow(name, 'choice name', ow.string.minLength(1).maxLength(100));

		// Validate the value
		if (this.type === ApplicationCommandOptionType.STRING) ow(value, 'choice value', ow.string.maxLength(100));
		else ow(value, 'choice value', ow.number.finite);

		this.choices.push({ name, value });

		return this;
	}

	/**
	 * Adds multiple choices for this option
	 * @param choices The choices array
	 */
	public addChoices(choices: Record<string, T> | [name: string, value: T][]) {
		const finalOptions = Array.isArray(choices) ? choices : Object.entries(choices);

		for (const [name, value] of finalOptions) this.addChoice(name, value);

		return this;
	}

	public toJSON() {
		return {
			...super.toJSON(),
			choices: this.choices
		};
	}
}

export class SlashCommandStringOption extends ApplicationCommandOptionWithChoicesBase<string> {
	protected type = ApplicationCommandOptionType.STRING as const;
}

export class SlashCommandIntegerOption extends ApplicationCommandOptionWithChoicesBase<number> {
	protected type = ApplicationCommandOptionType.INTEGER as const;
}

// #endregion
