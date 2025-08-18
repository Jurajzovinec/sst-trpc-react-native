import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	idp_id: text('idp_id'),
	first_name: text('first_name'),
	last_name: text('last_name'),
	email: text('email').notNull(),
	created_at: text('created_at').notNull()
})
