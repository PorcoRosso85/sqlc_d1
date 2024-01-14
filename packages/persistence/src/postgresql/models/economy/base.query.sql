-- name: SelectUsers :many
SELECT * FROM users;

-- name: SelectUser :one
SELECT * FROM users WHERE id = $1;

-- name: SelectAccounts :many
SELECT * FROM accounts;

-- name: SelectAccount :one
SELECT * FROM accounts WHERE id = $1;

-- name: SelectReasons :many
SELECT * FROM reasons;

-- name: SelectReason :one
SELECT * FROM reasons WHERE id = $1;

-- name: SelectTransactions :many
SELECT * FROM transactions;

-- name: SelectTransaction :one
SELECT * FROM transactions WHERE id = $1;

-- name: SelectUserAccounts :many
SELECT * FROM user_account;

-- name: SelectUserAccount :one
SELECT * FROM user_account WHERE user_id = $1 AND account_id = $2;

-- name: SelectAccountReasons :many
SELECT * FROM account_reason;

-- name: SelectAccountReason :one
SELECT * FROM account_reason WHERE account_id = $1 AND reason_id = $2;

