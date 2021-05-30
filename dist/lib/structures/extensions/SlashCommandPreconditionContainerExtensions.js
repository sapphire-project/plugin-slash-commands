"use strict";
// Truly hate having to do this, but we must go deeper!
// For the love of all that is holy try to avoid having to do this.
// I mean it.
Object.defineProperty(exports, "__esModule", { value: true });
const framework_1 = require("@sapphire/framework");
const Symbols_1 = require("../../utils/Symbols");
// Extend `Command#preconditions` to have slash command support
framework_1.PreconditionContainerArray.prototype.slashCommandRun = function slashCommandRun(interaction, command, context = {}) {
    return this.mode === 0 /* Sequential */
        ? this.condition.slashCommandSequential(interaction, command, this.entries, context)
        : this.condition.slashCommandParallel(interaction, command, this.entries, context);
};
// Extend `PreconditionContainerSingle` to support slash commands
framework_1.PreconditionContainerSingle.prototype.slashCommandRun = function slashCommandRun(interaction, command, context = {}) {
    const precondition = framework_1.Store.injectedContext.stores.get('preconditions').get(this.name);
    if (precondition) {
        const slashCommandHandler = Reflect.get(precondition, Symbols_1.SlashCommandPreconditionRun);
        if (!slashCommandHandler) {
            throw new TypeError(`The precondition "${this.name}" does not have a slash command handler! Did you forget to add one via the "SlashCommandPreconditionRunFunction" symbol?`);
        }
        return Reflect.apply(slashCommandHandler, precondition, [interaction, command, { ...context, ...this.context }]);
    }
    throw new Error(`The precondition "${this.name}" is not available.`);
};
// Extend the `PreconditionRunCondition` conditions to support slash commands
const { conditions } = framework_1.PreconditionContainerArray;
// Extend `And` condition
const originalAnd = conditions.get(framework_1.PreconditionRunCondition.And);
conditions.set(framework_1.PreconditionRunCondition.And, {
    ...originalAnd,
    async slashCommandSequential(interaction, command, entries, context) {
        for (const child of entries) {
            const result = await child.slashCommandRun(interaction, command, context);
            if (framework_1.isErr(result))
                return result;
        }
        return framework_1.ok();
    },
    async slashCommandParallel(interaction, command, entries, context) {
        var _a;
        const results = await Promise.all(entries.map((entry) => entry.slashCommandRun(interaction, command, context)));
        return (_a = results.find(framework_1.isErr)) !== null && _a !== void 0 ? _a : framework_1.ok();
    }
});
// Extend `Or` condition
const originalOr = conditions.get(framework_1.PreconditionRunCondition.Or);
conditions.set(framework_1.PreconditionRunCondition.Or, {
    ...originalOr,
    async slashCommandSequential(interaction, command, entries, context) {
        let error = null;
        for (const child of entries) {
            const result = await child.slashCommandRun(interaction, command, context);
            if (framework_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : framework_1.ok();
    },
    async slashCommandParallel(interaction, command, entries, context) {
        const results = await Promise.all(entries.map((entry) => entry.slashCommandRun(interaction, command, context)));
        let error = null;
        for (const result of results) {
            if (framework_1.isOk(result))
                return result;
            error = result;
        }
        return error !== null && error !== void 0 ? error : framework_1.ok();
    }
});
//# sourceMappingURL=SlashCommandPreconditionContainerExtensions.js.map