import LinearRegression from "@/lib/LinearRegression";


export async function GET(req) {
  `
    Get prediction of people based on current weather and given location condition using LinearRegression model.
  example use: baseurl/api/people-now
  return: { prediction: number, percentage: number }
  return: { prediction: null, percentage: null } when error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let lat = searchParam.get("lat");
  let lon = searchParam.get("lon");
  const data = await LinearRegression.predict(null, lat, lon);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}