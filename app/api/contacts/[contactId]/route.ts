import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: Promise<{ contactId: string }> }) {
    const { contactId } = await params;
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Gagal menghapus contact" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({
            data: json.data,
            message: "Berhasil menghapus contact",
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ contactId: string }> }) {
    const { contactId } = await params;
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Gagal mengupdate contact" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({
            data: json.data,
            message: "Berhasil mengupdate contact",
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}`, {
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
                { message: json.message || "Gagal melihat detail contact" },
                { status: res.status }
            );
        }

        const data = json.data;

        const response = NextResponse.json({
            contact: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone
            },
            message: "Berhasil mendapatkan detail contact"
        })

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}