import { AsyncPreconditionResult, Command, PreconditionContext, PreconditionStore } from '@sapphire/framework';
import type { SlashCommandInteraction } from '../interactions/commands/SlashCommandInteraction';
export declare function extendPreconditionStore(store: PreconditionStore): PreconditionStore;
declare module '@sapphire/framework' {
    interface PreconditionStore {
        slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): AsyncPreconditionResult;
    }
}
//# sourceMappingURL=SlashCommandPreconditionStore.d.ts.map