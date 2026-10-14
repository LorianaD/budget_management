import { useId } from "react";
import { Badge, Button, MaskIcon } from "@/components";
import MyAidsData from "../MyAidsData";

const texts = MyAidsData.catalog;

// "Organismes et aides disponibles": one card per organization, with its
// matching aids. Each aid opens the detail panel; "Voir les aides" opens the
// organization's official website.
// catalog: from selectAidCatalog. filters: the filter bar, rendered above the cards.
function AidCatalog({ catalog, filters, selectedAidKey, onShowAid, detailId, emptyMessage }) {
    const titleId = useId();

    return (
        <section className="aid-catalog" aria-labelledby={titleId}>
            <h2 id={titleId} className="my-aids__section-title">{texts.title}</h2>
            {filters}

            {catalog.organizationCount === 0 ? (
                <p className="my-aids__empty">{emptyMessage}</p>
            ) : (
                <ul className="aid-catalog__grid">
                    {catalog.organizations.map((organization) => (
                        <li key={organization.key} className="aid-catalog__card">
                            <div className="aid-catalog__top">
                                <span className={`aid-catalog__icon aid-catalog__icon--${organization.tone}`}>
                                    <MaskIcon src={organization.icon} size={20} />
                                </span>
                                <Badge label={organization.badge.label} variant={organization.badge.variant} />
                            </div>

                            <h3 className="aid-catalog__name">{organization.name}</h3>

                            <ul className="aid-catalog__aids">
                                {organization.aids.map((aid) => (
                                    <li key={aid.key}>
                                        <button
                                            type="button"
                                            className="aid-catalog__aid"
                                            aria-controls={detailId}
                                            aria-current={aid.key === selectedAidKey ? "true" : undefined}
                                            aria-label={texts.aidButton(aid.name)}
                                            onClick={() => onShowAid(aid.key)}
                                        >
                                            {aid.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="aid-catalog__action">
                                <Button
                                    variant="outline"
                                    size="small"
                                    label={texts.officialLink.label}
                                    ariaLabel={texts.officialLink.ariaLabel(organization.name)}
                                    link={organization.url}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default AidCatalog;
