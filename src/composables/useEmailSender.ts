import emailjs from '@emailjs/browser';
import type { Player } from '../types/player';

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

interface EmailParams extends Record<string, unknown> {
  to_name: string;
  to_email: string;
  from_name: string;
  gift_recipient_name: string;
  gift_recipient_colors: string;
  event_date?: string;
}

export class EmailSender {
  private config: EmailConfig;

  constructor() {
    this.config = {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };

    if (!this.config.serviceId || !this.config.templateId || !this.config.publicKey) {
      throw new Error('EmailJS configuration is missing. Check your .env file.');
    }
  }

  async sendAssignmentEmail(player: Player, giftRecipient: Player): Promise<void> {
    const params: EmailParams = {
      to_name: player.name,
      to_email: player.email,
      from_name: 'MTG Secret Santa',
      gift_recipient_name: giftRecipient.name,
      gift_recipient_colors: giftRecipient.assignedColors?.join(', ') || 'No colors assigned',
      event_date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        params,
        this.config.publicKey
      );
    } catch (error) {
      throw new Error(`Failed to send email to ${player.email}: ${error}`);
    }
  }

  async sendBulkEmails(assignments: Array<{ player: Player; recipient: Player }>): Promise<void> {
    const results = await Promise.allSettled(
      assignments.map(({ player, recipient }) =>
        this.sendAssignmentEmail(player, recipient)
      )
    );

    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      throw new Error(`Failed to send ${failures.length} email(s)`);
    }
  }
}

