
export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface Message {
  role: Role;
  text: string;
}

export enum ModelType {
  SONAR = 'gemini-2.5-flash',
  SONAR_PRO = 'gemini-2.5-pro',
}
