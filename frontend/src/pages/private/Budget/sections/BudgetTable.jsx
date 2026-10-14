import { Badge, DataTable, MaskIcon, SectionContainer } from "@/components";
import { getBudgetStatusAppearance, getCategoryAppearance } from "@/data";
import { formatPeriod, formatPreciseAmount, formatSignedAmount } from "@/utils";
import BudgetData from "../BudgetData";

const texts = BudgetData.table;
const { columns: labels } = texts;

const columns = [
    {
        key: "category",
        label: labels.category,
        isRowHeader: true,
        render: (row) => (
            <span className="budget-table__category">
                <MaskIcon src={getCategoryAppearance(row.categoryName).icon} size={16} />
                {row.categoryName}
            </span>
        ),
    },
    { key: "planned", label: labels.planned, align: "end", render: (row) => formatPreciseAmount(row.planned) },
    { key: "spent", label: labels.spent, align: "end", render: (row) => formatPreciseAmount(row.spent) },
    {
        key: "difference",
        label: labels.difference,
        align: "end",
        render: (row) => (
            <Badge
                label={formatSignedAmount(row.difference)}
                variant={row.difference === 0 ? "soft-neutral" : getBudgetStatusAppearance(row.status).badge}
            />
        ),
    },
];

// table: from selectBudgetTable
function BudgetTable({ table, period }) {
    const section = {
        header: { title: texts.title, variant: "panel", titleVariant: "panel" },
    };

    if (table.rows.length === 0) {
        return (
            <SectionContainer section={section} className="panel">
                <p className="budget__empty">{texts.empty}</p>
            </SectionContainer>
        );
    }

    return (
        <SectionContainer
            section={section}
            className="panel"
            headerExtra={<Badge label={formatPeriod(period)} variant="soft-info" />}
        >
            {!table.hasExpenses && <p className="budget__empty">{texts.noExpenses}</p>}

            <DataTable
                className="budget-table"
                caption={texts.caption}
                columns={columns}
                rows={table.rows}
                getRowKey={(row) => row.categoryId}
                footer={{
                    category: texts.total,
                    planned: formatPreciseAmount(table.totalPlanned),
                    spent: formatPreciseAmount(table.totalSpent),
                    difference: formatSignedAmount(table.totalDifference),
                }}
            />

            {table.overruns.length > 0 && (
                <ul className="budget-table__alerts">
                    {table.overruns.map((overrun) => (
                        <li key={overrun.categoryId} className="budget-table__alert">
                            <MaskIcon src={texts.alertIcon} size={16} />
                            <p>
                                <strong>{overrun.categoryName} :</strong> {texts.overrun(formatPreciseAmount(overrun.amount))}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </SectionContainer>
    );
}

export default BudgetTable;
