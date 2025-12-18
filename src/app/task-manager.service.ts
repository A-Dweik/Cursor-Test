import { Injectable } from '@angular/core';

export type TaskStatus = 'Backlog' | 'Discovery' | 'In Progress' | 'Review' | 'Blocked' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

type ActivityType = 'update' | 'handoff' | 'risk';

export interface TaskEvent {
  timestamp: string;
  actor: string;
  action: string;
  type: ActivityType;
}

export interface Task {
  id: string;
  title: string;
  owner: string;
  squad: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: string[];
  summary: string;
  impactArea: string;
  dependencies: number;
  dueDate: string;
  progress: number;
  updatedAt: string;
  activity: TaskEvent[];
}

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  owner: string | 'all';
}

export interface TaskCardView extends Task {
  isOverdue: boolean;
  daysRemaining: number;
}

export interface TaskColumn {
  key: TaskStatus;
  title: string;
  accent: string;
  tasks: TaskCardView[];
}

export interface TaskInsight {
  label: string;
  value: string;
  meta: string;
  trend: 'up' | 'flat' | 'down';
}

export interface Milestone {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  focus: string;
  status: 'On Track' | 'At Risk' | 'Blocked';
}

export interface TaskActivity {
  id: string;
  taskId: string;
  taskTitle: string;
  timestamp: string;
  relativeTime: string;
  actor: string;
  action: string;
  type: ActivityType;
}

export interface ServicePulse {
  slaConfidence: number;
  automationCoverage: number;
  avgResponseTimeHours: number;
  notes: string;
}

@Injectable({ providedIn: 'root' })
export class TaskManagerService {
  private readonly statusMeta: Record<TaskStatus, { title: string; accent: string }> = {
    Backlog: { title: 'Backlog', accent: '#bec2f7' },
    Discovery: { title: 'Discovery', accent: '#f7d4c9' },
    'In Progress': { title: 'In Progress', accent: '#cce9f5' },
    Review: { title: 'Review', accent: '#ffe3b3' },
    Blocked: { title: 'Blocked', accent: '#ffd1d1' },
    Done: { title: 'Done', accent: '#c9efd4' }
  };

  private readonly tasks: Task[] = [
    {
      id: 'TMS-1042',
      title: 'Workflow API contract review',
      owner: 'Lana Haddad',
      squad: 'Platform',
      status: 'In Progress',
      priority: 'High',
      tags: ['API', 'Security'],
      summary: 'Finalize the new workflow API contract with compliance-ready scopes.',
      impactArea: 'Automation',
      dependencies: 2,
      dueDate: '2025-01-22',
      progress: 55,
      updatedAt: '2025-01-17T09:20:00Z',
      activity: [
        { timestamp: '2025-01-17T09:20:00Z', actor: 'Lana Haddad', action: 'Shared redlines with security guild', type: 'update' },
        { timestamp: '2025-01-16T11:05:00Z', actor: 'Rami Issa', action: 'Legal approved final scope', type: 'handoff' }
      ]
    },
    {
      id: 'TMS-1033',
      title: 'Workspace templates research',
      owner: 'Yara Salem',
      squad: 'Foundations',
      status: 'Discovery',
      priority: 'Medium',
      tags: ['UX', 'Enablement'],
      summary: 'Collect signals from enterprise squads on template adoption gaps.',
      impactArea: 'Experience',
      dependencies: 1,
      dueDate: '2025-02-05',
      progress: 20,
      updatedAt: '2025-01-15T15:00:00Z',
      activity: [
        { timestamp: '2025-01-15T15:00:00Z', actor: 'Yara Salem', action: 'Published research plan to Notion', type: 'update' }
      ]
    },
    {
      id: 'TMS-1027',
      title: 'Agentic triage pilot rollout',
      owner: 'Sami Farah',
      squad: 'Automation',
      status: 'Review',
      priority: 'Critical',
      tags: ['Pilot', 'Ops'],
      summary: 'Validate pilot results for the new agentic triage workflow.',
      impactArea: 'Operations',
      dependencies: 3,
      dueDate: '2025-01-19',
      progress: 78,
      updatedAt: '2025-01-17T07:30:00Z',
      activity: [
        { timestamp: '2025-01-17T07:30:00Z', actor: 'Sami Farah', action: 'Stakeholder sign-off meeting scheduled', type: 'handoff' },
        { timestamp: '2025-01-16T18:10:00Z', actor: 'Maya Barakat', action: 'QA completed scenario playback', type: 'update' }
      ]
    },
    {
      id: 'TMS-1022',
      title: 'Real-time audit stream',
      owner: 'Maya Barakat',
      squad: 'Compliance',
      status: 'Blocked',
      priority: 'High',
      tags: ['Audit', 'Data'],
      summary: 'Unblock the streaming pipeline for real-time audit requirements.',
      impactArea: 'Risk',
      dependencies: 4,
      dueDate: '2025-01-28',
      progress: 35,
      updatedAt: '2025-01-16T10:10:00Z',
      activity: [
        { timestamp: '2025-01-16T10:10:00Z', actor: 'Maya Barakat', action: "Waiting on Kafka quota extension", type: 'risk' },
        { timestamp: '2025-01-15T12:45:00Z', actor: 'Infrastructure Team', action: 'Opened support ticket with platform', type: 'update' }
      ]
    },
    {
      id: 'TMS-1014',
      title: 'Self-service intake publishing',
      owner: 'Rami Issa',
      squad: 'Enablement',
      status: 'Done',
      priority: 'Medium',
      tags: ['Docs', 'Enablement'],
      summary: 'Finalize documentation and guardrails for self-service intake.',
      impactArea: 'Enablement',
      dependencies: 0,
      dueDate: '2025-01-12',
      progress: 100,
      updatedAt: '2025-01-14T08:40:00Z',
      activity: [
        { timestamp: '2025-01-14T08:40:00Z', actor: 'Enablement Team', action: 'Published intake playbook to portal', type: 'update' }
      ]
    },
    {
      id: 'TMS-1008',
      title: 'Unified notification preferences',
      owner: 'Dina Khatib',
      squad: 'Experience',
      status: 'Backlog',
      priority: 'Low',
      tags: ['Notifications', 'UX'],
      summary: 'Define the unified notification experience across workspaces.',
      impactArea: 'Experience',
      dependencies: 1,
      dueDate: '2025-02-14',
      progress: 15,
      updatedAt: '2025-01-13T09:10:00Z',
      activity: [
        { timestamp: '2025-01-13T09:10:00Z', actor: 'Dina Khatib', action: 'Gathered historical feedback for synthesis', type: 'update' }
      ]
    }
  ];

