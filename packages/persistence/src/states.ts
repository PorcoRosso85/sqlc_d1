import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    id: 'app',
    initial: '/',
    states: {
      '/': {
        on: {
          click: [
            {
              target: '/:user',
              guard: 'login',
            },
            {
              target: '/auth',
              guard: 'logout',
            },
          ],
          'button_get__/permission': {
            target: '/permission',
          },
          'button_get__/role': {
            target: '/role',
          },
          'Event 5': {
            target: '/order',
          },
        },
      },
      '/:user': {
        initial: '/',
        states: {
          '/': {
            initial: 'getHeader',
            states: {
              getHeader: {},
            },
            on: {
              load: {
                target: '/info',
              },
              click: {
                target: '/account',
              },
              'button_get__/user/register': {
                target: '/register',
              },
            },
          },
          '/info': {
            initial: 'ユーザー情報を取得するクエリ',
            states: {
              ユーザー情報を取得するクエリ: {
                description:
                  'select \\* from users where id = ${id}\n\n{\n\nUsers\n\nAccount\n\n}\n\n\\-- \\[\\] もしかしたら、各Struct毎にjoinsして呼び出してもいいかもしれない',
                on: {
                  with: {
                    target: 'ユーザーの権限を確認するクエリ',
                  },
                },
              },
              ユーザーの権限を確認するクエリ: {},
            },
          },
          '/account': {
            initial: '/',
            states: {
              '/': {
                on: {
                  'button_post__/account/transaction': {
                    target: '/transaction',
                  },
                  'button_post__/account/register': {
                    target: '/register',
                  },
                  'button_post__/account/invite': {
                    target: '/invite',
                  },
                  'button_get__/account/info': {
                    target: '/info',
                  },
                  'button_get__/item': {
                    target: '/item',
                  },
                },
              },
              '/transaction': {
                initial: '/',
                states: {
                  '/': {
                    on: {
                      'button_get__/:user/:accountId/transaction/history': {
                        target: '/history',
                      },
                      load: {
                        target: '#app./order',
                      },
                    },
                  },
                  '/history': {
                    initial: 'アカウントの取引履歴をクエリ',
                    states: {
                      アカウントの取引履歴をクエリ: {
                        description:
                          'SELECT \\* FROM transactions WHERE account_id = ? ORDER BY transaction_date DESC;',
                      },
                    },
                  },
                },
              },
              '/register': {
                description:
                  'userとAccountがN:Nの関係性\n\naccount作成ユーザーがowner\n\nuserはAccountに他userを招待できる',
                initial: 'アカウント生成上限をするためのuser情報クエリ',
                states: {
                  アカウント生成上限をするためのuser情報クエリ: {
                    description:
                      'SELECT plan_type FROM Users WHERE user_id = 特定のユーザーID;\n\nSELECT COUNT(\\*) FROM UserAccounts WHERE user_id = 特定のユーザーID AND is_owner = true;',
                    on: {
                      'Event 2': {
                        target: 'アカウント生成を実行するクエリ',
                      },
                    },
                  },
                  アカウント生成を実行するクエリ: {
                    description:
                      'INSERT INTO Accounts (account_id, ...) VALUES (...); INSERT INTO UserAccounts (user_id, account_id, is_owner) VALUES (ユーザーID, 作成した口座ID, true);',
                    on: {
                      'Event 1': {
                        target: 'アカウント生成したuser = ownerクエリ',
                      },
                    },
                  },
                  'アカウント生成したuser = ownerクエリ': {},
                },
              },
              '/invite': {
                initial: 'New state 2',
                states: {
                  'New state 2': {},
                },
              },
              '/info': {
                initial: 'ユーザーが持つすべてのアカウント情報を取得',
                states: {
                  ユーザーが持つすべてのアカウント情報を取得: {
                    description:
                      'Account {\n\nItems\n\nTransactions\n\n}\n\nSELECT u.user_id, u.名前, [ua.is](http://ua.is)\\_owner FROM Users u INNER JOIN UserAccounts ua ON u.user_id = ua.user_id WHERE ua.account_id = 特定の口座ID;',
                  },
                },
              },
              '/item': {},
            },
          },
          '/register': {
            initial: 'ユーザー登録: 新規ユーザーを作成するINSERTクエリ',
            states: {
              'ユーザー登録: 新規ユーザーを作成するINSERTクエリ': {
                description: 'INSERT INTO users (username, password, ...) VALUES (?, ?, ...);',
              },
            },
          },
        },
      },
      '/auth': {
        on: {
          authed: {
            target: '/',
          },
        },
      },
      '/permission': {
        initial: 'パーミッション一覧を取得するクエリ',
        states: {
          パーミッション一覧を取得するクエリ: {},
        },
      },
      '/role': {
        initial: '/',
        states: {
          '/': {
            on: {
              div: {
                target: '/list',
              },
              'button_get__/role/register': {
                target: '/register',
              },
              'get__/role/edit': {
                target: '/edit',
              },
              'delete__/role/delete': {
                target: '/delete',
              },
            },
          },
          '/list': {
            initial: '作成済みrole一覧を取得するクエリ',
            states: {
              作成済みrole一覧を取得するクエリ: {},
            },
          },
          '/register': {
            initial: 'パーミッション一覧を取得するクエリ',
            states: {
              パーミッション一覧を取得するクエリ: {
                on: {
                  next: {
                    target: '該当roleの値に、パーミッション配列を追加するクエリ',
                  },
                },
              },
              '該当roleの値に、パーミッション配列を追加するクエリ': {},
            },
          },
          '/edit': {
            initial: 'パーミッション一覧を取得するクエリ',
            states: {
              パーミッション一覧を取得するクエリ: {
                on: {
                  next: {
                    target: '該当roleの値に、パーミッション配列を追加するクエリ',
                  },
                },
              },
              '該当roleの値に、パーミッション配列を追加するクエリ': {},
            },
          },
          '/delete': {
            initial: '該当roleを削除するクエリ',
            states: {
              該当roleを削除するクエリ: {},
            },
          },
        },
      },
      '/order': {
        initial: '/',
        states: {
          '/': {
            on: {
              'button_post__/order/:orderId': {
                target: '/request',
              },
              url: {
                target: '/:orderId',
              },
            },
          },
          '/request': {
            initial: 'waitオーダーを新しいorderIdとともに追加するクエリ',
            states: {
              waitオーダーを新しいorderIdとともに追加するクエリ: {
                on: {
                  next: {
                    target: 'ユーザーのメールアドレスを送るためのクエリ',
                  },
                },
              },
              ユーザーのメールアドレスを送るためのクエリ: {},
            },
          },
          '/:orderId': {
            initial: '/',
            states: {
              '/': {
                on: {
                  url: {
                    target: '/verification',
                  },
                  'button_post__/order/:orderId/cancel': {
                    target: '/cancel',
                  },
                },
              },
              '/verification': {
                initial: '認証するためのクエリ',
                states: {
                  認証するためのクエリ: {
                    on: {
                      next: {
                        target: 'オーダー状況をwaitからpendingにするクエリ',
                      },
                    },
                  },
                  オーダー状況をwaitからpendingにするクエリ: {
                    description:
                      'INSERT INTO transactions (account_id, amount, ...) VALUES (?, ?, ...);',
                  },
                },
              },
              '/cancel': {
                initial: 'オーダーをcancelに変更するクエリ',
                states: {
                  オーダーをcancelに変更するクエリ: {},
                },
              },
            },
          },
          オーダー状況を取得するクエリ: {},
          開始時間から一定時間経過をしたオーダーを取得するクエリ: {},
          server: {
            initial: 'オーダー状況をpendingからdoneに変更するクエリ',
            states: {
              オーダー状況をpendingからdoneに変更するクエリ: {},
            },
          },
        },
      },
      '「ユーザーにアカウントをもたせ、ownerユーザーがアカウントに他のownerユーザーを招待し、アカウント内で数値を取引する」という要件':
        {
          initial: 'user x ownerの中間テーブル',
          states: {
            'user x ownerの中間テーブル': {},
            'account x item & transaction': {},
            'item x transaction': {},
          },
        },
    },
    types: {
      events: {} as
        | { type: 'click' }
        | { type: 'load' }
        | { type: 'authed' }
        | { type: 'button_post__/account/register' }
        | { type: 'button_post__/account/transaction' }
        | { type: 'button_post__/account/invite' }
        | { type: 'button_get__/account/info' }
        | { type: 'Event 2' }
        | { type: 'url' }
        | { type: 'next' }
        | { type: 'Event 1' }
        | { type: 'button_get__/user/register' }
        | { type: 'button_get__/permission' }
        | { type: 'div' }
        | { type: 'button_get__/role/register' }
        | { type: 'get__/role/edit' }
        | { type: 'delete__/role/delete' }
        | { type: 'with' }
        | { type: 'button_get__/role' }
        | { type: 'Event 5' }
        | { type: 'button_get__/item' }
        | { type: 'button_post__/order/:orderId' }
        | { type: 'button_get__/:user/:accountId/transaction/history' },
    },
  },
  {
    actions: {
      failure: ({ context, event }) => {},
      success: ({ context, event }) => {},
    },
    actors: {},
    guards: {
      false: ({ context, event }, params) => {
        return false
      },
      AuthTokenError: ({ context, event }, params) => {
        return false
      },
      'inline:app./user./info.middleware.auth.authTokenAtGoogleAuth#success[-1]#guard': (
        { context, event },
        params,
      ) => {
        return false
      },
      'inline:app.view./user./info.middleware.auth.checkAuthedTokenInToGoogle.connecting#connect[-1]#guard':
        ({ context, event }, params) => {
          return false
        },
      'inline:app.view./user./info.middleware.auth.checkAuthedTokenInToGoogle.gettingResult#success[-1]#guard':
        ({ context, event }, params) => {
          return false
        },
      'inline:app.view./user./info.middleware.auth.redirectAndGetAuthedTokenFromGoogle.connecting#connect[-1]#guard':
        ({ context, event }, params) => {
          return false
        },
      logout: ({ context, event }, params) => {
        return false
      },
      login: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
