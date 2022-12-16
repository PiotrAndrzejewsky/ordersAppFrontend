export interface Order {
  orderId: number;
  userId: number;
  orderTypeId: string;
  price: number;
  title: string;
  description: string;
  client: string;
  quantity: number;
  plannedCompletionDate: Date;
  completed: boolean;
}