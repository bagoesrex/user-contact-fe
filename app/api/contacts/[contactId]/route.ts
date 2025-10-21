import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: { contactId: string } }) {
    try {
        const token = (await cookies()).get("auth-token")?.value;
        const { contactId } = params

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

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