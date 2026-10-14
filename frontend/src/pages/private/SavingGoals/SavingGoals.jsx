import { useState } from "react";
import { AsyncState, Button, DashboardHeader } from "@/components";
import { getSafetyFundGoalId, getToday } from "@/services";
import {
    GoalList,
    LatestDeposits,
    MotivationBanner,
    SavingsAdvice,
    SavingsEvolution,
    SavingsSummary,
    UpcomingGoals,
} from "./sections";
import {
    isSavingGoalsPageEmpty,
    selectGoalList,
    selectLatestDeposits,
    selectSavingsAdvice,
    selectSavingsEvolution,
    selectSavingsSummary,
    selectUpcomingGoals,
} from "./savingGoalsSelectors";
import useSavingGoalsData from "./useSavingGoalsData";
import SavingGoalsData from "./SavingGoalsData";
import "./SavingGoals.css";

// Deposits shown at first (as in Figma), then added by "Voir plus de versements"
const DEPOSITS_FIRST_PAGE = 3;
const DEPOSITS_PAGE_SIZE = 5;

function SavingGoalsContent({ data, today }) {
    const [visibleDeposits, setVisibleDeposits] = useState(DEPOSITS_FIRST_PAGE);
    const safetyFundGoalId = getSafetyFundGoalId();

    return (
        <>
            <SavingsSummary summary={selectSavingsSummary(data, today)} today={today} />
            <GoalList goals={selectGoalList(data, today, safetyFundGoalId)} />
            <SavingsEvolution evolution={selectSavingsEvolution(data, today)} />
            <UpcomingGoals goals={selectUpcomingGoals(data, today)} />
            <SavingsAdvice advice={selectSavingsAdvice(data, today, safetyFundGoalId)} />
            <LatestDeposits
                deposits={selectLatestDeposits(data, today, visibleDeposits)}
                onShowMore={() => setVisibleDeposits((count) => count + DEPOSITS_PAGE_SIZE)}
            />
            <MotivationBanner />
        </>
    );
}

// Goals show their current state: no period switcher on this page
function SavingGoals() {
    const page = SavingGoalsData;
    const { data, error, isLoading, reload } = useSavingGoalsData();
    const today = getToday();

    return (
        <>
            <DashboardHeader title={page.header.title} subtitle={page.header.subtitle}>
                <div className="saving-goals__header-actions">
                    {page.header.actions.map((action) => (
                        <Button
                            key={action.key}
                            variant={action.variant}
                            size="small"
                            label={action.label}
                            disabled
                            disabledReason={action.disabledReason}
                        />
                    ))}
                </div>
            </DashboardHeader>

            <div className="saving-goals">
                <AsyncState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={data ? isSavingGoalsPageEmpty(data) : false}
                    onRetry={reload}
                    messages={page.states}
                >
                    {() => <SavingGoalsContent data={data} today={today} />}
                </AsyncState>
            </div>
        </>
    );
}

export default SavingGoals;
