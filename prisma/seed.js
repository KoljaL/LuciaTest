import { PrismaClient } from '@prisma/client'
import { users, tags } from './data.js'
const prisma = new PrismaClient()

const load = async () => {
	try {
		console.log('Deleted old tables')
		await prisma.user.deleteMany()
		await prisma.session.deleteMany()
		await prisma.tag.deleteMany()

		// await prisma.$queryRaw`ALTER TABLE Tag AUTO_INCREMENT = 1`
		// const result = await prisma.$queryRaw`SELECT * FROM User`
		// console.log(result)

		// await prisma.$queryRaw`ALTER TABLE session AUTO_INCREMENT = 1`
		// console.log('reset Session auto increment to 1')

		// await prisma.User.createMany({
		// 	data: user
		// })
		// console.log('Added user data')

		// await prisma.Tag.createMany({
		// 	data: Tag
		// })
		// console.log('Added Tag data')

		// users.forEach(async user => {
		// 	await prisma.user.create({
		// 		data: {
		// 			username: user.username,
		// 			email: user.email
		// 		}
		// 	})
		// 	console.log(`user ${user.categoryName} created!~`)
		// })

		await prisma.user.create({
			data: {
				username: 'test',
				hashed_password: 'test',
				provider_id: 'name'
			}
		})

		tags.forEach(async tag => {
			await prisma.tag.create({
				data: tag
			})
			console.log(`Tag ${tag.name} created!`)
		})
	} catch (e) {
		console.error(e)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

load()
