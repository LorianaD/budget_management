import { DataTable, RatingDots, SectionContainer } from "@/components";
import MethodsData from "../MethodsData";

const texts = MethodsData.comparison;
const recommendedKey = MethodsData.recommended.methodKey;

function buildColumns() {
    return [
        {
            key: "method",
            label: texts.methodColumn,
            isRowHeader: true,
            render: (row) => (
                <>
                    {row.label}
                    {row.key === recommendedKey && <span className="visually-hidden"> ({texts.recommendedLabel})</span>}
                </>
            ),
        },
        ...texts.criteria.map((criterion) => ({
            key: criterion.key,
            label: criterion.label,
            align: "center",
            render: (row) => (
                <RatingDots value={row.scores[criterion.key]} tone={criterion.tone} label={texts.score(row.scores[criterion.key])} />
            ),
        })),
    ];
}

// "Comparer les méthodes": editorial scores out of 5, the recommended method highlighted
function MethodComparison() {
    const section = {
        header: {
            title: texts.title,
            description: texts.description,
            variant: "panel",
            titleVariant: "panel",
            descriptionVariant: "panel",
        },
    };

    return (
        <SectionContainer section={section} className="panel">
            <div className="method-comparison">
                <DataTable
                    caption={texts.caption}
                    columns={buildColumns()}
                    rows={texts.rows}
                    getRowKey={(row) => row.key}
                    getRowClassName={(row) => (row.key === recommendedKey ? "method-comparison__row--recommended" : "")}
                />
            </div>
            <p className="methods__note">{texts.note}</p>
        </SectionContainer>
    );
}

export default MethodComparison;
