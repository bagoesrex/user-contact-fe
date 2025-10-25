import { Address } from "@/types/address";
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

export async function GET(_: Request, { params }: { params: Promise<{ contactId: string }> }) {
    const { contactId } = await params;
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}/addresses`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });

        if (res.status === 404) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Gagal melihat address" },
                { status: res.status }
            );
        }

        const addresses = json.data || [];

        const response = NextResponse.json({
            addresses: addresses.map((address: Address) => ({
                id: address.id,
                street: address.street,
                city: address.city,
                province: address.province,
                country: address.country,
                postal_code: address.postal_code
            })),
            message: "Berhasil mendapatkan addresses"
        })

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}