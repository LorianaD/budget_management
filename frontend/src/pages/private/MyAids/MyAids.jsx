import { useId } from "react";
import { Button, DashboardHeader } from "@/components";
import { AidCatalog, AidDetail, AidFilters, AidGuidance, AidSuggestions } from "./sections";
import { hasActiveAidFilters, selectAidCatalog, selectAidDetail } from "./myAidsSelectors";
import useAidFilters from "./useAidFilters";
import MyAidsData from "./MyAidsData";
import "./MyAids.css";

// Information page on financial aids: static catalog filtered on the client,
// links to the official websites. No eligibility computation, no application.
function MyAids() {
    const page = MyAidsData;
    const detailId = useId();
    const filtersState = useAidFilters(page.detail.defaultAidKey);
    const { filters, selectedAidKey, focusRequest, showAid } = filtersState;
    const catalog = selectAidCatalog(page.catalog, page.situationAids, filters);

    return (
        <>
            <DashboardHeader title={page.header.title} subtitle={page.header.subtitle}>
                <div className="my-aids__header-actions">
                    <Button
                        variant={page.header.action.variant}
                        size="small"
                        label={page.header.action.label}
                        ariaLabel={page.header.action.ariaLabel}
                        link={page.header.action.link}
                    />
                </div>
            </DashboardHeader>

            <div className="my-aids">
                <AidSuggestions onShowAid={showAid} detailId={detailId} />

                <AidCatalog
                    catalog={catalog}
                    selectedAidKey={selectedAidKey}
                    onShowAid={showAid}
                    detailId={detailId}
                    emptyMessage={page.filters.noResult}
                    filters={(
                        <AidFilters
                            filtersState={filtersState}
                            isFiltered={hasActiveAidFilters(filters)}
                            resultLabel={page.filters.results(catalog.aidCount, catalog.organizationCount)}
                        />
                    )}
                />

                <AidDetail detail={selectAidDetail(page.catalog, selectedAidKey)} id={detailId} focusRequest={focusRequest} />
                <AidGuidance />
            </div>
        </>
    );
}

export default MyAids;
