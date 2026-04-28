import type { CounterpartyProfile } from "../counterparty";
import {
	formatLongDate,
	renderPartyBlock,
	renderSignatureBlock,
} from "../helpers";
import type { ProviderProfile } from "../provider";
import { renderDpaSchedule } from "../schedules/dpa";
import { renderServicesSchedule } from "../schedules/services";
import { renderUnitsSchedule } from "../schedules/units";

export type AiArchitectContext = {
	provider: ProviderProfile;
	counterparty: CounterpartyProfile;
	effectiveDate?: string;
	paymentTerms?: string;
};

export function renderAiArchitect(ctx: AiArchitectContext): string {
	const { provider, counterparty } = ctx;
	const effective = formatLongDate(ctx.effectiveDate ?? "2026-04-27");
	const paymentTerms = ctx.paymentTerms?.trim() || "Net 14 days from invoice date";

	return `# AI Architect Consultancy Agreement

**This AI Architect Consultancy Agreement** (the "**Agreement**") is made on ${effective}

**Between**

${renderPartyBlock("Service Provider", provider)}

**and**

${renderPartyBlock("Client", counterparty)}

(each a "**Party**" and together the "**Parties**").

## Recitals

(A) The Service Provider provides AI architecture, agentic system design, and related advisory services, and operates AI agents on behalf of clients as a managed service.

(B) The Client wishes to engage the Service Provider as an **AI Architect** on a monthly retainer to provide the services described below.

## 1. Definitions

In this Agreement:

- "**Background IP**" means the intellectual property owned or licensed by the Service Provider before the Effective Date or developed independently of the Services, including methodologies, frameworks, prompt libraries, agent architectures, reusable code components, and tooling.
- "**Confidential Information**" has the meaning given in Section 11.
- "**Deliverables**" means the work product specifically created for the Client and identified in the monthly Unit confirmation under Schedule B.
- "**Effective Date**" means ${effective}.
- "**Probationary Period**" means the period of three (3) months following the Effective Date, as set out in Section 16.
- "**Unit**" has the meaning given in Schedule B.

## 2. Role: AI Architect

2.1 The Service Provider is engaged as an **AI Architect**. The Service Provider is **not** appointed as a Chief Technology Officer, officer, director, employee, or agent of the Client, and has no authority to bind the Client.

2.2 Responsibilities include:

- AI system architecture and agentic platform design for the Client's product;
- operating the Service Provider's AI agents on the Client's behalf within agreed workflows;
- LLM integration strategy, model selection, and cost-optimisation guidance;
- technical advisory on the Client's AI roadmap, evaluation framework, and guardrails;
- the specific Units agreed for each calendar month under Schedule B.

2.3 Express exclusions. The Services do **not** include line-management of the Client's employees, performance reviews of Client personnel, fiduciary duties, statutory officer duties, full-time work, or being held out publicly as the Client's CTO or as a member of its executive team.

## 3. Independent contractor

3.1 The Service Provider performs the Services as an independent contractor. Nothing in this Agreement creates a partnership, joint venture, employment, agency, or fiduciary relationship between the Parties.

3.2 The Service Provider is responsible for its own taxes, social security contributions, insurance, and any required registrations under Maltese and other applicable law.

3.3 The Client is not responsible for deducting or withholding any income tax, social-security contributions, pension contributions, unemployment insurance, employer health contributions, or other statutory deductions in respect of the Service Provider.

## 4. Services and Units

4.1 The Service Provider's services for each calendar month are organised as **three (3) Units** of deliverable-based work, as set out in **Schedule B**. A Unit is **not a measure of hours**; the Service Provider does not sell hourly time under this Agreement.

4.2 The unit allocation for each month is confirmed in writing (email is sufficient) by the first business day of that month.

4.3 The skills offering and types of work the Service Provider may perform are set out in **Schedule A**.

## 5. Subcontracting

The Service Provider may subcontract elements of the Services on prior written notice to the Client. The Service Provider remains responsible for the acts and omissions of its subcontractors.

## 6. Client cooperation

The Client will provide timely access to information, systems, decisions, and personnel reasonably required for the Services. Delays attributable to the Client extend the Service Provider's deadlines on a day-for-day basis and do not reduce the monthly retainer.

## 7. Fees, expenses, invoicing

7.1 **Retainer.** The Client will pay the Service Provider a monthly retainer of **USD 1,500** (one thousand five hundred United States Dollars) per calendar month, comprising **three (3) Units of USD 500 each** as set out in Schedule B.

7.2 **Overage.** Additional Units beyond the three monthly Units are billable at the same rate of **USD 500 per Unit**, subject to prior written approval as set out in Schedule B.

7.3 **Pre-approved out-of-pocket expenses** (travel, subscriptions, third-party API and model usage incurred for the Client's benefit) are reimbursable at cost on production of receipts.

7.4 **Invoicing.** The Service Provider issues an invoice on the last business day of each calendar month covering the Units delivered (and any approved overage Units) for that month.

7.5 **Payment terms: ${paymentTerms}.**

7.6 **Late payment.** Overdue invoices accrue interest at the statutory commercial late-payment rate applicable from time to time under Maltese law (and EU Directive 2011/7/EU as transposed), being the European Central Bank reference rate plus eight (8) percentage points (currently approximately 10.15% per annum as of January 2026), plus the Service Provider's reasonable costs of recovery. The Service Provider may suspend Services after providing fourteen (14) days' written cure notice for non-payment.

7.7 **No withhold-payment by election.** The Client may not withhold payment for delivered and accepted Units other than through the disputed-Unit process in Schedule B §B.4.

## 8. VAT and taxes

8.1 All fees are exclusive of value added tax. The Service Provider will add VAT at the prevailing rate where the supply is subject to Maltese VAT.

8.2 **Cross-border B2B supply to the United Kingdom.** The Client is a United Kingdom company. Under the Maltese place-of-supply rules for B2B services post-Brexit, the supply is treated as **outside the scope of Maltese VAT**, with the reverse-charge rules of the Client's jurisdiction applying as relevant. The Service Provider's invoices will reflect this treatment with an appropriate "Outside scope of Maltese VAT — reverse charge applies in the customer's jurisdiction" note. The Client warrants that it is acting as a taxable person for the purposes of this supply and will provide its VAT or tax-status information on request.

8.3 Each Party bears its own income, corporate, payroll, and other taxes arising from this Agreement.

## 9. Intellectual property

9.1 **Deliverables.** Subject to full payment of all undisputed fees, the Service Provider assigns to the Client all right, title, and interest in the Deliverables created specifically for the Client under each accepted Unit.

9.2 **Background IP.** The Service Provider retains all right, title, and interest in its Background IP, including the AI agents the Service Provider operates on the Client's behalf. The Service Provider grants the Client a perpetual, royalty-free, non-exclusive, worldwide licence to use Background IP **only as embedded in the Deliverables and for the Client's internal business purposes**. The Client may not use, sublicense, distribute, replicate, or operate Background IP (including the agents themselves and their underlying prompts, code, and orchestration logic) on a stand-alone basis or after termination, save through the Deliverables.

9.3 **Third-party components.** Open-source and third-party components are licensed under their respective terms; the Service Provider will identify material components on request.

9.4 **Moral rights.** To the extent permitted by Maltese law, the Service Provider waives moral rights in the Deliverables in favour of the Client.

## 10. AI output risk allocation

10.1 The Services include the operation of AI agents and the production of AI-generated content. The Client acknowledges that AI-generated output is probabilistic and may contain errors, omissions, or hallucinations.

10.2 The Service Provider gives **no warranty** as to the accuracy, completeness, fitness for purpose, or non-infringement of third-party rights in respect of AI-generated content. The implied warranties of merchantability and fitness for a particular purpose are excluded to the maximum extent permitted by Maltese law.

10.3 The Client retains final responsibility for review, validation, and use of AI-generated content. The Client will not use AI-generated content for prohibited or high-risk uses (including life-critical, fully autonomous safety-of-life, or unlawful uses) without independent expert review.

10.4 The Client indemnifies the Service Provider against third-party claims arising from the Client's use, modification, or deployment of AI-generated content beyond the use cases the Parties have agreed in writing.

## 11. Confidentiality

11.1 Each Party (the "Receiving Party") will protect Confidential Information of the other Party (the "Disclosing Party") with at least the same care it uses for its own confidential information of like sensitivity, and in any event with reasonable care. The Receiving Party will use Confidential Information only for the purpose of the Agreement.

11.2 "Confidential Information" means non-public information disclosed by the Disclosing Party that is marked confidential or reasonably should be understood to be confidential, including business plans, customer information, technical know-how, source code, and prompts. Standard carve-outs apply for information that is or becomes public through no fault of the Receiving Party, was independently developed without reference to the Confidential Information, was lawfully obtained from a third party without confidentiality obligations, or is required to be disclosed by law or competent court order (with prompt notice to the Disclosing Party where lawful).

11.3 Confidentiality obligations survive termination for **three (3) years** for general Confidential Information, and indefinitely for trade secrets while they remain trade secrets.

## 12. Data protection

The Parties' obligations relating to the processing of personal data are set out in **Schedule C — Data Processing Addendum**.

## 13. Warranties

13.1 The Service Provider warrants that it will perform the Services in a workmanlike manner consistent with industry practice, and that, to its knowledge, the Deliverables (excluding AI-generated content covered by Section 10) do not infringe the intellectual property rights of any third party and do not contain malicious code.

13.2 Except as expressly stated in this Agreement, the Services and Deliverables are provided "as is" and the Service Provider disclaims all other warranties, including warranties of fitness for a particular purpose, uninterrupted use, error-free performance, and merchantability, to the maximum extent permitted by Maltese law.

## 14. Liability

14.1 **Cap.** Each Party's aggregate liability under or in connection with this Agreement is limited to **three (3) times the fees paid by the Client to the Service Provider in the six (6) months immediately preceding the event giving rise to the claim**.

14.2 **Excluded losses.** Neither Party is liable for indirect, special, incidental, consequential, or punitive damages, or for loss of profits, revenue, business opportunity, or data, in each case to the maximum extent permitted by Maltese law.

14.3 **Carve-outs.** The cap and exclusions do not apply to: (a) gross negligence or wilful misconduct; (b) breach of confidentiality obligations under Section 11; (c) breach of data-protection obligations under Schedule C; (d) the Service Provider's IP infringement indemnity under Section 15.1; (e) the Client's payment obligations; or (f) liability that cannot be excluded by Maltese law.

## 15. Indemnities

15.1 The Service Provider will defend and indemnify the Client against third-party claims that the Deliverables (excluding AI-generated content covered by Section 10, Client-supplied materials, modifications made by anyone other than the Service Provider, or use outside the agreed scope) infringe the third party's intellectual property rights, subject to the cap in Section 14.

15.2 The Client will defend and indemnify the Service Provider against third-party claims arising from: (a) Client-supplied materials, data, or instructions; (b) the Client's use, modification, or deployment of Deliverables (including AI-generated content) outside the agreed scope; or (c) the Client's breach of applicable law.

15.3 The indemnified Party will give prompt notice, allow the indemnifying Party to control the defence (subject to settlement requiring the indemnified Party's reasonable consent), and provide reasonable cooperation.

## 16. Term, probation, and termination

16.1 This Agreement starts on the Effective Date and continues until terminated under this Section.

16.2 **Probationary Period.** The first three (3) months following the Effective Date are a Probationary Period. During the Probationary Period, either Party may terminate the Agreement on **seven (7) days' written notice** without cause.

16.3 **After the Probationary Period.** Either Party may terminate this Agreement for convenience on **thirty (30) days' written notice**.

16.4 **For-cause termination.** Either Party may terminate immediately on written notice if the other Party commits a material breach that is not cured within fourteen (14) days of written notice specifying the breach, or becomes insolvent.

16.5 **On termination:** (a) the Service Provider invoices for accepted Units up to the termination date and any pre-approved expenses; (b) the Client pays in accordance with Section 7; (c) each Party returns or destroys the other's Confidential Information; (d) the Service Provider stops operating any agents on the Client's behalf and the Client receives the Deliverables produced for accepted Units; and (e) any provision intended to survive does so.

## 17. Non-solicitation of personnel

17.1 During the term of this Agreement and for **twelve (12) months** after termination, neither Party will solicit for employment or engagement any personnel of the other Party who was **materially involved in the Services** during the twelve (12) months preceding solicitation, without the other Party's prior written consent.

17.2 General advertisements, recruiter outreach not specifically targeting the other Party, and pre-existing relationships are not breaches of this Section. There is no general non-compete; the Service Provider runs multiple concurrent engagements and is free to do so.

## 18. General provisions

18.1 **Anti-bribery.** Each Party will comply with all applicable anti-bribery and anti-corruption laws (including the Maltese Prevention of Money Laundering Act, the EU baseline, and the UK Bribery Act 2010) and will not offer, give, or receive any bribe in connection with this Agreement.

18.2 **Sanctions and export controls.** Each Party will comply with applicable sanctions regimes (EU, UK, US OFAC, and UN) and export-control rules. Neither Party will use the Services in a manner that would put the other in breach.

18.3 **Assignment.** Neither Party may assign this Agreement without the other Party's prior written consent, except that either Party may assign to an affiliate or to a successor in connection with a merger or sale of substantially all assets, on written notice.

18.4 **Severability.** If any provision is held unenforceable, the remainder continues in full force; the unenforceable provision is reformed to the minimum extent necessary to render it enforceable.

18.5 **Entire agreement.** This Agreement, together with each Schedule, is the entire agreement of the Parties on its subject matter and supersedes all prior discussions, understandings, and any prior consultancy or services agreement between the Parties on the same subject matter (including, for the avoidance of doubt, the Consultant Agreement dated 23 April 2026).

18.6 **Amendment.** No amendment is effective unless in writing and signed by both Parties or their authorised representatives.

18.7 **Counterparts and electronic signature.** This Agreement may be signed in counterparts and by electronic signature, each of which is an original and which together constitute one agreement. The Parties acknowledge electronic signatures under the Maltese Electronic Commerce Act and EU Regulation 910/2014 (eIDAS).

18.8 **Order of precedence.** In conflict: (a) signed amendments; (b) the body of this Agreement; (c) the Schedules.

## 19. Notices

Notices are effective when delivered by email to the contact addresses set out below or by registered post to the addresses on the first page. Either Party may update its contact details by written notice.

- Service Provider: ${provider.contactEmail}
- Client: ${counterparty.contactEmail ?? "[CLIENT EMAIL]"}

## 20. Governing law and dispute resolution

20.1 This Agreement is governed by the **laws of Malta**, excluding its conflict-of-laws rules.

20.2 The Parties will first attempt good-faith mediation of any dispute. Either Party may commence mediation by written notice; if the dispute is not resolved within thirty (30) days, either Party may submit the dispute to the **non-exclusive jurisdiction of the courts of Malta**.

20.3 Nothing in this Section prevents either Party from seeking urgent injunctive relief in any court of competent jurisdiction.

## 21. Signatures

The Parties have signed this Agreement on the dates shown.

${renderSignatureBlock(provider)}

---

${renderSignatureBlock(counterparty)}

---

${renderServicesSchedule()}

---

${renderUnitsSchedule()}

---

${renderDpaSchedule({ provider, counterparty })}
`;
}
