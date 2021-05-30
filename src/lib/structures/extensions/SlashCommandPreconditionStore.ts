import { AsyncPreconditionResult, Command, ok, Precondition, PreconditionContext, PreconditionStore, Result, UserError } from '@sapphire/framework';
import { ISlashCommandPreconditionRun, SlashCommandPreconditionRun } from '../../utils/Symbols';
import type { SlashCommandInteraction } from '../interactions/commands/SlashCommandInteraction';

export function extendPreconditionStore(store: PreconditionStore) {
	const originalConstructor = store.constructor as typeof PreconditionStore;

	class SlashCommandPreconditionStore extends originalConstructor {
		public async slashCommandRun(interaction: SlashCommandInteraction, command: Command, context: PreconditionContext = {}) {
			for (const precondition of this['globalPreconditions'] as Precondition[]) {
				const slashCommandHandler = Reflect.get(precondition, SlashCommandPreconditionRun) as ISlashCommandPreconditionRun | undefined;

				if (!slashCommandHandler) {
					throw new TypeError(
						`The precondition "${precondition.name}" does not have a slash command handler! Did you forget to add one via the "SlashCommandPreconditionRunFunction" symbol?`
					);
				}

				const result: Result<unknown, UserError> = await Reflect.apply(slashCommandHandler, precondition, [interaction, command, context]);

				if (!result.success) return result;
			}

			return ok();
		}
	}

	return new SlashCommandPreconditionStore() as PreconditionStore;
}

declare module '@sapphire/framework' {
	export interface PreconditionStore {
		slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): AsyncPreconditionResult;
	}
}
