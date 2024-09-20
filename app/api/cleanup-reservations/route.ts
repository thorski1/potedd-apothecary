import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST() {
	try {
		// Fetch expired reservations
		const { data: expiredReservations, error: fetchError } =
			await supabase
				.from("reservations")
				.select("*")
				.lt("expires_at", new Date().toISOString());

		if (fetchError) throw fetchError;

		// Increment stock quantity for each expired reservation
		for (const reservation of expiredReservations) {
			const { error: stockError } = await supabase
				.rpc("increment_stock_quantity", {
					product_id: reservation.product_id,
					quantity: reservation.quantity,
				});

			if (stockError) throw stockError;
		}

		// Delete expired reservations
		const { error: deleteError } = await supabase
			.from("reservations")
			.delete()
			.lt("expires_at", new Date().toISOString());

		if (deleteError) throw deleteError;

		return NextResponse.json({
			message:
				"Reservations cleaned up and stock updated successfully",
		});
	} catch (error) {
		console.error("Error cleaning up reservations:", error);
		return NextResponse.json(
			{ error: "Failed to clean up reservations" },
			{ status: 500 }
		);
	}
}
