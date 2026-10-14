import { getBudgetSplit, sumAmounts } from "@/utils";

// Pure functions for the budget methods page (no data loading: the page is
// educational content). Texts live in MethodsData.js.

// Anchor of a method card, used by the "Comment choisir" links
export const methodAnchorOf = (methodKey) => `method-card-${methodKey}`;

// Amount of each share of the simulated income, and their total
export function selectSimulation(income, allocations) {
    const items = getBudgetSplit(income, allocations);

    return {
        items,
        total: sumAmounts(items),
    };
}

// Situations of the "Comment choisir" section with the title and anchor of
// the method they point to
export function selectChooserItems(situations, methods) {
    const titles = new Map(methods.map((method) => [method.key, method.title]));

    return situations.map((situation) => ({
        ...situation,
        methodTitle: titles.get(situation.methodKey),
        anchor: methodAnchorOf(situation.methodKey),
    }));
}
