import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUsersQuery = `-- name: GetUsers :many
SELECT id, name FROM users`;

export interface GetUsersRow {
    id: number;
    name: string;
}

export async function getUsers(client: Client): Promise<GetUsersRow[]> {
    const result = await client.query({
        text: getUsersQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            name: row[1]
        };
    });
}

export const getUserQuery = `-- name: GetUser :one
SELECT id, name FROM users WHERE id = $1`;

export interface GetUserArgs {
    id: number;
}

export interface GetUserRow {
    id: number;
    name: string;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const result = await client.query({
        text: getUserQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1]
    };
}

export const getAccountsQuery = `-- name: GetAccounts :many
SELECT id, name, balance FROM accounts`;

export interface GetAccountsRow {
    id: number;
    name: string;
    balance: number;
}

export async function getAccounts(client: Client): Promise<GetAccountsRow[]> {
    const result = await client.query({
        text: getAccountsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            balance: row[2]
        };
    });
}

export const getAccountQuery = `-- name: GetAccount :one
SELECT id, name, balance FROM accounts WHERE id = $1`;

export interface GetAccountArgs {
    id: number;
}

export interface GetAccountRow {
    id: number;
    name: string;
    balance: number;
}

export async function getAccount(client: Client, args: GetAccountArgs): Promise<GetAccountRow | null> {
    const result = await client.query({
        text: getAccountQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        name: row[1],
        balance: row[2]
    };
}

