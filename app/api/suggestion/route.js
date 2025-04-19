import recommendation from "@/lib/Recommendation";

export async function GET(req) {
  `
    Get suggestion base on weather condition provided by WeatherAPI from given time
  possible time param: ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon']
  if omitted, it will use current time and if not fall in any possible time param
  the result will be unavailable.
  example use: baseurl/api/suggestion; returns suggestion and description of current time.
  example use: baseurl/api/suggestion?time=dawn; returns suggestion and description at 8 AM of today
  return: {
    suggestion: string,
    desc1: string,
    desc2: string,
    weather: {
      temperature: {value: number, desc: string},
      humidity: {value: number, desc: string},
      pm2_5: {value: number, desc: string},
      people: {value: number, desc: string}
    } | null
  }
  `
  const searchParam = new URLSearchParams(new URL(req.url).search);
  let time = searchParam.get("time");
  let lat = searchParam.get("lat");
  let lon = searchParam.get("lon");
  const data = await recommendation.suggestion(time, lat, lon)
  return new Response(JSON.stringify(data), {
    status: data.suggestion === "unavailable" ? 503 : 200,
    headers: { 'Content-Type': 'application/json' },
  })
}