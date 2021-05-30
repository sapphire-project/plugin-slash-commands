"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandPreconditionRun = exports.SlashCommandRun = exports.SlashCommandPreParse = exports.SlashCommandGuildOnly = exports.SlashCommandBuilder = void 0;
/**
 * Represents the function that is called when building a new slash command (or updates an existing one)
 *
 * @example
 * ```typescript
 * [SlashCommandBuilder]() {
 *    return new SlashCommand().setName(this.name).setDescription('Examples are hard, ok?');
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
exports.SlashCommandBuilder = Symbol('SlashCommands.Builder');
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
exports.SlashCommandGuildOnly = Symbol('SlashCommand.GuildOnly');
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
exports.SlashCommandPreParse = Symbol('SlashCommand.PreParse');
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
exports.SlashCommandRun = Symbol('SlashCommands.Run');
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
exports.SlashCommandPreconditionRun = Symbol('SlashCommands.PreconditionRun');
//# sourceMappingURL=Symbols.js.map