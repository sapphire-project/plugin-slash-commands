/// <reference types="node" />
import { Awaited, Command, PreconditionContainerReturn, PreconditionContext, Result, UserError } from '@sapphire/framework';
import type { SlashCommandInteraction } from '../interactions/commands/SlashCommandInteraction';
declare module '@sapphire/framework' {
    interface PreconditionContainerArray {
        slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): PreconditionContainerReturn;
    }
    interface PreconditionContainerSingle {
        slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): Awaited<Result<unknown, UserError>>;
    }
    interface IPreconditionContainer {
        slashCommandRun(interaction: SlashCommandInteraction, command: Command, context?: PreconditionContext): Awaited<Result<unknown, UserError>>;
    }
    interface IPreconditionCondition {
        /**
         * Runs the containers one by one.
         * @seealso {@link PreconditionRunMode.sequential}
         * @since 1.0.0
         * @param interaction The interaction that ran this precondition.
         * @param command The command the interaction invoked.
         * @param entries The containers to run.
         */
        slashCommandSequential(interaction: SlashCommandInteraction, command: Command, entries: readonly IPreconditionContainer[], context: PreconditionContext): PreconditionContainerReturn;
        /**
         * Runs all the containers using `Promise.all`, then checks the results once all tasks finished running.
         * @seealso {@link PreconditionRunMode.parallel}
         * @since 1.0.0
         * @param interaction The interaction that ran this precondition.
         * @param command The command the interaction invoked.
         * @param entries The containers to run.
         */
        slashCommandParallel(interaction: SlashCommandInteraction, command: Command, entries: readonly IPreconditionContainer[], context: PreconditionContext): PreconditionContainerReturn;
    }
}
//# sourceMappingURL=SlashCommandPreconditionContainerExtensions.d.ts.map