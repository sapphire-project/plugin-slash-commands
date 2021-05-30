"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandArgs = void 0;
class SlashCommandArgs {
    constructor(interaction, command, context, data) {
        /**
         * The original interaction that triggered the command
         */
        Object.defineProperty(this, "interaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The command that is being run
         */
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The context of the command being run
         */
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The internal data that is processed
         */
        Object.defineProperty(this, "rawData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.interaction = interaction;
        this.command = command;
        this.context = context;
        this.rawData = Object.freeze(data);
    }
}
exports.SlashCommandArgs = SlashCommandArgs;
//# sourceMappingURL=SlashCommandArgs.js.map