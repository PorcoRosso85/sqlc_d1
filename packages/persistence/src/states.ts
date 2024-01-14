export const states = {
  '/': {
    on: {
      clickA: {
        target: '/user',
      },
      clickB: {
        target: '/account',
      },
    },
  },
  '/user': {
    on: {
      click: {
        target: '/account',
      },
    },
  },
  '/account': {},
}
