import Recommendation from "@/lib/Recommendation";


export async function GET(req) {
  `
    Get heatstroke risk based on heat index.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will use current time and will unavailable if not in possible time param listed above.
  example use: baseurl/api/heatstroke-risk
  return: {
     heat_index: number,
     level: "Extreme danger" | "Danger" | "Extreme caution" | "Caution" | "Safe" | "unavailable",
     desc: string 
  }
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  const time = searchParam.get("time");
  const lat = searchParam.get("lat");
  const lon = searchParam.get("lat");
  const data = await Recommendation.heatstroke(time, lat, lon);
  return new Response(JSON.stringify(data), {
    status: data.level === "unavailable" ? 503 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}