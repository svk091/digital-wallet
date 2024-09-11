import CredentailsProvider from "next-auth/providers/credentials"
import prisma from "@repo/db/client"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentailsProvider({
      name: 'credentials',
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          required: true
        },
        password: {
          label: "Password",
          type: "password",
          required: true
        }
      },
      async authorize(credentials: any) {
        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone
            }
          })
          if (existingUser) {
            const validatePassword = await bcrypt.compare(credentials.password, existingUser.password);
            if (validatePassword) {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email
              }
            }
            return null
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
            }
          })

          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number
          }

        } catch (error) {
          console.log(error);
        }
        return null
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    }
  }
}