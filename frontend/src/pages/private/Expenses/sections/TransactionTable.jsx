import { useId } from "react";
import { Badge, Button, CategoryPill, DataTable, MaskIcon } from "@/components";
import { formatDate, formatSignedAmount } from "@/utils";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.table;
const { columns: labels } = texts;

// Incomes come in, expenses go out
const AMOUNT_SIGNS = { income: 1, expense: -1 };

// Edit / delete need the API: icon buttons announced as unavailable,
// with the reason given once for the whole table (reasonId).
function RowActions({ row, reasonId }) {
    return (
        <span className="transactions-table__actions">
            {texts.actions.map((action) => (
                <button
                    key={action.key}
                    type="button"
                    className="transactions-table__action"
                    aria-disabled="true"
                    aria-describedby={reasonId}
                    title={texts.actionsReason}
                    onClick={(event) => event.preventDefault()}
                >
                    <MaskIcon src={action.icon} size={18} />
                    <span className="visually-hidden">{action.label} : {row.label}</span>
                </button>
            ))}
        </span>
    );
}

function buildColumns(reasonId) {
    return [
        { key: "date", label: labels.date, render: (row) => formatDate(row.date) },
        {
            key: "description",
            label: labels.description,
            isRowHeader: true,
            render: (row) => (
                <span className="transactions-table__description">
                    {row.label}
                    {row.description && <span className="transactions-table__note">{row.description}</span>}
                </span>
            ),
        },
        { key: "category", label: labels.category, render: (row) => row.categoryName && <CategoryPill categoryName={row.categoryName} /> },
        {
            key: "amount",
            label: labels.amount,
            align: "end",
            render: (row) => (
                <span className={`transactions-table__amount transactions-table__amount--${row.type}`}>
                    {formatSignedAmount(AMOUNT_SIGNS[row.type] * row.amount)}
                </span>
            ),
        },
        {
            key: "status",
            label: labels.status,
            render: (row) => <Badge label={texts.statuses[row.status].label} variant={texts.statuses[row.status].badge} />,
        },
        { key: "actions", label: labels.actions, align: "end", render: (row) => <RowActions row={row} reasonId={reasonId} /> },
    ];
}

// list: from selectTransactionList. emptyMessage: shown when nothing matches.
function TransactionTable({ list, emptyMessage, onShowMore }) {
    const reasonId = useId();

    if (list.rows.length === 0) {
        return <p className="transactions__empty">{emptyMessage}</p>;
    }

    return (
        <div className="transactions-table">
            <DataTable
                caption={texts.caption}
                columns={buildColumns(reasonId)}
                rows={list.rows}
                getRowKey={(row) => row.id}
                getRowClassName={(row) => `transactions-table__row--${row.status}`}
            />
            <span id={reasonId} className="visually-hidden">{texts.actionsReason}</span>

            {list.hasMore && (
                <div className="transactions-table__more">
                    <Button variant="neutral" size="small" label={texts.showMore} onClick={onShowMore} />
                </div>
            )}
        </div>
    );
}

export default TransactionTable;
