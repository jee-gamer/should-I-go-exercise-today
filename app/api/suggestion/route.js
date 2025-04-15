import db from "@/lib/DBConnector";
import recommendation from "@/lib/Recommendation";

export async function GET(req) {
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  let lat = searchParam.get("lat");
  let lon = searchParam.get("lon");
  if (!time) {
    time = "now";
  }
  if (!lat) {
    lat = 13.833;
  }
  if (!lon) {
    lon = 100.483;
  }
  const data = await recommendation.suggestion(time, lat, lon)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}