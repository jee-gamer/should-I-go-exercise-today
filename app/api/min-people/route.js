import DBQuery from "@/lib/DBQuery";


export async function GET(req) {
  `
    Get min people.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get min from all record from database.
  example use: baseurl/api/min-people
  return: { people: number }
  return { error_message: error } if there's an error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  const time = searchParam.get("time");
  const data = await DBQuery.getAggregate(["people"], "min", time);
  return new Response(JSON.stringify(data), {
    status: data["error_message"] ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}