import { z } from 'zod';

export enum EField {
  PHONE = 'phone',
}

const PHONE_PATTERN = /^\+7\d{10}$/;

export const phoneSchema = z.object({
  [EField.PHONE]: z
    .string()
    .min(1, { message: 'Введите номер телефона' })
    .regex(PHONE_PATTERN, { message: 'Формат: +7XXXXXXXXXX' }),
});

export type TPhoneFormValues = z.infer<typeof phoneSchema>;
