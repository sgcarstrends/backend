import { AbortTaskRunError, logger, schedules } from "@trigger.dev/sdk/v3";
import redis from "@updater/config/redis";
import type {
  ScheduleOptions,
  SchedulerName,
} from "@updater/config/schedulers";
import type { UpdaterResult } from "@updater/lib/updater";

type UpdaterFunction = () => Promise<UpdaterResult>;

export const createUpdateTask = (
  id: SchedulerName,
  cron: ScheduleOptions,
  updaterFn: UpdaterFunction,
) => {
  return schedules.task({
    id,
    cron,
    run: async (payload: unknown, { ctx }) => {
      logger.log("Starting updater task", { payload, ctx });

      try {
        const response = await updaterFn();

        logger.log("Update completed", {
          recordsProcessed: response.recordsProcessed,
          message: response.message,
          timestamp: response.timestamp,
        });

        return response;
      } catch (error) {
        logger.error("Update task failed", { error });
        throw new AbortTaskRunError(error);
      }
    },
    onSuccess: async () => {
      const now = Date.now();
      await redis.set(`lastUpdated:${id.toLowerCase()}`, now);
      logger.log("Last updated", { timestamp: now });
    },
    onFailure: async (payload, error, { ctx }) => {
      logger.error("Update Task Permanent Failure", { error, payload, ctx });
      // TODO Send the error to Sentry
    },
  });
};
