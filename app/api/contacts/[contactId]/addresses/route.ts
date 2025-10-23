import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: Promise<{ contactId: string }> }) {
    const { contactId } = await params;
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}/addresses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Gagal membuat address" },
                { status: res.status }
            );
        }

        const data = json.data;

        const response = NextResponse.json({
            address: {
                id: data.id,
                street: data.street,
                city: data.city,
                province: data.province,
                country: data.country,
                postal_code: data.postal_code
            },
            message: "Berhasil membuat address",
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}