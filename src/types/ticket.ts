export interface CreateTicketRequestDTO {
  title: string;
  description?: string;
  baseCategoryId: number;
  clientId: number;
  techId: number;
  additionalCategoryIds?: number[]
}