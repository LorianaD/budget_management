import { useOutletContext } from "react-router";
import { AsyncState, Avatar, DashboardHeader } from "@/components";
import { usePeriod } from "@/context";
import { getToday } from "@/services";
import { formatHour, getInitials } from "@/utils";
import {
    DailyTip,
    MonthlyBudget,
    RecentActivity,
    RecommendedMethod,
    SavingGoalHighlight,
    SuggestedAids,
    SummaryCards,
} from "./sections";
import {
    isDashboardEmpty,
    selectBudgetOverview,
    selectHighlightedGoal,
    selectRecentActivity,
    selectSummary,
} from "./dashboardSelectors";
import useDashboardData from "./useDashboardData";
import DashboardData from "./DashboardData";
import "./Dashboard.css";

function Dashboard() {
    const page = DashboardData;
    const { user } = useOutletContext();
    const { period } = usePeriod();
    const { data, error, isLoading, reload } = useDashboardData(period);
    const today = getToday();

    const greeting = user ? `${page.header.greeting} ${user.firstname}` : page.header.greeting;

    return (
        <>
            <DashboardHeader title={greeting} subtitle={`${page.header.updatedAt} ${formatHour(today)}.`}>
                {user && <Avatar initials={getInitials(user.firstname, user.lastname)} tone="blue" />}
            </DashboardHeader>

            <div className="dashboard">
                <AsyncState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={data ? isDashboardEmpty(data) : false}
                    onRetry={reload}
                    messages={page.states}
                >
                    {() => (
                        <>
                            <SummaryCards summary={selectSummary(data, today)} />

                            <div className="dashboard__row">
                                <MonthlyBudget overview={selectBudgetOverview(data)} period={period} />
                                <div className="dashboard__column">
                                    <SavingGoalHighlight highlight={selectHighlightedGoal(data.savingGoals)} />
                                    <RecommendedMethod />
                                </div>
                            </div>

                            <div className="dashboard__row dashboard__row--wide-first">
                                <SuggestedAids />
                                <div className="dashboard__column">
                                    <DailyTip />
                                    <RecentActivity items={selectRecentActivity(data, today)} today={today} />
                                </div>
                            </div>
                        </>
                    )}
                </AsyncState>
            </div>
        </>
    );
}

export default Dashboard;
