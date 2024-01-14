import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const selectUsersQuery = `-- name: SelectUsers :many
SELECT id, name FROM users`;

export interface SelectUsersRow {
    id: number;
    name: string;
}

export async function selectUsers(client: Client): Promise<SelectUsersRow[]> {
    const result = await client.query({
        text: selectUsersQuery,
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

export const selectUserQuery = `-- name: SelectUser :one
SELECT id, name FROM users WHERE id = $1`;

export interface SelectUserArgs {
    id: number;
}

export interface SelectUserRow {
    id: number;
    name: string;
}

export async function selectUser(client: Client, args: SelectUserArgs): Promise<SelectUserRow | null> {
    const result = await client.query({
        text: selectUserQuery,
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

export const selectAccountsQuery = `-- name: SelectAccounts :many
SELECT id, name, balance FROM accounts`;

export interface SelectAccountsRow {
    id: number;
    name: string;
    balance: number;
}

export async function selectAccounts(client: Client): Promise<SelectAccountsRow[]> {
    const result = await client.query({
        text: selectAccountsQuery,
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

export const selectAccountQuery = `-- name: SelectAccount :one
SELECT id, name, balance FROM accounts WHERE id = $1`;

export interface SelectAccountArgs {
    id: number;
}

export interface SelectAccountRow {
    id: number;
    name: string;
    balance: number;
}

export async function selectAccount(client: Client, args: SelectAccountArgs): Promise<SelectAccountRow | null> {
    const result = await client.query({
        text: selectAccountQuery,
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

export const selectReasonsQuery = `-- name: SelectReasons :many
SELECT id, name, account_id, ammount FROM reasons`;

export interface SelectReasonsRow {
    id: number;
    name: string;
    accountId: number;
    ammount: number;
}

export async function selectReasons(client: Client): Promise<SelectReasonsRow[]> {
    const result = await client.query({
        text: selectReasonsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            name: row[1],
            accountId: row[2],
            ammount: row[3]
        };
    });
}

export const selectReasonQuery = `-- name: SelectReason :one
SELECT id, name, account_id, ammount FROM reasons WHERE id = $1`;

export interface SelectReasonArgs {
    id: number;
}

export interface SelectReasonRow {
    id: number;
    name: string;
    accountId: number;
    ammount: number;
}

export async function selectReason(client: Client, args: SelectReasonArgs): Promise<SelectReasonRow | null> {
    const result = await client.query({
        text: selectReasonQuery,
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
        accountId: row[2],
        ammount: row[3]
    };
}

export const selectTransactionsQuery = `-- name: SelectTransactions :many
SELECT id, reason_id, debit_credit, ammount FROM transactions`;

export interface SelectTransactionsRow {
    id: number;
    reasonId: number;
    debitCredit: boolean;
    ammount: number;
}

export async function selectTransactions(client: Client): Promise<SelectTransactionsRow[]> {
    const result = await client.query({
        text: selectTransactionsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            id: row[0],
            reasonId: row[1],
            debitCredit: row[2],
            ammount: row[3]
        };
    });
}

export const selectTransactionQuery = `-- name: SelectTransaction :one
SELECT id, reason_id, debit_credit, ammount FROM transactions WHERE id = $1`;

export interface SelectTransactionArgs {
    id: number;
}

export interface SelectTransactionRow {
    id: number;
    reasonId: number;
    debitCredit: boolean;
    ammount: number;
}

export async function selectTransaction(client: Client, args: SelectTransactionArgs): Promise<SelectTransactionRow | null> {
    const result = await client.query({
        text: selectTransactionQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        id: row[0],
        reasonId: row[1],
        debitCredit: row[2],
        ammount: row[3]
    };
}

export const selectUserAccountsQuery = `-- name: SelectUserAccounts :many
SELECT user_id, account_id FROM user_account`;

export interface SelectUserAccountsRow {
    userId: number;
    accountId: number;
}

export async function selectUserAccounts(client: Client): Promise<SelectUserAccountsRow[]> {
    const result = await client.query({
        text: selectUserAccountsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            userId: row[0],
            accountId: row[1]
        };
    });
}

export const selectUserAccountQuery = `-- name: SelectUserAccount :one
SELECT user_id, account_id FROM user_account WHERE user_id = $1 AND account_id = $2`;

export interface SelectUserAccountArgs {
    userId: number;
    accountId: number;
}

export interface SelectUserAccountRow {
    userId: number;
    accountId: number;
}

export async function selectUserAccount(client: Client, args: SelectUserAccountArgs): Promise<SelectUserAccountRow | null> {
    const result = await client.query({
        text: selectUserAccountQuery,
        values: [args.userId, args.accountId],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        userId: row[0],
        accountId: row[1]
    };
}

export const selectAccountReasonsQuery = `-- name: SelectAccountReasons :many
SELECT account_id, reason_id FROM account_reason`;

export interface SelectAccountReasonsRow {
    accountId: number;
    reasonId: number;
}

export async function selectAccountReasons(client: Client): Promise<SelectAccountReasonsRow[]> {
    const result = await client.query({
        text: selectAccountReasonsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            accountId: row[0],
            reasonId: row[1]
        };
    });
}

export const selectAccountReasonQuery = `-- name: SelectAccountReason :one
SELECT account_id, reason_id FROM account_reason WHERE account_id = $1 AND reason_id = $2`;

export interface SelectAccountReasonArgs {
    accountId: number;
    reasonId: number;
}

export interface SelectAccountReasonRow {
    accountId: number;
    reasonId: number;
}

export async function selectAccountReason(client: Client, args: SelectAccountReasonArgs): Promise<SelectAccountReasonRow | null> {
    const result = await client.query({
        text: selectAccountReasonQuery,
        values: [args.accountId, args.reasonId],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        accountId: row[0],
        reasonId: row[1]
    };
}

