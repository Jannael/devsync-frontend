<p align="center">
  <br>
  <br>
  <a href="https://devsync.com.mx" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Jannael/devsync-frontend/blob/main/public/FullLogo-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://github.com/Jannael/devsync-frontend/blob/main/public/FullLogo-light.png">
      <img alt="DevSync logo" src="https://github.com/Jannael/devsync-frontend/blob/main/public/FullLogo-dark.png" height="110">
    </picture>
  </a>
  <br>
  <br>
  <br>
</p>

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](Typescript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![React](https://img.shields.io/badge/React-%234ea94b.svg?logo=react&logoColor=white)](React)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](pnpm)
[![Biome](https://img.shields.io/badge/Biome-60a5fa?logo=biome&logoColor=white)](https://biomejs.dev)
[![prettier](https://img.shields.io/badge/prettier-FF69B4?logo=prettier&logoColor=fff)](prettier)

</div>


## Objective

DevSync is a robust frontend application designed to streamline collaboration
within technical teams. It provides a platform for **assigning tasks** and
managing the creation and tracking of **coding solutions**.

## API

It uses [Devsync backend](https://github.com/jannael/devsync).

## Stack

| Category             | Technology                                                                                                       |
| :------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Language             | [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](Typescript)        |
| Framework            | [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#) |
| React             | [![React](https://img.shields.io/badge/React-%234ea94b.svg?logo=react&logoColor=white)](React)           |
| Package Manager      | [![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=fff)](pnpm)                                |
| **LINTER/FORMATTER** |                                                                                                                  |
| Linter/formatter     | [![Biome](https://img.shields.io/badge/Biome-60a5fa?logo=biome&logoColor=white)](https://biomejs.dev)            |
| Markdown Formatter   | [![prettier](https://img.shields.io/badge/prettier-FF69B4?logo=prettier&logoColor=fff)](prettier)                |

## Install

Developed using Node.js 24.11.0.

> {!IMPORTANT}
> This uses [Devsync backend](https://github.com/jannael/devsync).

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start your MongoDB service:**

   ```bash
   pnpm dev
   ```

## Scripts

```json
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "biome check",
  "format": "biome check --write",
  "type-check": "tsc --noEmit",
  "preview": "vite preview"
```

## Doc

If you want to know how the code works check the [architecture](Architecture.md)


## Challenges

The frontend of this project was a challenge for me, because it was the first time i was using React, and i had to learn it from scratch, but i think i did a good job.

The first version of the frontend was a mess, and i had to refactor it completely.

## Future work

(i will be working on this, do not think that i do not think it is important)
- refactor some components
- tests
- docs