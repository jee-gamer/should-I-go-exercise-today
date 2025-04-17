import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
  `
    Get all record of humidity from given time interval.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get all humidity record from database.
  example use: baseurl/api/all-humidity?time=noon; this will get you the all the record of humidity between 11 and 13.
  example use: baseurl/api/all-humidity; time is omitted, the result will be all record from database.
  return { field: "humidity", result: number[] }
  return { error_message: error } if there's an error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  const data = await DBQuery.getField(time, "humidity");
  return new Response(JSON.stringify(data), {
    status: data.error_message ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}