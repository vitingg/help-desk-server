export interface CreateTicketRequestDTO {
  title: string;
  description?: string;
  categoryId: number;
  clientId: number;
  techId: number;
}