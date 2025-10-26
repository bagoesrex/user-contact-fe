import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, { params }: { params: Promise<{ contactId: string, addressId: string }> }) {
    const { contactId, addressId } = await params;
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contactId}/addresses/${addressId}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Gagal menghapus address" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({
            data: json.data,
            message: "Berhasil menghapus address",
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}