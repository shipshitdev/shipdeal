import type { CounterpartyProfile } from "../counterparty";
import {
	formatLongDate,
	renderPartyBlock,
	renderSignatureBlock,
} from "../helpers";
import type { ProviderProfile } from "../provider";
import { renderDpaSchedule } from "../schedules/dpa";
import { renderServicesSchedule } from "../schedules/services";

export type MsaContext = {
	provider: ProviderProfile;
	counterparty: CounterpartyProfile;
	effectiveDate?: string;
	paymentTerms?: string;
};

export function renderMsa(ctx: MsaContext): string {
	const { provider, counterparty } = ctx;
	const effective = formatLongDate(ctx.effectiveDate);
	const paymentTerms = ctx.paymentTerms?.trim() || "Net 14 days from invoice date";

	return `# Master Services Agreement

**This Master Services Agreement** (the "**Agreement**") is made on ${effective}

**Between**

${renderPartyBlock("Service Provider", provider)}

**and**

${renderPartyBlock("Client", counterparty)}

(each a "**Party**" and together the "**Parties**").

## Recitals

(A) The Service Provider provides AI architecture, agentic system design, software engineering, and related advisory services.

(B) The Client wishes to engage the Service Provider on the terms set out below, with specific scopes, fees, and timelines documented in one or more Statements of Work entered into under this Agreement.

## 1. Definitions

In this Agreement:

- "**Background IP**" means the intellectual property owned or licensed by the Service Provider before the Effective Date or developed independently of the Services, including methodologies, frameworks, prompt libraries, agent architectures, reusable code components, and tooling.
- "**Confidential Information**" has the meaning given in Section 10.
- "**Deliverables**" means the work product specifically created for the Client under a Statement of Work and identified there as deliverable to the Client.
- "**Effective Date**" means ${effective}.
- "**SOW**" means a written Statement of Work entered into under this Agreement and signed by both Parties.

## 2. Engagement model

2.1 This Agreement sets the framework. Each engagement is documented in an SOW that identifies scope, deliverables, fees, timeline, acceptance criteria, and any deviations from this Agreement. In the event of conflict, the SOW prevails over this Agreement only for the scope it defines, and only where the deviation is expressly stated in the SOW.

2.2 An SOW takes effect when signed by both Parties (electronic signature suffices) or when work commences under written instruction from the Client following a written estimate from the Service Provider.

## 3. Independent contractor

3.1 The Service Provider performs the Services as an independent contractor. Nothing in this Agreement creates a partnership, joint venture, employment, agency, or fiduciary relationship between the Parties.

3.2 The Service Provider is responsible for its own taxes, social security contributions, insurance, and any required registrations under Maltese and other applicable law.

## 4. Services

The Service Provider will perform the services described in Schedule A, as further specified in each SOW. Subcontracting is permitted on prior written notice to the Client; the Service Provider remains responsible for the acts and omissions of its subcontractors.

## 5. Client cooperation

The Client will provide timely access to information, systems, decisions, and personnel reasonably required for the Services. Delays attributable to the Client extend the Service Provider's deadlines on a day-for-day basis.

## 6. Fees, expenses, invoicing

6.1 Fees are set in each SOW. Unless otherwise agreed, fees are invoiced monthly in arrears.

6.2 Pre-approved out-of-pocket expenses (travel, subscriptions, third-party API and model usage) are reimbursable at cost on production of receipts.

6.3 Payment terms: **${paymentTerms}**.

6.4 **Late payment.** Overdue invoices accrue interest at the statutory commercial late-payment rate applicable from time to time under Maltese law (and EU Directive 2011/7/EU as transposed), being the European Central Bank reference rate plus eight (8) percentage points (currently approximately 10.15% per annum as of January 2026), plus the Service Provider's reasonable costs of recovery. The Service Provider may suspend Services after providing fourteen (14) days' written cure notice for non-payment.

## 7. VAT and taxes

7.1 All fees are exclusive of value added tax. The Service Provider will add VAT at the prevailing rate where the supply is subject to Maltese VAT.

7.2 For cross-border B2B supplies, invoices follow the applicable place-of-supply and reverse-charge rules. Where the Client is established outside the European Union, the supply is treated as outside the scope of Maltese VAT under Article 44 of the EU VAT Directive (as transposed); the invoice will note the reverse-charge or outside-scope basis. The Client warrants its tax-status information on request.

7.3 Each Party bears its own income, corporate, payroll, and other taxes arising from this Agreement.

## 8. Intellectual property

8.1 **Deliverables.** Subject to full payment of all undisputed fees for the relevant SOW, the Service Provider assigns to the Client all right, title, and interest in the Deliverables created specifically for that SOW.

8.2 **Background IP.** The Service Provider retains all right, title, and interest in its Background IP. The Service Provider grants the Client a perpetual, royalty-free, non-exclusive, worldwide licence to use Background IP **only as embedded in the Deliverables and for the Client's internal business purposes**. The Client may not use, sublicense, or distribute Background IP on a stand-alone basis.

8.3 **Third-party components.** Open-source and third-party components are licensed under their respective terms; the Service Provider will identify material components on request.

8.4 **Moral rights.** To the extent permitted by Maltese law, the Service Provider waives moral rights in the Deliverables in favour of the Client.

## 9. AI output risk allocation

9.1 The Service Provider's deliverables may include or be produced with the assistance of AI models. The Client acknowledges that AI-generated output is probabilistic and may contain errors, omissions, or hallucinations.

9.2 The Service Provider gives **no warranty** as to the accuracy, completeness, fitness for purpose, or non-infringement of third-party rights in respect of AI-generated content. The implied warranties of merchantability and fitness for a particular purpose are excluded to the maximum extent permitted by Maltese law.

9.3 The Client retains final responsibility for review, validation, and use of AI-generated content. The Client will not use AI-generated content for prohibited or high-risk uses (including life-critical, fully autonomous safety-of-life, or unlawful uses) without independent expert review.

9.4 The Client indemnifies the Service Provider against third-party claims arising from the Client's use, modification, or deployment of AI-generated content beyond the use cases the Parties have agreed in writing.

## 10. Confidentiality

10.1 Each Party (the "Receiving Party") will protect Confidential Information of the other Party (the "Disclosing Party") with at least the same care it uses for its own confidential information of like sensitivity, and in any event with reasonable care. The Receiving Party will use Confidential Information only for the purpose of the Agreement.

10.2 "Confidential Information" means non-public information disclosed by the Disclosing Party that is marked confidential or reasonably should be understood to be confidential, including business plans, customer information, technical know-how, source code, and prompts. It excludes information that is or becomes public through no fault of the Receiving Party, was independently developed without reference to the Confidential Information, was lawfully obtained from a third party without confidentiality obligations, or is required to be disclosed by law or competent court order (with prompt notice to the Disclosing Party where lawful).

10.3 Confidentiality obligations survive termination for **three (3) years** for general Confidential Information, and indefinitely for trade secrets while they remain trade secrets.

## 11. Data protection

The Parties' obligations relating to the processing of personal data are set out in **Schedule C — Data Processing Addendum**.

## 12. Warranties

12.1 The Service Provider warrants that it will perform the Services in a workmanlike manner consistent with industry practice, and that, to its knowledge, the Deliverables (excluding AI-generated content covered by Section 9) do not infringe the intellectual property rights of any third party and do not contain malicious code.

12.2 Except as expressly stated in this Agreement, the Services and Deliverables are provided "as is" and the Service Provider disclaims all other warranties, including warranties of fitness for a particular purpose, uninterrupted use, error-free performance, and merchantability, to the maximum extent permitted by Maltese law.

## 13. Liability

13.1 **Cap.** Each Party's aggregate liability under or in connection with this Agreement is limited to **three (3) times the fees paid by the Client to the Service Provider in the six (6) months immediately preceding the event giving rise to the claim**.

13.2 **Excluded losses.** Neither Party is liable for indirect, special, incidental, consequential, or punitive damages, or for loss of profits, revenue, business opportunity, or data, in each case to the maximum extent permitted by Maltese law.

13.3 **Carve-outs.** The cap and exclusions do not apply to: (a) gross negligence or wilful misconduct; (b) breach of confidentiality obligations under Section 10; (c) breach of data-protection obligations under Schedule C; (d) the Service Provider's IP infringement indemnity under Section 14.1; (e) the Client's payment obligations; or (f) liability that cannot be excluded by Maltese law.

## 14. Indemnities

14.1 The Service Provider will defend and indemnify the Client against third-party claims that the Deliverables (excluding AI-generated content covered by Section 9, Client-supplied materials, modifications made by anyone other than the Service Provider, or use outside the agreed scope) infringe the third party's intellectual property rights, subject to the cap in Section 13.

14.2 The Client will defend and indemnify the Service Provider against third-party claims arising from: (a) Client-supplied materials, data, or instructions; (b) the Client's use, modification, or deployment of Deliverables (including AI-generated content) outside the agreed scope; or (c) the Client's breach of applicable law.

14.3 The indemnified Party will give prompt notice, allow the indemnifying Party to control the defence (subject to settlement requiring the indemnified Party's reasonable consent), and provide reasonable cooperation.

## 15. Term and termination

15.1 This Agreement starts on the Effective Date and continues until terminated under this Section.

15.2 Either Party may terminate this Agreement (and any active SOW) for convenience on **thirty (30) days' written notice**.

15.3 Either Party may terminate immediately on written notice if the other Party commits a material breach that is not cured within fourteen (14) days of written notice specifying the breach, or becomes insolvent.

15.4 On termination: (a) the Service Provider invoices for Services performed up to the termination date and any pre-approved expenses; (b) the Client pays in accordance with Section 6; (c) each Party returns or destroys the other's Confidential Information; and (d) any provision intended to survive does so.

## 16. Non-solicitation of personnel

16.1 During the term of this Agreement and for **twelve (12) months** after termination, neither Party will solicit for employment or engagement any personnel of the other Party who was **materially involved in the Services** during the twelve (12) months preceding solicitation, without the other Party's prior written consent.

16.2 General advertisements, recruiter outreach not specifically targeting the other Party, and pre-existing relationships are not breaches of this Section. There is no general non-compete; the Service Provider runs multiple concurrent engagements.

## 17. General provisions

17.1 **Anti-bribery.** Each Party will comply with all applicable anti-bribery and anti-corruption laws (including the Maltese Prevention of Money Laundering Act, the EU baseline, and the UK Bribery Act 2010 where relevant) and will not offer, give, or receive any bribe in connection with this Agreement.

17.2 **Sanctions and export controls.** Each Party will comply with applicable sanctions regimes (EU, UK, US OFAC, and UN) and export-control rules. Neither Party will use the Services in a manner that would put the other in breach.

17.3 **Assignment.** Neither Party may assign this Agreement without the other Party's prior written consent, except that either Party may assign to an affiliate or to a successor in connection with a merger or sale of substantially all assets, on written notice.

17.4 **Severability.** If any provision is held unenforceable, the remainder continues in full force; the unenforceable provision is reformed to the minimum extent necessary to render it enforceable.

17.5 **Entire agreement.** This Agreement, together with each SOW and each Schedule, is the entire agreement of the Parties on its subject matter and supersedes prior discussions and understandings.

17.6 **Amendment.** No amendment is effective unless in writing and signed by both Parties or their authorised representatives.

17.7 **Counterparts and electronic signature.** This Agreement may be signed in counterparts and by electronic signature, each of which is an original and which together constitute one agreement. The Parties acknowledge electronic signatures under the Maltese Electronic Commerce Act and EU Regulation 910/2014 (eIDAS).

17.8 **Order of precedence.** In conflict: (a) signed amendments; (b) the SOW only as to its scope; (c) the body of this Agreement; (d) the Schedules.

## 18. Notices

Notices are effective when delivered by email to the contact addresses set out below or by registered post to the addresses on the first page. Either Party may update its contact details by written notice.

- Service Provider: ${provider.contactEmail}
- Client: ${counterparty.contactEmail ?? "[CLIENT EMAIL]"}

## 19. Governing law and dispute resolution

19.1 This Agreement is governed by the **laws of Malta**, excluding its conflict-of-laws rules.

19.2 The Parties will first attempt good-faith mediation of any dispute. Either Party may commence mediation by written notice; if the dispute is not resolved within thirty (30) days, either Party may submit the dispute to the **non-exclusive jurisdiction of the courts of Malta**.

19.3 Nothing in this Section prevents either Party from seeking urgent injunctive relief in any court of competent jurisdiction.

## 20. Signatures

The Parties have signed this Agreement on the dates shown.

${renderSignatureBlock(provider)}

---

${renderSignatureBlock(counterparty)}

---

${renderServicesSchedule()}

---

## Schedule B — Statement of Work template

| Field | Value |
| --- | --- |
| SOW number | SOW-[NUMBER] |
| Effective date | [DATE] |
| Project name | [NAME] |
| Scope summary | [DESCRIPTION] |
| Deliverables | [LIST] |
| Acceptance criteria | [LIST] |
| Milestones and timeline | [LIST] |
| Fees | [AMOUNT AND CURRENCY; FIXED / TIME-AND-MATERIALS / RETAINER] |
| Invoicing schedule | [SCHEDULE] |
| Expenses | [Pre-approved categories] |
| Out-of-scope items | [LIST] |
| Key personnel (Service Provider) | [NAMES] |
| Key personnel (Client) | [NAMES] |
| Special terms | [Any deviations from the MSA, expressly stated] |

Signed for the Service Provider: _______________________________

Signed for the Client: _______________________________

---

${renderDpaSchedule({ provider, counterparty })}
`;
}
