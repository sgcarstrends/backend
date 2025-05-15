import { platforms } from "@updater/config/platforms";
import { updateCars } from "@updater/lib/updateCars";
import {
  type Task,
  processTask,
  publishToPlatform,
} from "@updater/lib/workflow";
import { options } from "@updater/lib/workflows/options";
import { createWorkflow } from "@upstash/workflow/hono";

export const carsWorkflow = createWorkflow(
  async (context) => {
    const carTasks: Task[] = [{ name: "cars", handler: updateCars }];

    const carResults = await Promise.all(
      carTasks.map(({ name, handler }) => processTask(context, name, handler)),
    );

    const processedCarResults = carResults.filter(
      ({ recordsProcessed }) => recordsProcessed > 0,
    );

    if (processedCarResults.length === 0) {
      return {
        message:
          "No car records processed. Skipped publishing to social media.",
      };
    }

    for (const { table } of processedCarResults) {
      await Promise.all(
        platforms.map((platform) =>
          publishToPlatform(context, platform, table),
        ),
      );
    }

    return {
      message: "Car data processed and published successfully",
    };
  },
  { ...options },
);
