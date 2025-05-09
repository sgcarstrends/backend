import type {
  CreatedEntityId,
  PostToLinkedInParam,
} from "@updater/types/social-media";
import { RestliClient } from "linkedin-api-client";
import { Resource } from "sst";

const UGC_POSTS_RESOURCE = "/ugcPosts";

export const postToLinkedin = async ({
  message,
  link,
}: PostToLinkedInParam): Promise<CreatedEntityId> => {
  const accessToken = Resource.LINKEDIN_ACCESS_TOKEN.value;

  try {
    const restliClient = new RestliClient();
    restliClient.setDebugParams({ enabled: true });
    const response = await restliClient.create({
      resourcePath: UGC_POSTS_RESOURCE,
      entity: {
        author: `urn:li:organization:${Resource.LINKEDIN_ORGANISATION_ID.value}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: { text: message },
            shareMediaCategory: "ARTICLE",
            media: [
              {
                status: "READY",
                originalUrl: link,
              },
            ],
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      },
      accessToken,
    });

    const { createdEntityId } = response;
    console.log({ createdEntityId });
    return createdEntityId;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  } finally {
    console.log("Posted to LinkedIn company's page");
  }
};
