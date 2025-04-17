import LinearRegression from "@/lib/LinearRegression";


export async function GET(req) {
  `
    Get prediction of people based on weather condition at given time param and location using LinearRegression model.
  example use: baseurl/api/people-at?time=morning
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  param must be given.
  return: { prediction: number, percentage: number }
  return: { prediction: null, percentage: null } when error occur internally or param not given.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  let lat = searchParam.get("lat");
  let lon = searchParam.get("lon");
  const data = await LinearRegression.predict(time, lat, lon);
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}