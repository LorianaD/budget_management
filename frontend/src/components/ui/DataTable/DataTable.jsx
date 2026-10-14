import './DataTable.css';

const cellClass = (column) => `data-table__cell data-table__cell--${column.align ?? "start"}`;

// One cell; the row header column (isRowHeader) becomes a <th scope="row">.
// data-label gives the column name to the stacked mobile layout (see CSS).
function Cell({ column, children }) {
    if (column.isRowHeader) {
        return <th scope="row" className={`${cellClass(column)} data-table__row-header`}>{children}</th>;
    }

    return <td className={cellClass(column)} data-label={column.label}>{children}</td>;
}

// Generic table, unaware of business data.
// columns = [{ key, label, align?: "start" | "center" | "end", isRowHeader?, render(row) }]
// footer: optional { [columnKey]: content } rendered as the last row (totals).
// getRowClassName: optional row -> modifier class (e.g. status styles).
// Below 600px each row becomes a block: row header on top, then "label value" lines.
function DataTable({ caption, columns, rows, getRowKey, getRowClassName, footer, className = "" }) {
    return (
        <table className={`data-table ${className}`}>
            <caption className="visually-hidden">{caption}</caption>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key} scope="col" className={cellClass(column)}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={getRowKey(row)} className={getRowClassName?.(row) ?? ""}>
                        {columns.map((column) => (
                            <Cell key={column.key} column={column}>{column.render(row)}</Cell>
                        ))}
                    </tr>
                ))}
            </tbody>
            {footer && (
                <tfoot>
                    <tr className="data-table__footer">
                        {columns.map((column) => (
                            <Cell key={column.key} column={column}>{footer[column.key] ?? null}</Cell>
                        ))}
                    </tr>
                </tfoot>
            )}
        </table>
    );
}

export default DataTable;
