<div align="center">

<!-- ![Sapphire Logo](https://cdn.skyra.pw/gh-assets/sapphire.png) -->

# @sapphire/interactions

**Simple plugin for adding Slash Command support in your existing bot.**

[![GitHub](https://img.shields.io/github/license/sapphire/interactions)](https://github.com/sapphire/interactions/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/sapphiredev/interactions/branch/main/graph/badge.svg?token=pAvXhtqMu8)](https://codecov.io/gh/sapphiredev/interactions)
[![npm](https://img.shields.io/npm/v/@sapphire/interactions?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/interactions)
[![Depfu](https://badges.depfu.com/badges/b7a32a808429b51ac55624f31f8a698d/overview.svg)](https://depfu.com/github/sapphiredev/interactions?project_id=23003)

</div>

## Features

-   Create slash commands with ease
-   Implement slash command support in your existing code base
-   Support for the [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) library
-   _Other things Vlad just doesn't know what/why to list cuz this is literally the basic jist_

## Installation

```bash
yarn add -D @sapphire/interactions
```

## Usage

_First, register the plugin_

> Note that at this time, we only support discord.js directly! You may use the classes directly if you want to.

```typescript
import '@sapphire/interactions/register-discordjs';
```

_Usage with TypeScript_

```typescript
import {
	SlashCommandBuilderFunction,
	SlashCommandBuilder,
	SlashCommandRunFunction,
	SlashCommandInteraction,
	SlashCommandArgs
} from '@sapphire/interactions';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserCommand extends Command {
	public [SlashCommandBuilderFunction]() {
		return new SlashCommandBuilder().setName(this.name).setDescription('Examples are pretty hard, cut me slack!');
	}

	public [SlashCommandRunFunction](interaction: SlashCommandInteraction, args: SlashCommandArgs) {
		return interaction.reply('Hello from slash commands!', { ephemeral: true });
	}

	public run(message: Message, args: Args) {
		return message.reply('Hello from normal commands!');
	}
}
```

_Usage with JavaScript_

```javascript
const { SlashCommandBuilderFunction, SlashCommandBuilder, SlashCommandRunFunction } = require('@sapphire/interactions');
const { Args, Command } = require('@sapphire/framework');

exports.UserCommand = class extends Command {
	[SlashCommandBuilderFunction]() {
		return new SlashCommandBuilder().setName(this.name).setDescription('Examples are pretty hard, cut me slack!');
	}

	[SlashCommandRunFunction](interaction, args) {
		return interaction.reply('Hello from slash commands!', { ephemeral: true });
	}

	run(message, args) {
		return message.reply('Hello from normal commands!');
	}
};
```

## API Documentation

For the full API documentation please refer to the TypeDoc generated [documentation](https://sapphiredev.github.io/interactions).

## Buy us some doughnuts

Sapphire Project is and always will be open source, even if we don't get donations. That being said, we know there are amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Ko-fi, PayPal, Patreon and GitHub Sponsorships. You can use the buttons below to donate through your method of choice.

| Donate With |                     Address                      |
| :---------: | :----------------------------------------------: |
|    Ko-fi    |   [Click Here](https://ko-fi.com/wolfgalvlad)    |
|   Patreon   | [Click Here](https://www.patreon.com/vladfrangu) |
|   PayPal    |    [Click Here](https://paypal.me/franguvlad)    |

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
