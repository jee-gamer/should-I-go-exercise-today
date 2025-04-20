import DBQuery from "@/lib/DBQuery";

export async function GET(req) {
	/**
	 * Get max people count for each time of day.
	 * Returns: [number, number, ...] in order of timeSlots
	 * If any error occurs: { error_message: string }
	 */

	const timeSlots = ['dawn', 'morning', 'noon', 'afternoon', 'late-afternoon'];
	const result = [];

	try {
		for (const time of timeSlots) {
			const data = await DBQuery.getAggregate(["people"], "max", time);
			if (data.error_message) {
				return new Response(JSON.stringify({ error_message: data.error_message }), {
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				});
			}
			result.push(data.people);
		}

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});

	} catch (err) {
		return new Response(JSON.stringify({ error_message: "Internal server error" }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
