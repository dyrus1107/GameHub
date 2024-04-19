import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");
  if (!authorization) {
    return new Response("Now authorization header", { status: 400 });
  }

  const event = receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    const streamsToUpdate = await db.stream.findMany({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
    });

    const streamIdsToUpdate = streamsToUpdate.map(stream => stream.id);

    await db.stream.updateMany({
      where: {
        id: { in: streamIdsToUpdate },
      },
      data: {
        isLive: true,
      },
    });
  }

  if (event.event === "ingress_ended") {
    const streamsToUpdate = await db.stream.findMany({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
    });

    const streamIdsToUpdate = streamsToUpdate.map(stream => stream.id);

    await db.stream.updateMany({
      where: {
        id: { in: streamIdsToUpdate },
      },
      data: {
        isLive: false,
      },
    });
  }

  return new Response("success");
}
