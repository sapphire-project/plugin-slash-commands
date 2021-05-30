"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommand = void 0;
const tslib_1 = require("tslib");
const ts_mixer_1 = require("ts-mixer");
const Assertions_1 = require("./Assertions");
const SlashCommandOptions_1 = require("./SlashCommandOptions");
const SlashCommandSubCommands_1 = require("./SlashCommandSubCommands");
let SlashCommand = class SlashCommand {
    constructor() {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // #endregion
    }
    /**
     * Returns the final data that should be sent to Discord. You won't need this unless you're manually
     * creating slash commands via this builder.
     *
     * **Note:** Calling this getter will validate required properties based on their conditions.
     */
    toJSON() {
        Assertions_1.validateRequiredParameters(this.name, this.description, this.options);
        return {
            name: this.name,
            description: this.description,
            options: this.options.map((option) => option.toJSON())
        };
    }
    // #region Builder methods
    /**
     * Adds a new sub command group to this command
     * @param input A function that returns a sub command group builder, or an already built builder
     */
    addSubCommandGroup(input) {
        const { options } = this;
        // First, assert options conditions - we cannot have more than 25 options
        Assertions_1.validateMaxOptionsLength(options);
        // Make sure there is no sub command at the root level - if there is, throw
        const hasSubCommands = options.some((item) => item instanceof SlashCommandSubCommands_1.SlashCommandSubCommandBuilder);
        if (hasSubCommands)
            throw new RangeError(`You cannot mix sub commands and sub command groups at the root level.`);
        // Get the final result
        const result = typeof input === 'function' ? input(new SlashCommandSubCommands_1.SlashCommandSubCommandGroupBuilder()) : input;
        if (!(result instanceof SlashCommandSubCommands_1.SlashCommandSubCommandGroupBuilder))
            throw new TypeError(`Expected to receive a sub command group builder, got "${typeof result}" instead`);
        // Push it
        options.push(result);
        return this;
    }
    /**
     * Adds a new sub command to this command
     * @param input A function that returns a sub command builder, or an already built builder
     */
    addSubCommand(input) {
        const { options } = this;
        // First, assert options conditions - we cannot have more than 25 options
        Assertions_1.validateMaxOptionsLength(options);
        // Make sure there is no sub command at the root level - if there is, throw
        const hasSubCommands = options.some((item) => item instanceof SlashCommandSubCommands_1.SlashCommandSubCommandGroupBuilder);
        if (hasSubCommands)
            throw new RangeError(`You cannot mix sub commands and sub command groups at the root level.`);
        // Get the final result
        const result = typeof input === 'function' ? input(new SlashCommandSubCommands_1.SlashCommandSubCommandBuilder()) : input;
        if (!(result instanceof SlashCommandSubCommands_1.SlashCommandSubCommandBuilder))
            throw new TypeError(`Expected to receive a sub command builder, got "${typeof result}" instead`);
        // Push it
        options.push(result);
        return this;
    }
};
SlashCommand = tslib_1.__decorate([
    ts_mixer_1.mix(SlashCommandOptions_1.Shared__Options, SlashCommandOptions_1.Shared__NameAndDescription)
], SlashCommand);
exports.SlashCommand = SlashCommand;
//# sourceMappingURL=SlashCommand.js.map