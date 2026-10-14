import { Button, MaskIcon, SectionContainer } from "@/components";
import { getCategoryAppearance } from "@/data";
import { formatPreciseAmount } from "@/utils";
import ExpensesData from "../ExpensesData";

const texts = ExpensesData.recurring;

// recurring: from selectRecurringTransactions. Read only: no backend entity yet.
function RecurringTransactions({ recurring }) {
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
            {recurring.items.length === 0 ? (
                <p className="transactions__empty">{texts.empty}</p>
            ) : (
                <ul className="recurring-list">
                    {recurring.items.map((item) => (
                        <li key={item.id} className="recurring-list__item">
                            <span className="recurring-list__icon">
                                <MaskIcon src={getCategoryAppearance(item.categoryName).icon} />
                            </span>
                            <p className="recurring-list__text">
                                <span className="recurring-list__label">{item.label}</span>
                                <span>{texts.frequencies[item.frequency]}</span>
                            </p>
                            <p className="recurring-list__amount">{formatPreciseAmount(item.amount)}</p>
                            <div className="recurring-list__actions">
                                {texts.actions.map((action) => (
                                    <Button
                                        key={action.key}
                                        variant={action.variant}
                                        size="small"
                                        label={action.label}
                                        ariaLabel={`${action.label} : ${item.label}`}
                                        disabled
                                        disabledReason={texts.actionsReason}
                                    />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </SectionContainer>
    );
}

export default RecurringTransactions;
