import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
  `
    Get all record of precip from given time interval.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get all precip record from database.
  example use: baseurl/api/all-precip?time=noon; this will get you the all the record of precip between 11 and 13.
  example use: baseurl/api/all-precip; time is omitted, the result will be all record from database.
  return { precip: number[] }
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  const data = await DBQuery.getField(time, "precip_mm");
  return new Response(JSON.stringify(data), {
    status: data.error_message ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}