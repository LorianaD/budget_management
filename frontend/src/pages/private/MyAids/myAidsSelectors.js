import { normalizeText } from "@/utils";

// Pure functions of the private aids page (static catalog, no data loading).
// Texts live in MyAidsData.js.

export const DEFAULT_AID_FILTERS = {
    search: "",
    category: "all",
    situation: "all",
};

export function hasActiveAidFilters(filters) {
    return Object.keys(DEFAULT_AID_FILTERS).some((name) => filters[name] !== DEFAULT_AID_FILTERS[name]);
}

// Organizations with the aids matching the filters (organizations without any
// matching aid are left out). The search ignores case and accents and looks in
// the aid name, its description and the organization name.
// situationAids: { [situation]: [aidKey] } — the aids often linked to a situation.
export function selectAidCatalog(catalog, situationAids, filters) {
    const query = normalizeText(filters.search);
    const situationKeys = filters.situation === "all" ? null : new Set(situationAids[filters.situation] ?? []);

    const organizations = catalog.organizations
        .map((organization) => ({
            ...organization,
            aids: catalog.aids.filter((aid) =>
                aid.organizationKey === organization.key
                && (filters.category === "all" || aid.categories.includes(filters.category))
                && (!situationKeys || situationKeys.has(aid.key))
                && (!query || normalizeText(`${aid.name} ${aid.description} ${organization.name}`).includes(query))),
        }))
        .filter((organization) => organization.aids.length > 0);

    return {
        organizations,
        aidCount: organizations.reduce((count, organization) => count + organization.aids.length, 0),
        organizationCount: organizations.length,
    };
}

// The aid shown in the detail panel with its organization, null if unknown
export function selectAidDetail(catalog, aidKey) {
    const aid = catalog.aids.find((item) => item.key === aidKey);
    if (!aid) return null;

    return {
        aid,
        organization: catalog.organizations.find((organization) => organization.key === aid.organizationKey),
    };
}
