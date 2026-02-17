export interface Topic {
  id: string;
  titulo: string;
  descripcion: string;
  creador: string;
  creadorNombre: string;
  creadoEn: string; // ISO timestamp string from Supabase
  mensajesCount?: number;
}

export interface Message {
  id: string;
  contenido: string;
  autor: string;
  autorNombre: string;
  creadoEn: string; // ISO timestamp string from Supabase
}
