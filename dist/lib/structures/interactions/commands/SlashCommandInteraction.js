"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandInteraction = void 0;
const v8_1 = require("discord-api-types/utils/v8");
const discord_js_1 = require("discord.js");
// import { SlashCommandArgs } from './SlashCommandArgs';
class SlashCommandInteraction {
    constructor(client, interaction) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: client
        });
        /**
         * The ID of the interaction
         */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The application ID this interaction is for
         */
        Object.defineProperty(this, "applicationID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of the interaction - will always be APPLICATION_COMMAND
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The channel ID this interaction was sent in
         */
        Object.defineProperty(this, "channelID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * A continuation token for this interaction
         *
         * This is used when creating the Followup Webhook client
         */
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The guild ID this interaction was sent in, if it was sent in a guild
         */
        Object.defineProperty(this, "guildID", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The author of this interaction
         */
        Object.defineProperty(this, "rawUser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The raw member that created this interaction, if the interaction was sent in a guild
         */
        Object.defineProperty(this, "rawMember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * A webhook client that can be used for sending followup responses to the interaction
         *
         * Note: This client becomes invalid after **15 minutes**, due to the token expiry
         */
        Object.defineProperty(this, "followupClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The raw interaction data received with this interaction.
         *
         * `SlashCommandArgs` is constructed from this.
         */
        Object.defineProperty(this, "rawInteractionData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The command being ran in this interaction
         */
        Object.defineProperty(this, "commandData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = interaction.id;
        this.applicationID = interaction.application_id;
        this.type = interaction.type;
        this.rawInteractionData = Object.freeze(interaction.data);
        this.channelID = interaction.channel_id;
        this.token = interaction.token;
        this.guildID = v8_1.isApplicationCommandGuildInteraction(interaction) ? interaction.guild_id : null;
        this.rawUser = v8_1.isApplicationCommandGuildInteraction(interaction) ? interaction.member.user : interaction.user;
        this.rawMember = v8_1.isApplicationCommandGuildInteraction(interaction) ? interaction.member : null;
        this.followupClient = new discord_js_1.WebhookClient(interaction.application_id, interaction.token);
        this.commandData = { id: interaction.data.id, name: interaction.data.name };
    }
    /**
     * Gets the user that created this interaction
     * @returns The user, if present
     */
    getUser() {
        return this.client.users.add(this.rawUser, false);
    }
    /**
     * Gets the channel in which this interaction was created
     * @returns The channel, if present
     */
    getChannel() {
        var _a;
        return (_a = this.client.channels.cache.get(this.channelID)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Gets the guild in which this interaction was created
     * @returns The guild, if present
     */
    getGuild() {
        var _a;
        return (_a = this.client.guilds.cache.get(this.guildID)) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Gets the member that created this interaction in the guild
     * @returns The member, if the interaction was created in a guild
     */
    getMember() {
        var _a;
        const guild = this.getGuild();
        return (_a = guild === null || guild === void 0 ? void 0 : guild.members.add(this.rawMember, false, { id: this.rawUser.id, extras: [guild] })) !== null && _a !== void 0 ? _a : null;
    }
}
exports.SlashCommandInteraction = SlashCommandInteraction;
//# sourceMappingURL=SlashCommandInteraction.js.map