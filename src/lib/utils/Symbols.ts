import type { Awaited, Command, Precondition } from '@sapphire/framework';
import type { APIInteraction, RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v8';
import type { SlashCommand } from '../structures/builders/SlashCommand';
import type { SlashCommandArgs } from '../structures/interactions/commands/SlashCommandArgs';
import type { SlashCommandContext, SlashCommandInteraction } from '../structures/interactions/commands/SlashCommandInteraction';

/**
 * Represents the function that is called when building a new slash command (or updates an existing one)
 *
 * @example
 * ```typescript
 * [SlashCommandBuilder]() {
 *    return new SlashCommandBuilder().setName(this.name).setDescription('Examples are hard, ok?');
 * }
 * ```
 *
 * @example
 * ```typescript
 * [SlashCommandBuilder]() {
 *    return {
 * 		  name: 'raw',
 * 		  description: 'You can use this too!'
 *    };
 * }
 * ```
 */
export const SlashCommandBuilder = Symbol('SlashCommands.Builder');

/**
 * Represents the function that builds a new slash command (or updates an existing one)
 *
 * If you'd prefer, you may return the raw API data instead (however, the builder is preferred)
 *
 * @example
 * ```typescript
 * [SlashCommandBuilder]() {
 *    return new SlashCommandBuilder().setName(this.name).setDescription('Examples are hard, ok?');
 * }
 * ```
 *
 * @example
 * ```typescript
 * [SlashCommandBuilder]() {
 *    return {
 * 		  name: 'raw',
 * 		  description: 'You can use this too!'
 *    };
 * }
 * ```
 */
export interface ISlashCommandBuilder {
	(): Awaited<SlashCommand | RESTPostAPIApplicationCommandsJSONBody>;
}

/**
 * Represents the function that is called when a slash command should be limited to some guild IDs
 *
 * @example
 * ```typescript
 * [SlashCommandGuildOnly]() {
 *    return ['737141877803057244'];
 * }
 * ```
 */
export const SlashCommandGuildOnly = Symbol('SlashCommand.GuildOnly');

/**
 * Represents the function that is called when a slash command should be limited to some guild ids
 *
 * @example
 * ```typescript
 * [SlashCommandGuildOnly]() {
 *    return ['737141877803057244'];
 * }
 * ```
 */
export interface ISlashCommandGuildOnly {
	(): Awaited<string[]>;
}

/**
 * Represents the function that is called before a slash command gets ran, similar to Command#preParse
 *
 * @example
 * ```typescript
 * [SlashCommandPreParse](interaction: SlashCommandInteraction, rawData: APIInteraction, context: SlashCommandContext) {
 *    return new SlashCommandArgs(interaction, this, rawData, context);
 * }
 * ```
 */
export const SlashCommandPreParse = Symbol('SlashCommand.PreParse');

/**
 * Represents the function that is called before a slash command gets ran, similar to Command#preParse
 *
 * @example
 * ```typescript
 * [SlashCommandPreParse](interaction: SlashCommandInteraction, rawData: APIInteraction, context: SlashCommandContext) {
 *    return new SlashCommandArgs(interaction, this, rawData, context);
 * }
 * ```
 */
export interface ISlashCommandPreParse {
	(interaction: SlashCommandInteraction, rawData: APIInteraction, context: SlashCommandContext): Awaited<SlashCommandArgs>;
}

/**
 * Represents the function that is called when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandRun](interaction: SlashCommandInteraction) {
 * 	  return interaction.reply('Hello from slash commands!', { ephemeral: true });
 * }
 * ```
 */
export const SlashCommandRun = Symbol('SlashCommands.Run');

/**
 * Represents the function that is called when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandRun](interaction: SlashCommandInteraction) {
 * 	  return interaction.reply('Hello from slash commands!', { ephemeral: true });
 * }
 * ```
 */
export interface ISlashCommandRun {
	(interaction: SlashCommandInteraction, args: SlashCommandArgs, context: SlashCommandContext): Awaited<unknown>;
}

// Preconditions

/**
 * Represents the function that is called in a precondition when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandPreconditionRun](interaction: SlashCommandInteraction, command: Command) {
 *    return interaction.author.id === '139836912335716352' ? this.ok() : this.error('No');
 * }
 * ```
 */
export const SlashCommandPreconditionRun = Symbol('SlashCommands.PreconditionRun');

/**
 * Represents the function that is called in a precondition when a slash command interaction is received
 *
 * @example
 * ```typescript
 * [SlashCommandPreconditionRun](interaction: SlashCommandInteraction, command: Command) {
 *    return interaction.author.id === '139836912335716352' ? this.ok() : this.error('No');
 * }
 * ```
 */
export interface ISlashCommandPreconditionRun {
	(interaction: SlashCommandInteraction, command: Command, context: Precondition.Context): Precondition.Result;
}
