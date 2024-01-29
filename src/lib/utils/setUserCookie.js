/** @param {import('$lib/types').Cookies} cookies @param {import('$lib/types').User} user */
export function setLoginCookie(cookies, user) {
    const cookieValue = JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        dark_mode: user.dark_mode,
        metadata: user.metadata,
        image_url: user.image_url,
    });

    cookies.set('max', cookieValue, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 * 12 * 50 // ~50 years
    });
}
