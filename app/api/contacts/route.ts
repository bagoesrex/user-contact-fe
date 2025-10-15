import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const token = (await cookies()).get("auth-token")?.value;

    console.log(token)

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
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
                { message: json.message || "Create contact gagal" },
                { status: res.status }
            );
        }

        const data = json.data;

        const response = NextResponse.json({
            user: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone
            },
            message: "Create contact berhasil",
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}