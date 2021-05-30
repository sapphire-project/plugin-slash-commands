import { Plugin, postInitialization, SapphireClient } from '@sapphire/framework';
import { join } from 'path';
import { extendPreconditionStore } from './index';

/**
 * @since 1.0.0
 */
export class InteractionsPlugin extends Plugin {
	public static [postInitialization](this: SapphireClient) {
		// Register our own events
		this.stores.get('events').registerPath(join(__dirname, 'events'));

		// Extend the precondition store, to get slash command support
		const originalPreconditionStore = this.stores.get('preconditions');
		const extendedStore = extendPreconditionStore(originalPreconditionStore);

		for (const path of originalPreconditionStore.paths) extendedStore.registerPath(path);

		this.stores.register(extendedStore);
	}
}

SapphireClient.plugins.registerPostInitializationHook(InteractionsPlugin[postInitialization], 'Interactions.PostInitialization');
