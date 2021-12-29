import { registerEnumType } from '@nestjs/graphql';

export enum ReservationStatus {
  Pending,
  Approved,
  Declined,
  Cancelled,
}

registerEnumType(ReservationStatus, {
  name: 'Status',
});