  getTasks(): Task[] {
    return this.tasks.map((task) => ({
      ...task,
      tags: [...task.tags],
      activity: task.activity.map((event) => ({ ...event }))
    }));
  }

  getStatusFilters(): TaskStatus[] {
    return Object.keys(this.statusMeta) as TaskStatus[];
  }

  getPriorityFilters(): TaskPriority[] {
    return ['Low', 'Medium', 'High', 'Critical'];
  }

  getOwners(): string[] {
    return Array.from(new Set(this.tasks.map((task) => task.owner))).sort();
  }

  applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
    const search = filters.search.trim().toLowerCase();

    return tasks.filter((task) => {
      const hitsSearch =
        !search ||
        `${task.id} ${task.title} ${task.summary} ${task.owner} ${task.tags.join(' ')}`
          .toLowerCase()
          .includes(search);
      const hitsStatus = filters.status === 'all' || task.status === filters.status;
      const hitsPriority = filters.priority === 'all' || task.priority === filters.priority;
      const hitsOwner = filters.owner === 'all' || task.owner === filters.owner;

      return hitsSearch && hitsStatus && hitsPriority && hitsOwner;
    });
  }

  getColumns(tasks: Task[]): TaskColumn[] {
    const order: TaskStatus[] = ['Backlog', 'Discovery', 'In Progress', 'Review', 'Blocked', 'Done'];
    return order.map((status) => ({
      key: status,
      title: this.statusMeta[status].title,
      accent: this.statusMeta[status].accent,
      tasks: tasks.filter((task) => task.status === status).map((task) => this.enrich(task))
    }));
  }

  getInsights(tasks: Task[]): TaskInsight[] {
    const active = tasks.filter((task) => task.status !== 'Done').length;
    const completed = tasks.filter((task) => task.status === 'Done').length;
    const blocked = tasks.filter((task) => task.status === 'Blocked').length;
    const dueSoon = tasks.filter((task) => task.status !== 'Done' && this.isDueWithin(task.dueDate, 7)).length;

    return [
      { label: 'Active streams', value: `${active}`, meta: 'Across all squads', trend: 'up' },
      { label: 'Ready for delivery', value: `${completed}`, meta: 'Shipped this month', trend: 'flat' },
      { label: 'Needs attention', value: `${blocked}`, meta: 'Blocked or escalated', trend: 'down' },
      { label: 'Due this week', value: `${dueSoon}`, meta: 'Inside 7-day window', trend: 'up' }
    ];
  }

  getMilestones(tasks: Task[]): Milestone[] {
    return tasks
      .filter((task) => task.status !== 'Done')
      .map((task) => ({
        id: task.id,
        title: task.title,
        owner: task.owner,
        focus: task.impactArea,
        dueDate: task.dueDate,
        status: (task.status === 'Blocked'
          ? 'Blocked'
          : this.isDueWithin(task.dueDate, 5)
            ? 'At Risk'
            : 'On Track') as Milestone['status']
      }))
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 4);
  }

  getActivityFeed(tasks: Task[]): TaskActivity[] {
    return tasks
      .flatMap((task) =>
        task.activity.map((event, idx) => ({
          id: `${task.id}-${idx}`,
          taskId: task.id,
          taskTitle: task.title,
          timestamp: event.timestamp,
          relativeTime: this.relativeTime(event.timestamp),
          actor: event.actor,
          action: event.action,
          type: event.type
        }))
      )
      .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
      .slice(0, 6);
  }

  getServicePulse(tasks: Task[]): ServicePulse {
    const automationCoverage = Math.min(92, 60 + tasks.filter((task) => task.priority !== 'Low').length * 5);
    const slaConfidence = Math.max(78, 96 - tasks.filter((task) => task.status === 'Blocked').length * 6);
    const avgResponseTimeHours = Math.max(2, 8 - tasks.filter((task) => task.status === 'Done').length);

    return {
      automationCoverage,
      slaConfidence,
      avgResponseTimeHours,
      notes: automationCoverage > 85 ? 'Automation program meeting the target.' : 'Automation coverage trending up.'
    };
  }

  private enrich(task: Task): TaskCardView {
    const daysRemaining = this.daysUntil(task.dueDate);
    return {
      ...task,
      daysRemaining,
      isOverdue: daysRemaining < 0 && task.status !== 'Done'
    };
  }

  private isDueWithin(isoDate: string, windowDays: number): boolean {
    const days = this.daysUntil(isoDate);
    return days <= windowDays;
  }

  private daysUntil(isoDate: string): number {
    const due = new Date(isoDate);
    const today = new Date();
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  private relativeTime(timestamp: string): string {
    const now = new Date();
    const eventDate = new Date(timestamp);
    const diffMs = now.getTime() - eventDate.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60));

    if (minutes < 60) {
      return `${minutes || 1}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}
