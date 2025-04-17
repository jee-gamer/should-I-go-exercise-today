import recommendation from "@/lib/Recommendation";
import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  const data = await DBQuery.getAllPeople(time);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}