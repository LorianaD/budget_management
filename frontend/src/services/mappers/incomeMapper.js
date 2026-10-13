import { toAmount, toDecimalString } from "./mapperUtils";

// Income.amount is DECIMAL(10, 3): see toAmount for the sub-cent rule
export const mapIncome = (dto) => ({
    id: dto.id,
    label: dto.label,
    amount: toAmount(dto.amount, "Income.amount"),
    receivedAt: dto.receivedAt,
});

// income = { label, amount, receivedAt }
export const toIncomePayload = (income) => ({
    label: income.label,
    amount: toDecimalString(income.amount),
    receivedAt: income.receivedAt,
});
