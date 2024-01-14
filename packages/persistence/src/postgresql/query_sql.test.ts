import { Client } from 'pg'
import { expect, test } from 'vitest'

import fs from 'fs'
import path from 'path'
// import {
//   createAccount,
//   deleteAccount,
//   getAccount,
//   listAccounts,
// } from '../src/gen/sqlc/pg/account_sql'

import {
  createAuthor,
  createAuthorQuery,
  deleteAuthor,
  deleteAuthorQuery,
  getAuthor,
  getAuthorQuery,
  listAuthors,
  listAuthorsQuery,
} from './query_sql'

import {
  GenericContainer,
  StartedTestContainer,
  StoppedTestContainer,
  TestContainer,
  Wait,
} from 'testcontainers'

test('account', async () => {
  // PostgreSQL コンテナを起動
  const container = await new GenericContainer('postgres:latest')
    .withEnvironment({
      POSTGRES_DB: 'testdb',
      POSTGRES_USER: 'user',
      POSTGRES_PASSWORD: 'password',
    })
    .withExposedPorts(5432)
    // TCPポートが利用可能になるまで待機
    .withWaitStrategy(Wait.forListeningPorts())
    .start()

  // postgres クライアントの設定
  const client = new Client({
    host: container.getHost(),
    port: container.getMappedPort(5432),
    database: 'testdb',
    user: 'user',
    password: 'password',
  })
  await client.connect()

  // データベースへの ping (接続テスト)
  await client.query('SELECT 1')

  // ファイルを読み込んでSQL文を取得
  const sqlFilePath = path.resolve(__dirname, '../schema.sql')
  const schemaSQL = fs.readFileSync(sqlFilePath, 'utf-8')

  // スキーマの初期化
  await client.query(schemaSQL)

  // await createAccount(client, { id: 'spam', displayName: 'Egg', email: 'ham@example.com' })
  await createAuthor(client, { name: 'spam', bio: 'Egg' })

  // const account = await getAccount(client, { id: 'spam' })
  const author = await getAuthor(client, { id: 1 })
  // expect(account).not.toBeNull()
  expect(author).not.toBeNull()
  // ここダサい、なんかいい書き方 Vitest にありそう
  // if (account) {
  //   expect(account.id).toBe('spam')
  //   expect(account.displayName).toBe('Egg')
  //   expect(account.email).toBe('ham@example.com')
  // }

  if (author) {
    expect(author.id).toBe(1)
    expect(author.name).toBe('spam')
    expect(author.bio).toBe('Egg')
  }

  // await deleteAccount(client, { id: 'spam' })
  await deleteAuthor(client, { id: 1 })

  // const accounts = await listAccounts(client)
  // expect(accounts.length).toBe(0)

  const authors = await listAuthors(client)
  expect(authors.length).toBe(0)

  await client.end()

  // コンテナを停止
  await container.stop()
}, 30_000)
