/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as LoggedImport } from './routes/_logged'
import { Route as IndexImport } from './routes/index'
import { Route as LoggedProfileImport } from './routes/_logged/profile'
import { Route as LoggedExpensesImport } from './routes/_logged/expenses'
import { Route as LoggedCreateExpenseImport } from './routes/_logged/create-expense'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const LoggedRoute = LoggedImport.update({
  id: '/_logged',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoggedProfileRoute = LoggedProfileImport.update({
  path: '/profile',
  getParentRoute: () => LoggedRoute,
} as any)

const LoggedExpensesRoute = LoggedExpensesImport.update({
  path: '/expenses',
  getParentRoute: () => LoggedRoute,
} as any)

const LoggedCreateExpenseRoute = LoggedCreateExpenseImport.update({
  path: '/create-expense',
  getParentRoute: () => LoggedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_logged': {
      id: '/_logged'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LoggedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_logged/create-expense': {
      id: '/_logged/create-expense'
      path: '/create-expense'
      fullPath: '/create-expense'
      preLoaderRoute: typeof LoggedCreateExpenseImport
      parentRoute: typeof LoggedImport
    }
    '/_logged/expenses': {
      id: '/_logged/expenses'
      path: '/expenses'
      fullPath: '/expenses'
      preLoaderRoute: typeof LoggedExpensesImport
      parentRoute: typeof LoggedImport
    }
    '/_logged/profile': {
      id: '/_logged/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof LoggedProfileImport
      parentRoute: typeof LoggedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LoggedRoute: LoggedRoute.addChildren({
    LoggedCreateExpenseRoute,
    LoggedExpensesRoute,
    LoggedProfileRoute,
  }),
  AboutRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_logged",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_logged": {
      "filePath": "_logged.tsx",
      "children": [
        "/_logged/create-expense",
        "/_logged/expenses",
        "/_logged/profile"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_logged/create-expense": {
      "filePath": "_logged/create-expense.tsx",
      "parent": "/_logged"
    },
    "/_logged/expenses": {
      "filePath": "_logged/expenses.tsx",
      "parent": "/_logged"
    },
    "/_logged/profile": {
      "filePath": "_logged/profile.tsx",
      "parent": "/_logged"
    }
  }
}
ROUTE_MANIFEST_END */
