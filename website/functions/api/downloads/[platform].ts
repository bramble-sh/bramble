// Download-count badges, summed across every release: GET /api/downloads/{android,macos,windows,linux}.
// Shields can only sum an exact asset name, and ours carry a version (bramble_android_0.15.0.apk).
import { badge, type DownloadPlatform, json, type PagesContext, snapshot } from "../_github";

// Tabler's brand-windows (filled), the icon set the site already uses. White rather than
// currentColor, which shields renders as black.
const WINDOWS_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M21 13v5c0 1.57 -1.248 2.832 -2.715 2.923l-.113 .003l-.042 .018a1 1 0 0 1 -.336 .056l-.118 -.008l-4.676 -.585v-7.407zm-10 0v7.157l-5.3 -.662c-1.514 -.151 -2.7 -1.383 -2.7 -2.895v-3.6zm0 -9.158v7.158h-8v-3.6c0 -1.454 1.096 -2.648 2.505 -2.87zm10 2.058v5.1h-8v-7.409l4.717 -.589c1.759 -.145 3.283 1.189 3.283 2.898"/></svg>';

type Logo = { namedLogo?: string; logoSvg?: string; logoColor?: string };

const BADGES: Record<DownloadPlatform, Logo> = {
	android: { namedLogo: "android" },
	macos: { namedLogo: "apple", logoColor: "white" },
	windows: { logoSvg: WINDOWS_ICON },
	linux: { namedLogo: "linux", logoColor: "white" },
};

export const onRequest = async (context: PagesContext): Promise<Response> => {
	const platform = String(context.params.platform ?? "").toLowerCase() as DownloadPlatform;
	if (!(platform in BADGES)) return json({ error: "unknown platform" }, 404, "no-store");

	const releases = await snapshot(context.env);
	if (!releases) {
		return badge({ label: platform, message: "unavailable", isError: true }, 300);
	}

	const count = releases.downloads[platform];
	return badge(
		{
			label: platform,
			message: `${metric(count)} downloads`,
			color: color(count),
			...BADGES[platform],
		},
		3600,
	);
};

/** The shading shields uses on its own download badges: red at nothing, brightgreen at 1k. */
function color(count: number): string {
	if (count >= 1000) return "brightgreen";
	if (count >= 100) return "green";
	if (count >= 10) return "yellowgreen";
	if (count >= 1) return "yellow";
	return "red";
}

/** 1234 -> 1.2k, the same shape shields prints for its own download counts. */
function metric(value: number): string {
	const units = ["k", "M", "G"];
	let scaled = value;
	let unit = -1;
	while (scaled >= 1000 && unit < units.length - 1) {
		scaled /= 1000;
		unit++;
	}
	if (unit < 0) return String(value);
	return `${scaled >= 100 ? Math.round(scaled) : Math.round(scaled * 10) / 10}${units[unit]}`;
}
