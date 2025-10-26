import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'inventra_mock_session';

type LoginPayload = {
  identifier?: string;
  password?: string;
  storeId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginPayload | null;

    const identifier = body?.identifier?.trim() ?? '';
    const password = body?.password?.trim() ?? '';
    const storeId = body?.storeId?.trim() ?? '';

    if (!identifier || !password || !storeId) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required for this temporary login.',
        },
        { status: 400 }
      );
    }

    const issuedAt = Date.now();
    const tokenPayload = {
      user: identifier,
      storeId,
      issuedAt,
    };

    const encoded = Buffer.from(JSON.stringify(tokenPayload)).toString('base64url');

    const response = NextResponse.json(
      {
        success: true,
        message: 'Temporary session established. Redirecting to dashboard…',
        session: tokenPayload,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: SESSION_COOKIE,
      value: encoded,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Mock login failed', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Temporary login failed to start. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Helper re-exported for other routes that share the same cookie name.
export { SESSION_COOKIE };
