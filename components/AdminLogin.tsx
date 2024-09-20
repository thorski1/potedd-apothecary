"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/app/admin/actions";

export default function AdminLogin() {
	const [error, setError] = useState("");

	async function handleSubmit(formData: FormData) {
		const result = await loginAction(formData);
		if (result?.error) {
			setError(result.error);
		}
	}

	return (
		<div className="container mx-auto px-4 py-16">
			<h1 className="text-3xl font-bold mb-8">
				Admin Login
			</h1>
			<form
				action={handleSubmit}
				className="max-w-sm mx-auto"
			>
				<Input
					type="password"
					name="password"
					placeholder="Enter admin password"
					required
					className="mb-4"
				/>
				<Button type="submit" className="w-full">
					Login
				</Button>
				{error && (
					<p className="text-red-500 mt-2">{error}</p>
				)}
			</form>
		</div>
	);
}
