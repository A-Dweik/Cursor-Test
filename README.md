# Task Manager Service Micro App

Task Manager Service is a lightweight Angular micro-application inspired by the [`awartani-t2/microApp`](https://github.com/awartani-t2/microApp) template. It focuses on program visibility for cross-squad execution workstreams by surfacing:

- Insight cards for squad-level health
- A kanban-style execution board
- Upcoming milestone tracking
- A lightweight activity feed & service pulse indicators

## Getting started

```bash
npm install
npm start
```

The dev server runs at `http://localhost:4200/` with hot reload enabled.

## Available scripts

| Command        | Description                              |
| -------------- | ---------------------------------------- |
| `npm start`    | Runs the dev server (`ng serve`)         |
| `npm run build`| Production build into `dist/`            |
| `npm test`     | Executes the Angular test runner         |

## Architecture highlights

- Standalone root component (`App`) backed by a domain-specific `TaskManagerService`.
- Rich in-memory dataset that mirrors the structure defined in the `microApp` Vue template (statuses, events, milestones).
- Signal-based state management for filters, task board derivations, milestones, activity feed, and service health.
- Pure CSS implementation for the program board, filters, insights, and service pulse panels.

## Relationship to the reference template

The original template uses Vue + ASP.NET. This implementation keeps the interaction model (hero header, status board, activity feed) but delivers it in Angular to match this repository. You can port the dataset or visual shell back to the Vue template with minimal effort because:

- Status metadata (`Backlog`, `Discovery`, `In Progress`, `Review`, `Blocked`, `Done`) mirrors the original columns.
- Activity feed entries follow the same `taskId`-centric schema used by `ClientApp/components/Index` in the reference repo.
- Service pulse metrics can be dropped into any dashboard surface by reusing the `TaskManagerService` helpers.

## Next steps

- Wire the `TaskManagerService` to your preferred API or data stream.
- Extend the activity feed to capture live updates via WebSockets or server-sent events.
- Export board metrics to the shared observability data warehouse for deeper reporting.
