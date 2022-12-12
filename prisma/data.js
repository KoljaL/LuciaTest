import { Prisma } from '@prisma/client'

const users = [
	{
		username: 'Peter',
		email: 'peter@peter.com'
	},
	{
		username: 'Petra',
		email: 'petra@petra.com'
	}
]

const tags = [
	{
		name: 'Horse',
		slug: 'horse',
		description: 'a nice animal',
		count: 0
	},
	{
		name: 'Dog',
		slug: 'dog',
		description: 'are cute',
		count: 0
	}
]

export { users, tags }
