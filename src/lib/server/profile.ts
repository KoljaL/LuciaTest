
import db from "$lib/server/db"

export async function getProfile() {
    let user = await db.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
        }
    })
    db.$disconnect();
    console.log('user')
    return {
      user
    }
}