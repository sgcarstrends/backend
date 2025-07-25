import { type SearchParams } from "nuqs/server";
import {
  loadSearchParams,
  getDefaultStartDate,
  getDefaultEndDate,
} from "@web/app/coe/search-params";
import { TrendTable } from "@web/app/coe/trend-table";
import { COEPremiumChart } from "@web/components/COE-premium-chart";
import { COECategories } from "@web/components/coe-categories";
import { PageHeader } from "@web/components/page-header";
import { StructuredData } from "@web/components/structured-data";
import Typography from "@web/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@web/components/ui/card";
import {
  API_URL,
  LAST_UPDATED_COE_KEY,
  SITE_TITLE,
  SITE_URL,
} from "@web/config";
import redis from "@web/config/redis";
import {
  type COEBiddingResult,
  type COEResult,
  type Month,
  RevalidateTags,
} from "@web/types";
import { fetchApi } from "@web/utils/fetch-api";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  searchParams: Promise<SearchParams>;
}

const title = "COE Historical Results";
const description =
  "Explore historical Certificate of Entitlement (COE) price trends and bidding results for car registrations in Singapore.";

export const generateMetadata = async (): Promise<Metadata> => {
  // TODO: Refactor and clean up
  const results = await fetchApi<COEResult[]>(`${API_URL}/coe/latest`);
  const categories = results.reduce<Record<string, number>>(
    (category, current) => {
      category[current.vehicle_class] = current.premium;
      return category;
    },
    {},
  );

  const canonical = "/coe/results";
  const images = `/api/og/coe?title=COE Results&subtitle=Historical Data&biddingNo=2&categoryA=${categories["Category A"]}&categoryB=${categories["Category B"]}&categoryC=${categories["Category C"]}&categoryD=${categories["Category D"]}&categoryE=${categories["Category E"]}`;

  return {
    title,
    description,
    openGraph: {
      images,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

const COEResultsPage = async ({ searchParams }: Props) => {
  const { start, end } = await loadSearchParams(searchParams);
  const defaultStart = await getDefaultStartDate();
  const defaultEnd = await getDefaultEndDate();

  const params = new URLSearchParams({
    start: start || defaultStart,
    end: end || defaultEnd,
  });

  const [coeResults, months]: [COEResult[], Month[]] = await Promise.all([
    await fetchApi<COEResult[]>(`${API_URL}/coe?${params.toString()}`, {
      next: { tags: [RevalidateTags.COE] },
    }),
    await fetchApi<Month[]>(`${API_URL}/coe/months`),
  ]);
  const lastUpdated = await redis.get<number>(LAST_UPDATED_COE_KEY);

  const groupedData = coeResults.reduce<COEBiddingResult[]>(
    (acc: any, item) => {
      const key = `${item.month}-${item.bidding_no}`;

      if (!acc[key]) {
        acc[key] = {
          month: item.month,
          biddingNo: item.bidding_no,
        };
      }
      acc[key][item.vehicle_class] = item.premium;

      return acc;
    },
    [],
  );

  const data: COEBiddingResult[] = Object.values(groupedData);

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/coe/results`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-4">
        <PageHeader title="Historical Results" lastUpdated={lastUpdated} />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="xl:col-span-9">
            <COEPremiumChart data={data} months={months} />
          </div>
          <div className="xl:col-span-3">
            <COECategories />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>List of historical COE prices</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendTable coeResults={coeResults} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default COEResultsPage;
