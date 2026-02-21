# Architecture Overview

the only thing you need to know is the request flow:

Hook.mutation → Service → Api
Hook.query → Service → Api

## Folder Structure

```bash
├── doc
├── public
└── src
    ├── assets
    ├── component
    │   ├── auth
    │   ├── modal
    │   └── ui
    ├── constant
    ├── hook
    │   ├── component
    │   │   └── auth
    │   ├── mutation
    │   │   ├── auth
    │   │   ├── group
    │   │   ├── invitation
    │   │   ├── member
    │   │   ├── solution
    │   │   ├── task
    │   │   └── user
    │   └── query
    │       ├── auth
    │       ├── group
    │       ├── member
    │       ├── solution
    │       ├── task
    │       └── user
    ├── interface
    ├── page
    │   └── home
    ├── service
    ├── store
    ├── utils
    │   └── helper
    └── validator
        ├── fields
        └── schemas
```

### File naming convention

I use the following naming convention for files:

File.distinction.ts example: User.hook.ts => singular

distinctions:

- hook
- service
- api
- component
- page
- store
- utils
- schema (this also contains the validators for those schemas)
- validator (validators that does not need a zod schema)
- d (for typescript declarations)
- constant

### Naming convention

I use the following naming convention for variables:

- variableName
- SetOfFunctions example: UserController.Update
- mostly singular, but you may find plurals in variables ONLY

## Layer Responsibilities

### Hook
- uses react-query to handle the request
- show errors with toast component

### Service
- maps the request
- defines input types
- defines output types
- calls the endpoint with the api.config

### Api
- contains the endpoint configuration
- contains the fetch request
- intersection for refresh access token
- intersection for error handling

