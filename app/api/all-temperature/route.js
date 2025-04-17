import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
  `
    Get all record of temperature from given time interval.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get all temperature record from database.
  example use: baseurl/api/all-temperature?time=noon; this will get you the all the record of temperature between 11 and 13.
  example use: baseurl/api/all-temperature; time is omitted, the result will be all record from database.
  return { field: "temperature", result: number[] }
  return { error_message: error } if there's an error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  const data = await DBQuery.getField(time, "temperature");
  return new Response(JSON.stringify(data), {
    status: data.error_message ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}