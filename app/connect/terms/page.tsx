/**
 * /connect/terms — Terms of Service for the Opera × Greyfinch integration.
 * NOTE: working draft for the beta — have counsel review before GA.
 */

export const metadata = { title: "Opera — Terms of Service" };

const EFFECTIVE_DATE = "July 10, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex justify-center p-6 sm:p-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-2">Opera AI</div>
          <h1 className="text-2xl font-semibold">Terms of Service</h1>
          <p className="text-sm text-gray-500 mt-1">Effective {EFFECTIVE_DATE} · Opera patient-education video service for Greyfinch</p>
        </div>

        <div className="space-y-6 text-[15px] leading-relaxed text-gray-700">
          <Section n="1" title="The service">
            Opera AI (&quot;Opera&quot;, &quot;we&quot;) provides software that generates personalized patient-education
            videos from information your practice provides through the Greyfinch practice-management
            system. The service is educational only: videos explain diagnoses and treatments in plain
            language and are not medical advice, a diagnosis, or a treatment recommendation. Your
            clinicians remain solely responsible for all clinical decisions and for reviewing content
            shared with patients.
          </Section>

          <Section n="2" title="Your account and API key">
            Your clinic receives an API key that identifies your practice. You are responsible for
            keeping it confidential and for all activity under it. Tell us promptly at
            opera@getopera.ai if you believe it has been compromised and we will rotate it.
          </Section>

          <Section n="3" title="Free trial and billing">
            New accounts start with a 30-day free trial. Unless you cancel before the trial ends, your
            subscription converts to a paid monthly plan at the rate shown at signup and renews monthly
            until canceled. You can cancel anytime, effective at the end of the current billing period.
            Fees are non-refundable except where required by law. We may change pricing with at least
            30 days&apos; notice.
          </Section>

          <Section n="4" title="Patient data and privacy">
            You represent that you are authorized to share the patient information you submit (such as
            first names, treatment details, and chart notes) and that appropriate patient consents and
            notices are in place. Opera uses this information only to generate and deliver the requested
            videos and operate the service, and applies commercially reasonable administrative and
            technical safeguards. Where the service involves protected health information under HIPAA,
            the parties will execute Opera&apos;s Business Associate Agreement; contact opera@getopera.ai
            if you have not received one.
          </Section>

          <Section n="5" title="Acceptable use">
            Don&apos;t use the service to create misleading or unlawful content, resell it without a
            written agreement with Opera, attempt to disrupt or reverse-engineer it, or exceed
            reasonable usage designed to keep the service fast for every practice.
          </Section>

          <Section n="6" title="Availability and support">
            We aim for high availability but the service is provided &quot;as is&quot; without warranties of
            any kind. Greyfinch is a separate company; issues within the Greyfinch platform itself are
            governed by your agreement with Greyfinch. Support: opera@getopera.ai.
          </Section>

          <Section n="7" title="Liability">
            To the maximum extent permitted by law, Opera&apos;s total liability arising out of the service
            is limited to the fees you paid in the twelve months before the claim, and neither party is
            liable for indirect, incidental, or consequential damages.
          </Section>

          <Section n="8" title="Termination">
            You may cancel at any time. We may suspend or terminate accounts for breach of these terms
            or non-payment. On termination your API key is deactivated; previously delivered videos
            already shared with patients remain viewable at our discretion.
          </Section>

          <Section n="9" title="Changes">
            We may update these terms; material changes will be notified by email at least 14 days
            before they take effect. Continued use after that constitutes acceptance.
          </Section>
        </div>

        <p className="mt-10 mb-6 text-[13px] text-gray-400">
          Questions? <a href="mailto:opera@getopera.ai" className="underline">opera@getopera.ai</a>
        </p>
      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900 mb-1.5">{n}. {title}</h2>
      <p>{children}</p>
    </section>
  );
}
