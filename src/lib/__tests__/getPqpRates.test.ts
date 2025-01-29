import getPqpRates from "@/lib/getPqpRates";
import { type COE, VehicleClass } from "@/types";
import { describe, expect, it } from "vitest";

describe("getPqpRates", () => {
  const mockCoeData: COE[] = [
    {
      month: "2025-01",
      bidding_no: 2,
      vehicle_class: "Category A",
      quota: 1069,
      bids_success: 1058,
      bids_received: 1484,
      premium: 93601,
    },
    {
      month: "2025-01",
      bidding_no: 2,
      vehicle_class: "Category B",
      quota: 686,
      bids_success: 686,
      bids_received: 1071,
      premium: 116625,
    },
    {
      month: "2025-01",
      bidding_no: 2,
      vehicle_class: "Category C",
      quota: 234,
      bids_success: 233,
      bids_received: 373,
      premium: 65476,
    },
    {
      month: "2025-01",
      bidding_no: 2,
      vehicle_class: "Category D",
      quota: 536,
      bids_success: 530,
      bids_received: 651,
      premium: 7721,
    },
    {
      month: "2025-01",
      bidding_no: 1,
      vehicle_class: "Category A",
      quota: 1034,
      bids_success: 1034,
      bids_received: 1381,
      premium: 93699,
    },
    {
      month: "2025-01",
      bidding_no: 1,
      vehicle_class: "Category B",
      quota: 677,
      bids_success: 674,
      bids_received: 1266,
      premium: 121501,
    },
    {
      month: "2025-01",
      bidding_no: 1,
      vehicle_class: "Category C",
      quota: 248,
      bids_success: 246,
      bids_received: 364,
      premium: 67891,
    },
    {
      month: "2025-01",
      bidding_no: 1,
      vehicle_class: "Category D",
      quota: 520,
      bids_success: 513,
      bids_received: 595,
      premium: 9001,
    },
    {
      month: "2024-12",
      bidding_no: 2,
      vehicle_class: "Category A",
      quota: 1035,
      bids_success: 998,
      bids_received: 1506,
      premium: 96000,
    },
    {
      month: "2024-12",
      bidding_no: 2,
      vehicle_class: "Category B",
      quota: 676,
      bids_success: 667,
      bids_received: 987,
      premium: 109000,
    },
    {
      month: "2024-12",
      bidding_no: 2,
      vehicle_class: "Category C",
      quota: 255,
      bids_success: 255,
      bids_received: 400,
      premium: 69890,
    },
    {
      month: "2024-12",
      bidding_no: 2,
      vehicle_class: "Category D",
      quota: 519,
      bids_success: 504,
      bids_received: 641,
      premium: 8381,
    },
    {
      month: "2024-12",
      bidding_no: 1,
      vehicle_class: "Category A",
      quota: 1037,
      bids_success: 1034,
      bids_received: 1475,
      premium: 94000,
    },
    {
      month: "2024-12",
      bidding_no: 1,
      vehicle_class: "Category B",
      quota: 689,
      bids_success: 689,
      bids_received: 866,
      premium: 103010,
    },
    {
      month: "2024-12",
      bidding_no: 1,
      vehicle_class: "Category C",
      quota: 262,
      bids_success: 249,
      bids_received: 418,
      premium: 70289,
    },
    {
      month: "2024-12",
      bidding_no: 1,
      vehicle_class: "Category D",
      quota: 517,
      bids_success: 516,
      bids_received: 570,
      premium: 7878,
    },
    {
      month: "2024-11",
      bidding_no: 2,
      vehicle_class: "Category A",
      quota: 1041,
      bids_success: 1038,
      bids_received: 1320,
      premium: 89889,
    },
    {
      month: "2024-11",
      bidding_no: 2,
      vehicle_class: "Category B",
      quota: 678,
      bids_success: 678,
      bids_received: 874,
      premium: 105081,
    },
    {
      month: "2024-11",
      bidding_no: 2,
      vehicle_class: "Category C",
      quota: 235,
      bids_success: 214,
      bids_received: 378,
      premium: 69000,
    },
    {
      month: "2024-11",
      bidding_no: 2,
      vehicle_class: "Category D",
      quota: 524,
      bids_success: 524,
      bids_received: 637,
      premium: 8669,
    },
    {
      month: "2024-11",
      bidding_no: 1,
      vehicle_class: "Category A",
      quota: 1040,
      bids_success: 1035,
      bids_received: 1338,
      premium: 99889,
    },
    {
      month: "2024-11",
      bidding_no: 1,
      vehicle_class: "Category B",
      quota: 696,
      bids_success: 683,
      bids_received: 1039,
      premium: 108001,
    },
    {
      month: "2024-11",
      bidding_no: 1,
      vehicle_class: "Category C",
      quota: 236,
      bids_success: 209,
      bids_received: 365,
      premium: 68340,
    },
    {
      month: "2024-11",
      bidding_no: 1,
      vehicle_class: "Category D",
      quota: 520,
      bids_success: 520,
      bids_received: 598,
      premium: 9089,
    },
    {
      month: "2024-10",
      bidding_no: 2,
      vehicle_class: "Category A",
      quota: 1058,
      bids_success: 1048,
      bids_received: 1499,
      premium: 102900,
    },
    {
      month: "2024-10",
      bidding_no: 2,
      vehicle_class: "Category B",
      quota: 670,
      bids_success: 669,
      bids_received: 975,
      premium: 113890,
    },
    {
      month: "2024-10",
      bidding_no: 2,
      vehicle_class: "Category C",
      quota: 222,
      bids_success: 222,
      bids_received: 337,
      premium: 72939,
    },
    {
      month: "2024-10",
      bidding_no: 2,
      vehicle_class: "Category D",
      quota: 522,
      bids_success: 515,
      bids_received: 626,
      premium: 9589,
    },
    {
      month: "2024-10",
      bidding_no: 1,
      vehicle_class: "Category A",
      quota: 994,
      bids_success: 986,
      bids_received: 1604,
      premium: 103799,
    },
    {
      month: "2024-10",
      bidding_no: 1,
      vehicle_class: "Category B",
      quota: 671,
      bids_success: 652,
      bids_received: 1084,
      premium: 116002,
    },
    {
      month: "2024-10",
      bidding_no: 1,
      vehicle_class: "Category C",
      quota: 218,
      bids_success: 216,
      bids_received: 321,
      premium: 75009,
    },
    {
      month: "2024-10",
      bidding_no: 1,
      vehicle_class: "Category D",
      quota: 520,
      bids_success: 519,
      bids_received: 604,
      premium: 10001,
    },
  ];

  it("should correctly calculate PQP rates for all vehicle categories", () => {
    expect(getPqpRates(mockCoeData)).toEqual({
      "2025-01": {
        "Category A": 94513,
        "Category B": 110537,
        "Category C": 68481,
        "Category D": 8457,
      },
      "2024-12": {
        "Category A": 97747,
        "Category B": 109164,
        "Category C": 70912,
        "Category D": 8935,
      },
    });
  });

  it("should handle empty input array", () => {
    const result = getPqpRates([]);
    expect(result).toEqual({});
  });

  it("should handle single category data", () => {
    const singleCategoryData = mockCoeData.filter(
      ({ vehicle_class }) => vehicle_class === VehicleClass.CategoryA,
    );
    const result = getPqpRates(singleCategoryData);
    expect(result).toEqual({
      "2025-01": { "Category A": 94513 },
      "2024-12": { "Category A": 97747 },
    });
  });

  // it("should handle less than 6 records for a category", () => {
  //   const limitedData = [
  //     { vehicle_class: "Category A", premium: 93601 },
  //     { vehicle_class: "Category A", premium: 93699 },
  //     { vehicle_class: "Category A", premium: 96000 },
  //   ];
  //
  //   const result = getPqpRates(limitedData);
  //   expect(result).toEqual({
  //     "Category A": 94433, // (93601 + 93699 + 96000) / 3 -> 94433.33 -> 94433
  //   });
  // });
  //
  // it("should handle decimal values correctly", () => {
  //   const decimalData = [
  //     { vehicle_class: "Category A", premium: 93601.5 },
  //     { vehicle_class: "Category A", premium: 93699.75 },
  //     { vehicle_class: "Category A", premium: 96000.25 },
  //     { vehicle_class: "Category A", premium: 94000.8 },
  //     { vehicle_class: "Category A", premium: 89889.9 },
  //     { vehicle_class: "Category A", premium: 99889.3 },
  //   ];
  //
  //   const result = getPqpRates(decimalData);
  //   expect(result["Category A"]).toBe(94514); // Rounded up from 94513.583
  // });
  //
  // it("should handle string premium values", () => {
  //   const stringPremiumData = [
  //     { vehicle_class: "Category A", premium: 93601 },
  //     { vehicle_class: "Category A", premium: 93699 },
  //   ];
  //
  //   const result = getPqpRates(stringPremiumData);
  //   expect(result["Category A"]).toBe(93650);
  // });
  //
  // it("should take only the most recent 6 records when more are provided", () => {
  //   const extendedData = [
  //     { vehicle_class: "Category A", premium: 100000 }, // Should be ignored
  //     { vehicle_class: "Category A", premium: 100000 }, // Should be ignored
  //     ...mockCoeData.filter((coe) => coe.vehicle_class === "Category A"),
  //   ];
  //
  //   const result = getPqpRates(extendedData);
  //   expect(result["Category A"]).toBe(96648);
  // });
});
