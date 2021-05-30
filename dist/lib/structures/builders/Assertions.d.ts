import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v8';
import type { ToJSON } from './SlashCommand';
export declare function validateRequiredParameters(name: string, description: string, options: ToJSON[]): void;
export declare function validateName(name: string): void;
export declare function validateDescription(description: string): void;
export declare function validateMaxOptionsLength(options: ToJSON[]): void;
export declare function validateMaxChoicesLength(choices: APIApplicationCommandOptionChoice[]): void;
//# sourceMappingURL=Assertions.d.ts.map