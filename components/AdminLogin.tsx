"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/app/admin/actions";

/**
 * AdminLogin component for handling admin authentication.
 * 
 * This component renders a login form for admin users. It includes
 * a password input field and handles form submission for authentication.
 *
 * @returns {JSX.Element} The rendered AdminLogin component.
 */
export default function AdminLogin(): JSX.Element {
	const [error, setError] = useState("");

	/**
	 * Handles the form submission for admin login.
	 * 
	 * @param {FormData} formData - The form data containing the admin password.
	 */
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
				className="max-w-sm mx-auto space-y-4"
			>
				<Input
					type="password"
					name="password"
					placeholder="Enter admin password"
					required
					className="w-full"
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
