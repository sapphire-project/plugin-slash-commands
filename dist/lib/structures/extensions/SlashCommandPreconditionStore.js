"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendPreconditionStore = void 0;
const framework_1 = require("@sapphire/framework");
const Symbols_1 = require("../../utils/Symbols");
function extendPreconditionStore(store) {
    const originalConstructor = store.constructor;
    class SlashCommandPreconditionStore extends originalConstructor {
        async slashCommandRun(interaction, command, context = {}) {
            for (const precondition of this['globalPreconditions']) {
                const slashCommandHandler = Reflect.get(precondition, Symbols_1.SlashCommandPreconditionRun);
                if (!slashCommandHandler) {
                    throw new TypeError(`The precondition "${precondition.name}" does not have a slash command handler! Did you forget to add one via the "SlashCommandPreconditionRunFunction" symbol?`);
                }
                const result = await Reflect.apply(slashCommandHandler, precondition, [interaction, command, context]);
                if (!result.success)
                    return result;
            }
            return framework_1.ok();
        }
    }
    return new SlashCommandPreconditionStore();
}
exports.extendPreconditionStore = extendPreconditionStore;
//# sourceMappingURL=SlashCommandPreconditionStore.js.map