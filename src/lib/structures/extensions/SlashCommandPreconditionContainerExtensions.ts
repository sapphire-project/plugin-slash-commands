// Truly hate having to do this, but we must go deeper!
// For the love of all that is holy try to avoid having to do this.
// I mean it.

import {
	Awaited,
	Command,
	Err,
	IPreconditionContainer,
	isErr,
	isOk,
	ok,
	PreconditionContainerArray,
	PreconditionContainerReturn,
	PreconditionContainerSingle,
	PreconditionContext,
	PreconditionRunCondition,
	PreconditionRunMode,
	Result,
	Store,
	UserError
} from '@sapphire/framework';
import { ISlashCommandPreconditionRun, SlashCommandPreconditionRun } from '../../utils/Symbols';
import type { SlashCommandInteraction } from '../interactions/commands/SlashCommandInteraction';

// Extend `Command#preconditions` to have slash command support
PreconditionContainerArray.prototype.slashCommandRun = function slashCommandRun(
	this: PreconditionContainerArray,
	interaction: SlashCommandInteraction,
	command: Command,
	context: PreconditionContext = {}
) {
	return this.mode === PreconditionRunMode.Sequential
		? this.condition.slashCommandSequential(interaction, command, this.entries, context)
		: this.condition.slashCommandParallel(interaction, command, this.entries, context);
};

// Extend `PreconditionContainerSingle` to support slash commands
PreconditionContainerSingle.prototype.slashCommandRun = function slashCommandRun(
	this: PreconditionContainerSingle,
	interaction: SlashCommandInteraction,
	command: Command,
	context: PreconditionContext = {}
) {
	const precondition = Store.injectedContext.stores.get('preconditions').get(this.name);
	if (precondition) {
		const slashCommandHandler = Reflect.get(precondition, SlashCommandPreconditionRun) as ISlashCommandPreconditionRun | null;

		if (!slashCommandHandler) {
			throw new TypeError(
				`The precondition "${this.name}" does not have a slash command handler! Did you forget to add one via the "SlashCommandPreconditionRunFunction" symbol?`
			);
		}

		return Reflect.apply(slashCommandHandler, precondition, [interaction, command, { ...context, ...this.context }]);
	}
	throw new Error(`The precondition "${this.name}" is not available.`);
};

// Extend the `PreconditionRunCondition` conditions to support slash commands
const { conditions } = PreconditionContainerArray;

// Extend `And` condition
const originalAnd = conditions.get(PreconditionRunCondition.And)!;
conditions.set(PreconditionRunCondition.And, {
	...originalAnd,
	async slashCommandSequential(
		interaction: SlashCommandInteraction,
		command: Command,
		entries: IPreconditionContainer[],
		context: PreconditionContext
	) {
		for (const child of entries) {
			const result = await child.slashCommandRun(interaction, command, context);
			if (isErr(result)) return result;
		}

		return ok();
	},
	async slashCommandParallel(
		interaction: SlashCommandInteraction,
		command: Command,
		entries: IPreconditionContainer[],
		context: PreconditionContext
	) {
		const results = await Promise.all(entries.map((entry) => entry.slashCommandRun(interaction, command, context)));

		return results.find(isErr) ?? ok();
	}
});

// Extend `Or` condition
const originalOr = conditions.get(PreconditionRunCondition.Or)!;
conditions.set(PreconditionRunCondition.Or, {
	...originalOr,
	async slashCommandSequential(
		interaction: SlashCommandInteraction,
		command: Command,
		entries: IPreconditionContainer[],
		context: PreconditionContext
	) {
		let error: Err<UserError> | null = null;
		for (const child of entries) {
			const result = await child.slashCommandRun(interaction, command, context);
			if (isOk(result)) return result;

			error = result;
		}

		return error ?? ok();
	},
	async slashCommandParallel(
		interaction: SlashCommandInteraction,
		command: Command,
		entries: IPreconditionContainer[],
		context: PreconditionContext
	) {
		const results = await Promise.all(entries.map((entry) => entry.slashCommandRun(interaction, command, context)));

		let error: Err<UserError> | null = null;
		for (const result of results) {
			if (isOk(result)) return result;

			error = result;
		}

		return error ?? ok();
	}
});

// Tough luck for custom conditions, you'll have to extend them yourself

declare module '@sapphire/framework' {
	export interface PreconditionContainerArray {
		slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): PreconditionContainerReturn;
	}

	export interface PreconditionContainerSingle {
		slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): Awaited<Result<unknown, UserError>>;
	}

	export interface IPreconditionContainer {
		slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): Awaited<Result<unknown, UserError>>;
	}

	export interface IPreconditionCondition {
		/**
		 * Runs the containers one by one.
		 * @seealso [[PreconditionRunMode.sequential]]
		 * @since 1.0.0
		 * @param interaction The interaction that ran this precondition.
		 * @param command The command the interaction invoked.
		 * @param entries The containers to run.
		 */
		slashCommandSequential(
			interaction: SlashCommandInteraction,
			command: Command,
			entries: readonly IPreconditionContainer[],
			context: PreconditionContext
		): PreconditionContainerReturn;
		/**
		 * Runs all the containers using `Promise.all`, then checks the results once all tasks finished running.
		 * @seealso [[PreconditionRunMode.parallel]]
		 * @since 1.0.0
		 * @param interaction The interaction that ran this precondition.
		 * @param command The command the interaction invoked.
		 * @param entries The containers to run.
		 */
		slashCommandParallel(
			interaction: SlashCommandInteraction,
			command: Command,
			entries: readonly IPreconditionContainer[],
			context: PreconditionContext
		): PreconditionContainerReturn;
	}
}
