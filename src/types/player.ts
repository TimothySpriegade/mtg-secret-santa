export type ManaColor = 'White' | 'Blue' | 'Black' | 'Red' | 'Green';

export interface Player {
  name: string;
  email: string;
  assignedColors?: ManaColor[];
  giftRecipient?: string;
}


