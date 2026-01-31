# Objective
Create a minimal frontend for [devsync](https://github.com/Jannael/DevSync) API

## Stack
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)](#)
[MIT](https://github.com/Jannael/DevSync/blob/main/LICENSE)

## Features
- login
- register
- logout
- home
- create project
- edit project
- delete project
- create user
- edit user
- delete user

## Rules for features 

- server error are show with toast component
- form validations are done with zod
- form errors are show with P component

## Folder structure
``` bash
src
├── assets
├── components
│   ├── group
│   ├── task
│   └── ui
├── config
├── hooks
│   ├── auth
│   ├── components
│   ├── group
│   ├── solveTask
│   ├── task
│   └── user
├── pages
│   ├── auth
│   ├── group
│   ├── Home
│   │   └── components
│   └── task
├── service
│   ├── api
│   │   └── models
│   │       ├── auth
│   │       ├── group
│   │       ├── solution
│   │       ├── task
│   │       └── user
│   └── FormValidations
│       └── auth
└── utils
    └── helpers
```

## Folder description
I am not a frontend developer so do not expect the code to be the best or even good in some cases. but here is the folder description
### Helpers
function to create other functions such as 'createModel' and 'createValidator'
### Models
typed function to call the api
### FormValidations
zod validations for forms

# Setup
``` bash
pnpm install
pnpm dev
```

# Deploy
``` bash
pnpm build
```

## TODO
- add tests
- lazy loading
- missing features like update assigned users to task
