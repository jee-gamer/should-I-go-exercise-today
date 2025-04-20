import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
  `
    Get all record of necessary attributes
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get all record from database.
  example use: baseurl/api/all-metrics
  return {
    people: number[],
    temperature: number[],
    humidity: number[],
    pm25: number[],
    precip_mm: number[]
  }
  return { error_message: error } if there's an error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  const data = await DBQuery.getFields(["people", "temperature", "humidity", "pm25", "precip_mm"], time, true);
  return new Response(JSON.stringify(data), {
    status: data.error_message ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}