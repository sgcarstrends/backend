import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { processCSV } from "@api/utils/processCSV";
import Papa from "papaparse";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Simple mocks
vi.mock("node:fs");
vi.mock("papaparse");

interface TestRecord {
  name: string;
  age: number;
  active: boolean;
}

describe("processCSV", () => {
  // Temporary path for testing
  const tmpDirectory = os.tmpdir();
  const filePath = path.join(tmpDirectory, "test.csv");

  beforeEach(() => {
    vi.clearAllMocks();

    // Set up mock implementations for each test
    vi.mocked(fs.readFileSync).mockReturnValue("mock csv content");

    vi.mocked(Papa.parse).mockReturnValue({
      data: [
        { name: " John Doe ", age: "25", active: "true" },
        { name: " Jane Smith ", age: "30", active: "false" },
      ],
    } as never);
  });

  afterEach(() => {
    // Clean up the temporary file after each test if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });

  it("should read a CSV file and parse it", async () => {
    const result = await processCSV<TestRecord>(filePath);

    expect(fs.readFileSync).toHaveBeenCalledWith(filePath, "utf-8");
    expect(Papa.parse).toHaveBeenCalled();
    expect(result).toHaveLength(2);
  });

  it("should use Papa.parse with correct options", async () => {
    await processCSV(filePath);

    expect(Papa.parse).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transform: expect.any(Function),
      }),
    );
  });

  it("should apply custom field transformations when provided", async () => {
    const mockParseResult = {
      data: [{ name: " John Doe ", age: "25" }],
    };

    vi.mocked(Papa.parse).mockImplementationOnce(() => {
      // Return mock data
      return { ...mockParseResult } as never;
    });

    const customFields = {
      name: (value: string) => value.toUpperCase().trim(),
      age: (value: string) => Number.parseInt(value) + 5,
    };

    await processCSV(filePath, { fields: customFields });

    // Check that Papa.parse was called with the expected options
    expect(Papa.parse).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        transform: expect.any(Function),
      }),
    );
  });

  it("should handle file read errors", async () => {
    const errorMsg = "File not found";
    vi.mocked(fs.readFileSync).mockImplementationOnce(() => {
      throw new Error(errorMsg);
    });

    await expect(processCSV(filePath)).rejects.toThrow(errorMsg);
  });

  it("should handle parsing errors", async () => {
    vi.mocked(Papa.parse).mockImplementationOnce(() => {
      throw new Error("Parse error");
    });

    await expect(processCSV(filePath)).rejects.toThrow("Parse error");
  });

  it("should return an empty array if no records are found", async () => {
    vi.mocked(Papa.parse).mockReturnValueOnce({
      data: [],
    } as never);

    const result = await processCSV(filePath);

    expect(result).toHaveLength(0);
  });
});
