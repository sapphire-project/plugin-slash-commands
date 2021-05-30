import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v8';
import ow from 'ow';
import type { ToJSON } from './SlashCommand';

export function validateRequiredParameters(name: string, description: string, options: ToJSON[]) {
	// Assert name matches all conditions
	validateName(name);

	// Assert description conditions
	validateDescription(description);

	// Assert options conditions
	validateMaxOptionsLength(options);
}

export function validateName(name: string) {
	ow(
		name,
		'slash command name',
		ow.string.lowercase.alphabetical //
			.minLength(1)
			.maxLength(32)
	);
}

export function validateDescription(description: string) {
	ow(description, 'slash command description', ow.string.minLength(1).maxLength(100));
}

export function validateMaxOptionsLength(options: ToJSON[]) {
	ow(options, 'slash command options', ow.array.maxLength(25));
}

export function validateMaxChoicesLength(choices: APIApplicationCommandOptionChoice[]) {
	ow(choices, 'slash command choices', ow.array.maxLength(25));
}
