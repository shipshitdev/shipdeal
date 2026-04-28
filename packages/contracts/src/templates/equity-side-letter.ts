import type { CounterpartyProfile } from "../counterparty";
import {
	formatLongDate,
	renderPartyBlock,
	renderSignatureBlock,
} from "../helpers";
import type { ProviderProfile } from "../provider";

export type EquitySideLetterContext = {
	provider: ProviderProfile;
	counterparty: CounterpartyProfile;
	effectiveDate?: string;
	consultancyDate?: string;
};

export function renderEquitySideLetter(ctx: EquitySideLetterContext): string {
	const { provider, counterparty } = ctx;
	const effective = formatLongDate(ctx.effectiveDate);
	const consultancyDate = ctx.consultancyDate
		? formatLongDate(ctx.consultancyDate)
		: "[DATE OF CONSULTANCY AGREEMENT]";

	return `# Equity Side Letter

**This Equity Side Letter** (the "**Letter**") is made on ${effective}

**Between**

${renderPartyBlock("Issuer", counterparty)}

**and**

${renderPartyBlock("Recipient", provider)}

(each a "**Party**" and together the "**Parties**").

## Recitals

(A) The Recipient (or its principal, **${provider.signatoryName}**) provides services to the Issuer under a separate consultancy agreement dated ${consultancyDate} (the "**Consultancy Agreement**").

(B) The Parties wish to record, in this Letter, the equity arrangement that is contemplated alongside (but **separate from**) the Consultancy Agreement.

(C) Nothing in this Letter amends, modifies, or supersedes the Consultancy Agreement; nothing in the Consultancy Agreement amends, modifies, or supersedes this Letter. Termination of either does not affect the other except as expressly stated in §6.

## 1. Subject of the equity grant

1.1 The Issuer agrees to grant, and the Recipient agrees to accept, the following equity interest in the Issuer (the "**Equity**"):

| Item | Detail |
|---|---|
| Instrument type | [SHARES / SHARE OPTIONS / ADVISOR STOCK / CONVERTIBLE / SAFE] |
| Class | [SHARE CLASS — e.g. Ordinary, Common, Series Seed] |
| Quantity | [NUMBER OF SHARES OR OPTIONS] |
| Percentage (fully diluted) | [%] as of [REFERENCE DATE] |
| Strike / exercise price (if options) | [PRICE PER SHARE OR "nil"] |
| Issue / grant price (if shares) | [PRICE PER SHARE OR "nil — granted as compensation"] |
| Reference cap table | [LINK OR ATTACHMENT REFERENCE] |

1.2 If the Equity is **share options**, the option agreement governing the grant (option certificate, scheme rules, or equivalent) is attached as **Annex 1** and prevails over this Letter for matters of exercise mechanics, tax elections, and scheme administration.

1.3 If the Equity is **shares** issued on grant, the share certificate, share-purchase agreement, or subscription document is attached as **Annex 1** and prevails over this Letter for matters of issuance mechanics and stamp duty.

## 2. Vesting

2.1 **Vesting schedule:** [TOTAL VESTING PERIOD — e.g. 4 years] from the Vesting Commencement Date, with a [CLIFF — e.g. 12-month] cliff and [VESTING CADENCE — e.g. monthly straight-line thereafter].

2.2 **Vesting Commencement Date:** ${consultancyDate} (aligned with the start of services under the Consultancy Agreement) **OR** [ALTERNATIVE DATE].

2.3 **Acceleration on change of control:** [SINGLE-TRIGGER 100% / DOUBLE-TRIGGER (CoC + termination without cause within 12 months) / NONE]. The Parties agree to record the elected acceleration here unambiguously: **${"[ACCELERATION ELECTION]"}**.

2.4 **Termination of services.** If the Consultancy Agreement terminates:

- **For cause** by the Issuer (gross misconduct, material uncured breach, fraud, or wilful misconduct): unvested Equity lapses on termination; vested Equity is unaffected unless §3 applies.
- **Without cause** by the Issuer, **for convenience** by either party, or **for material breach by the Issuer** by the Recipient: unvested Equity continues to vest only if §2.3 acceleration applies; otherwise unvested Equity lapses on termination and vested Equity is unaffected.
- **By the Recipient for any reason other than Issuer breach:** vesting stops on the termination date; unvested Equity lapses; vested Equity is retained subject to §3.

## 3. Leaver provisions and buy-back

3.1 If applicable under the Issuer's articles, shareholders' agreement, or scheme rules, **leaver provisions** may permit the Issuer (or other shareholders) to repurchase vested or unvested Equity at:

- **Good leaver price:** fair market value as determined by [VALUATION METHOD — e.g. board-appointed independent valuer / most recent priced round / 409A].
- **Bad leaver price:** the lower of original issue price and fair market value, or such other price as set out in the governing documents.

3.2 The Recipient is treated as a **good leaver** unless the Issuer terminates for cause as defined in §2.4 of this Letter (which prevails over any wider definition in the Issuer's standard documents to the extent permitted).

## 4. Anti-dilution, information rights, and pre-emption

4.1 **Anti-dilution.** [NONE / WEIGHTED-AVERAGE / FULL RATCHET — specify].

4.2 **Information rights.** The Recipient is entitled to receive, on written request, the most recent annual accounts and a quarterly cap-table snapshot, until the Recipient ceases to hold any Equity.

4.3 **Pre-emption rights on new issuances.** [APPLIES PRO-RATA / DOES NOT APPLY], subject to customary carve-outs (employee option pools, bona fide acquisitions, conversions of existing instruments).

## 5. Tax, withholding, and filings

5.1 **Recipient responsibility.** The Recipient is solely responsible for any taxes (income tax, capital gains tax, social security, stamp duty, employment taxes) arising on the grant, vesting, exercise, or disposal of the Equity in any jurisdiction.

5.2 **Tax elections.** The Parties acknowledge that elections may be available (e.g. Section 431 election under UK ITEPA 2003 for restricted securities; equivalent Maltese fiscal-unit elections; UK EMI scheme qualification; ISO/NSO classification under US IRC §422). The Recipient is responsible for taking advice from qualified counsel and making any election within the statutory window.

5.3 **No tax advice.** The Issuer does not provide tax advice to the Recipient. The Recipient confirms that this Letter is not relied on as tax advice.

5.4 **Withholding.** If the Issuer is required by law to withhold tax on grant, vesting, or exercise, the Recipient will indemnify the Issuer for any withholding properly accounted for to a tax authority, including by repayment within 30 days of written demand or by a corresponding reduction in cash compensation under the Consultancy Agreement.

## 6. Interaction with the Consultancy Agreement

6.1 **Separate instruments.** Each of this Letter and the Consultancy Agreement is a standalone agreement. Disputes under one do not freeze obligations under the other.

6.2 **Set-off prohibited.** Cash fees due under the Consultancy Agreement are not contingent on the issuance, vesting, or value of the Equity. The Issuer may not withhold cash fees on the basis of equity arrangements, and the Recipient may not withhold services on the basis of cash-fee disputes save as expressly permitted under the Consultancy Agreement.

6.3 **Termination of services.** Termination of the Consultancy Agreement triggers §2.4 of this Letter only and does not, by itself, accelerate or terminate this Letter beyond what §2.4 provides.

## 7. Confidentiality and announcements

7.1 The terms of this Letter are confidential between the Parties and may only be disclosed to professional advisors, tax authorities, current or prospective shareholders bound by equivalent confidentiality, and as required by law.

7.2 Neither Party will issue a public announcement of the Equity grant without the other Party's prior written consent (email is sufficient), except where required by law or stock-exchange rules.

## 8. Governing law and disputes

8.1 **Governing law.** This Letter is governed by the laws of [GOVERNING LAW JURISDICTION — typically the Issuer's place of incorporation, e.g. England and Wales / Malta / Delaware].

8.2 **Forum.** The courts of [FORUM] have non-exclusive jurisdiction over any dispute arising out of or in connection with this Letter, subject to good-faith mediation between authorised representatives of each Party as a precondition to litigation.

8.3 The Parties acknowledge that the Consultancy Agreement may be governed by a different law (e.g. Maltese law in the case of services from a Maltese service provider). That difference is intentional: the equity instrument follows the Issuer; the services instrument follows the Service Provider.

## 9. Boilerplate

9.1 **Entire agreement (equity-side only).** This Letter and its Annexes contain the entire agreement between the Parties on the subject matter of the Equity. It does not affect, and is not affected by, the Consultancy Agreement.

9.2 **Amendments.** Only by signed written agreement between the Parties.

9.3 **Assignment.** Neither Party may assign without the other's written consent, except that the Issuer may assign to a successor on a bona fide change-of-control transaction provided the successor adopts the obligations of this Letter.

9.4 **Counterparts and electronic signature.** This Letter may be executed in counterparts. Electronic signatures are valid and binding.

9.5 **Severability.** If any provision is held unenforceable, the remainder remains in force; the Parties will negotiate in good faith to replace the invalid provision with a valid one having substantially the same effect.

## 10. Disclaimers

This Letter is not legal, tax, or financial advice. Each Party is responsible for taking its own qualified advice before signing. Equity arrangements are jurisdiction-sensitive and the elected jurisdiction in §8.1 should be confirmed with counsel registered in that jurisdiction.

---

## Signatures

${renderSignatureBlock(counterparty)}

${renderSignatureBlock(provider)}

---

## Annex 1 — Governing equity instrument

Attach one of the following, signed in parallel with this Letter:

- Share certificate or share-purchase agreement (for direct share issuance).
- Option certificate and scheme rules (for share options).
- SAFE / convertible loan note (for deferred equity).
- Advisor agreement template under [PROGRAM — e.g. FAST Agreement v3] (for advisor stock).

In the event of conflict between Annex 1 and this Letter, **Annex 1 prevails for issuance and exercise mechanics; this Letter prevails for the relationship between the Equity and the Consultancy Agreement (§6)**.
`;
}
