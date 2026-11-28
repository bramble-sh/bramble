import { t } from "../i18n";
import { html } from "../template";

type Candidate = { id: string; name: string; username: string };

export function updateLoginBody({
	title,
	hostname,
	primaryAction,
	primaryLabel,
	candidates,
	newUsername,
}: {
	title: string;
	hostname: string;
	primaryAction: string;
	primaryLabel: string;
	candidates: Candidate[];
	newUsername?: string;
}) {
	let candidatesBody = html`
		<div class="tp-row">
			<div class="tp-label">${t("fieldAccount")}</div>
			<div>${candidates[0]?.name ?? ""} ${candidates[0]?.username ? [html`<span style="color: rgba(235,235,245,0.55)">(${candidates[0].username})</span>`] : []}</div>
			<input type="hidden" name="tp-update-target" value="${candidates[0]?.id ?? ""}" />
		</div>
	`;

	// Several logins: none is chosen for the user. A password-change page has no username to
	// tell them apart, and the wrong pick overwrites another account's password.
	if (candidates.length > 1) {
		candidatesBody = html`
			<div class="tp-candidates">
				${candidates.map(
					(c) => html`
						<label class="tp-candidate">
							<input type="radio" name="tp-update-target" value="${c.id}" />
							<div>
								<div class="tp-cand-name">${c.name}</div>
								<div class="tp-cand-user">${c.username}</div>
							</div>
						</label>
					`,
				)}
			</div>
		`;
	}

	// Shown only when the update would change a username.
	const usernameRow =
		newUsername && candidates.some((c) => c.username !== newUsername)
			? html`
				<div class="tp-row">
					<div class="tp-label">${t("fieldUsername")}</div>
					<div>${newUsername}</div>
				</div>
			`
			: "";

	// candidatesBody is nested html; interpolate via a one-element array so the html helper
	// joins it verbatim, since a bare html string would be escaped as a scalar (renders the
	// markup as literal text). The helper treats arrays, not strings, as trusted nested html.
	return html`
		<div class="tp-head">
			<div>
				<div class="tp-title">${title}</div>
				<div class="tp-host">${hostname}</div>
			</div>
			<button class="tp-close" data-tp-action="dismiss" aria-label="Dismiss">×</button>
		</div>
		${[candidatesBody]}
		${[usernameRow]}
		<div class="tp-actions">
			<button class="tp-btn tp-btn-primary" data-tp-action="${primaryAction}" ${candidates.length > 1 ? "disabled" : ""}>${primaryLabel}</button>
			<button class="tp-btn" data-tp-action="save-new" title="${t("saveAsNewHint")}">${t("saveAsNew")}</button>
			<button class="tp-overflow" data-tp-action="toggle-menu" aria-label="More">⋯</button>
		</div>
	`;
}
