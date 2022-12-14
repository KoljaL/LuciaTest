import { fail, type Actions } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const actions: Actions = {
	signin: async ({ request, locals }) => {
		console.log('\n\n SIGN IN \n\n')

		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		try {
			const user = await auth.authenticateUser('username', username, password);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
			console.log('\n\npage.server Session\n\n',session)
		} catch (e) {
			
			// catch error
			const error = e as Error;

			// incorrect username or password
			if (error.message === 'AUTH_INVALID_PROVIDER_ID' ||error.message === 'AUTH_INVALID_PASSWORD') {
				return fail(400, {
					message: 'Incorrect username or password.'
				});
			}

			// database connection error
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	},

	signup: async ({ request, locals }) => {
		console.log('\n\n SIGN UP \n\n')
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const email = form.get('email');
		console.log('username',username)
		console.log('password',password)
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
		}
		try {
			const user = await auth.createUser('username', username, {
				password,
				attributes: {
					username,
					email
				}
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (e) {
			const error = e as Error;
			if (error.message === 'AUTH_DUPLICATE_PROVIDER_ID') {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}


};