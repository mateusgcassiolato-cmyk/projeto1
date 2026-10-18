// Tipos centrais do sistema MarketingFlow

export type ID = string;

// ---------- Mapas Mentais ----------
export interface MindNode {
  id: ID;
  text: string;
  x: number;
  y: number;
  color: string;
  parentId: ID | null;
}

export interface MindMap {
  id: ID;
  title: string;
  nodes: MindNode[];
  createdAt: number;
  updatedAt: number;
}

// ---------- Notas ----------
export interface Note {
  id: ID;
  title: string;
  content: string;
  tags: string[];
  pinned: boolean;
  color: string;
  createdAt: number;
  updatedAt: number;
}

// ---------- Tarefas (Kanban) ----------
export type TaskStatus = "backlog" | "todo" | "doing" | "done";
export type TaskPriority = "baixa" | "media" | "alta";

export interface Task {
  id: ID;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // ISO date (yyyy-mm-dd)
  channel: string | null; // canal de marketing
  createdAt: number;
  updatedAt: number;
}

// ---------- Calendário Editorial (Social Media) ----------
export type SocialPlatform =
  | "Instagram"
  | "Facebook"
  | "LinkedIn"
  | "TikTok"
  | "X"
  | "YouTube";

export type PostFormat = "Post" | "Reels" | "Story" | "Carrossel" | "Vídeo" | "Artigo";

export type PostStatus = "ideia" | "producao" | "agendado" | "publicado";

export interface SocialPost {
  id: ID;
  date: string; // ISO date yyyy-mm-dd
  platform: SocialPlatform;
  format: PostFormat;
  title: string;
  caption: string;
  status: PostStatus;
  time: string; // HH:mm
  createdAt: number;
}

// ---------- Metas / OKRs ----------
export interface KeyResult {
  id: ID;
  title: string;
  target: number;
  current: number;
  unit: string;
}

export interface Goal {
  id: ID;
  objective: string;
  quarter: string;
  keyResults: KeyResult[];
  createdAt: number;
}
