interface MarketSegment {
    demographicProfile: {
        ageRange: string;
        income: string;
        location: string;
        preferences: string[];
    };
    behavioralMetrics: {
        purchaseFrequency: number;
        priceRange: Range;
        searchPatterns: string[];
    };
    marketSize: {
        totalUsers: number;
        activeUsers: number;
        growthRate: number;
    };
} 