"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandPlugin = void 0;
const framework_1 = require("@sapphire/framework");
const path_1 = require("path");
const index_1 = require("./index");
/**
 * @since 1.0.0
 */
class SlashCommandPlugin extends framework_1.Plugin {
    static [framework_1.postInitialization]() {
        // Register our own events
        this.stores.get('events').registerPath(path_1.join(__dirname, 'events'));
        // Extend the precondition store, to get slash command support
        const originalPreconditionStore = this.stores.get('preconditions');
        const extendedStore = index_1.extendPreconditionStore(originalPreconditionStore);
        for (const path of originalPreconditionStore.paths)
            extendedStore.registerPath(path);
        this.stores.register(extendedStore);
    }
}
exports.SlashCommandPlugin = SlashCommandPlugin;
framework_1.SapphireClient.plugins.registerPostInitializationHook(SlashCommandPlugin[framework_1.postInitialization], 'SlashCommands.PostInitialization');
//# sourceMappingURL=register-discordjs.js.map