import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    id: 'app',
    initial: '/',
    states: {
      '/': {
        on: {
          'button.get__/action': {
            target: '/transaction',
          },
          'button.get__/user': {
            target: '/user',
          },
        },
      },
      '/transaction': {
        initial: '/new',
        states: {
          '/new': {
            on: {
              'button.get__/result': {
                target: '/result',
              },
              'div.get__/user': {
                target: '#app./user./info',
              },
            },
          },
          '/result': {
            on: {
              'button.get__/': {
                target: '#app./',
              },
            },
          },
        },
      },
      '/user': {
        initial: '/',
        states: {
          '/': {
            on: {
              'button.get__/user/transactions': {
                target: '/transactions',
              },
              'div.get__/info': {
                target: '/info',
              },
            },
          },
          '/transactions': {
            on: {
              'button.get__/': {
                target: '#app./',
              },
            },
          },
          '/info': {
            initial: 'requested',
            states: {
              requested: {
                on: {
                  next: {
                    target: 'validate',
                  },
                },
              },
              validate: {
                on: {
                  next: {
                    target: 'params',
                  },
                },
              },
              params: {
                description:
                  'ヘッダーからuserId, \n\nクエリストリングから\n\npostならリクエストボディから',
                on: {
                  next: {
                    target: 'query',
                  },
                },
              },
              query: {
                initial: 'select * from users where id =',
                states: {
                  'select * from users where id =': {
                    description:
                      'ユーザー情報を取得するクエリ\n\n{\n\n Users\n\n Account\n\n Items\n\n Transactions\n\n\\-- \\[\\] もしかしたら、各Struct、別にjoinsして呼び出してもいいかもしれない',
                  },
                },
                on: {
                  next: {
                    target: 'response',
                  },
                },
              },
              response: {},
            },
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: 'button.get__/action' }
        | { type: 'button.get__/user' }
        | { type: 'button.get__/result' }
        | { type: 'div.get__/user' }
        | { type: 'button.get__/' }
        | { type: 'button.get__/user/transactions' }
        | { type: 'div.get__/info' }
        | { type: 'next' },
    },
  },
  {
    actions: {
      failure: ({ context, event }) => {},
      success: ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
)
