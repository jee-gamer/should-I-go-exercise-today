import DBQuery from "@/lib/DBQuery";


export async function GET(req) {
  `
    Get average people.
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will get average from all record from database.
  example use: baseurl/api/average-people
  return: { people: number }
  return { error_message: error } if there's an error occur internally.
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  const time = searchParam.get("time");
  const data = await DBQuery.getAggregate(["people"], "avg", time);
  return new Response(JSON.stringify(data), {
    status: data["error_message"] ? 500 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}