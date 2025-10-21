import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        const token = (await cookies()).get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || "Logout failed" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({
            data: json.data,
            message: "Logout successful",
        });

        response.cookies.set("auth-token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            expires: new Date(0),
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const body = await req.json();
    const fieldName = Object.keys(body)[0];

    try {
        const token = (await cookies()).get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        const json = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: json.message || `Gagal mengganti ${fieldName}` },
                { status: res.status }
            );
        }

        const data = json.data;

        const response = NextResponse.json({
            data: {
                name: data.name,
                username: data.username,
            },
            message: `Berhasil mengganti ${fieldName}`,
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const { data } = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Gagal memuat profile" },
                { status: res.status }
            );
        }

        const response = NextResponse.json({
            user: {
                username: data.username,
                name: data.name,
            },
            message: "Berhasil memuat profile",
        });

        return response;
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}