import { registerEnumType } from '@nestjs/graphql';

export enum ReservationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Declined = 'Declined',
  Cancelled = 'Cancelled',
}

registerEnumType(ReservationStatus, {
  name: 'Status',
});
