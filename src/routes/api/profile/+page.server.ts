import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()


export const actions: Actions = {
	getProfile: async ({ request }) => {
		const form = await request.formData()
		const userId = form.get('userId')
		// console.log(userId)

		const user = await prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				username: true,
				email: true
			}
		})

		prisma.$disconnect()
		if (user) {
		console.log('user',user)
      return {
				user: user,
			}
		}
	}
}
 