// Public surface of @piekai/db.
// Named table exports for queries; `schema` namespace for drizzle() init.
// `db` is the service-role Drizzle client (server-side only).

export { db } from "./client";
export * from "./schema";
export * as schema from "./schema";
