import { CtaSection, Hero } from '@/components';
import './Home.css';
import HomeData from './HomeData';
import { BudgetMethodsSection, CommunitySection, FeaturesSection, FinancialAidSection } from './sections';

function Home() {
    const page = HomeData;
    const classVariant = 'home';
    return (
        <>
            <Hero
                page={page}
                variant={classVariant}
            />

            <FeaturesSection
                page={page}
            />

            <BudgetMethodsSection
                page={page}
            />

            <FinancialAidSection
                page={page}
            />

            <CommunitySection
                page={page}
            />

            <CtaSection
                page={page}
                variant="cta-boxed"
            />
        </>
    )
}

export default Home