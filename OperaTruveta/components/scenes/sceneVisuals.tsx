'use client';

/**
 * sceneVisuals — the animated, code-drawn visual system for patient education videos.
 *
 * Every scene is a React + Framer Motion component (no stock footage). VideoSceneCanvas
 * dispatches a StoryboardScene to the right animated renderer based on its visualType,
 * with a few category-aware overrides so cases like medication, language access, recovery,
 * and privacy get bespoke visuals.
 *
 * Hard rule preserved in every visual: education only. The lab scene never interprets a
 * result; the medication scene never tells anyone to change a medication. Everything
 * routes back to the care team.
 */

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
  FlaskConical,
  FileText,
  MessageSquare,
  Users,
  MapPin,
  Lock,
  HelpCircle,
  Quote,
  Database,
  Languages,
  Pill,
  HeartPulse,
  Sparkles,
  ArrowRight,
  UserCheck,
  Stethoscope,
  Clock,
  BadgeCheck,
  Phone,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import type { DemoUseCase, StoryboardScene, VisualType } from '@/lib/types';
import { demoUseCases } from '@/lib/demoData';
import { cn } from '@/lib/utils';

const FALLBACK_USE_CASE = demoUseCases[0];

export interface SceneProps {
  useCase: DemoUseCase;
  scene: StoryboardScene;
}

/* ----------------------------------------------------------------------------- helpers */

export const firstName = (u: DemoUseCase) => u.patient.name.split(' ')[0];

function iconFor(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] ?? Sparkles;
}

const ease = [0.22, 1, 0.36, 1] as const;

const bgFor = (visualType: VisualType) => {
  switch (visualType) {
    case 'title-card':
    case 'closing-card':
      return 'from-navy-800 via-navy-900 to-navy-950';
    case 'lab-card':
    case 'comparison':
      return 'from-sky-800 via-navy-900 to-navy-950';
    case 'source-panel':
    case 'consent-panel':
      return 'from-slate-700 via-navy-900 to-navy-950';
    case 'map-route':
      return 'from-teal-800 via-navy-900 to-navy-950';
    default:
      return 'from-teal-700 via-navy-900 to-navy-950';
  }
};

/** Common cinematic scene frame: gradient, grid, grain, padded content. */
function SceneShell({
  visualType,
  children,
  className,
}: {
  visualType: VisualType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-center overflow-hidden bg-gradient-to-br p-7 sm:p-10',
        bgFor(visualType),
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Eyebrow({ children, icon: Icon }: { children: React.ReactNode; icon?: LucideIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-teal-200 backdrop-blur"
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </motion.div>
  );
}

function Headline({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease }}
      className={cn(
        'mt-4 max-w-2xl text-balance text-2xl font-semibold leading-tight text-white sm:text-[2rem]',
        className,
      )}
    >
      {text}
    </motion.h3>
  );
}

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};
const listItem = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
};

/* ----------------------------------------------------------------------- derivations */

function prepItems(u: DemoUseCase): string[] {
  const items: string[] = ['Write your questions down before the visit'];
  if (u.patient.caregiver) items.push(`Share this summary with ${u.patient.caregiver.name}`);
  u.patient.barriers.slice(0, 1).forEach((b) => items.push(`Plan ahead for: ${b.toLowerCase()}`));
  items.push('Bring a list of anything you currently take');
  items.push('Tell your care team what worries you most');
  return items.slice(0, 5);
}

function questionItems(u: DemoUseCase): string[] {
  const qs = u.patient.goals.slice(0, 3).map((g) => g.replace(/^([a-z])/, (m) => m.toUpperCase()));
  if (qs.length < 3 && u.patient.concerns[0]) qs.push(u.patient.concerns[0].acknowledgedAs);
  return qs.slice(0, 4);
}

/* ============================================================================ SCENES */

/** title-card — warm, personalized opener. */
export function PatientIntroScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Sparkles}>For {firstName(useCase)}, {useCase.patient.age}</Eyebrow>
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, ease }}
        className="mt-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-200 ring-1 ring-white/15 backdrop-blur"
      >
        <HeartPulse className="h-7 w-7" />
      </motion.span>
      <Headline text={scene.onScreenText} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-md text-sm leading-relaxed text-white/60"
      >
        A short, personal explanation from your care team.
      </motion.p>
      <div className="mt-6 flex gap-2">
        {['Educational', useCase.patient.language].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.1 }}
            className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </SceneShell>
  );
}

/** lab-card — describes WHAT a test looks at. Never interprets a result. */
export function LabResultScene({ useCase, scene }: SceneProps) {
  const rows = ['What this test looks at', 'Why it is ordered', 'What happens next'];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={FlaskConical}>Understanding the test</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.div variants={listStagger} initial="hidden" animate="show" className="mt-5 space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r}
            variants={listItem}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
          >
            <span className="text-sm text-white/80">{r}</span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '38%' }}
              transition={{ delay: 0.6 + i * 0.18, duration: 0.7, ease }}
              className="ml-4 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-sky-400"
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, ease }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3.5 py-1.5 text-xs font-medium text-amber-100"
      >
        <ShieldCheck className="h-4 w-4" />
        Your care team will go over your actual results with you
      </motion.div>
    </SceneShell>
  );
}

/** checklist — preparation items revealing one-by-one. */
export function ChecklistScene({ useCase, scene }: SceneProps) {
  const items = prepItems(useCase);
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={CheckCircle2}>A simple way to prepare</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-5 space-y-2.5">
        {items.map((it) => (
          <motion.li key={it} variants={listItem} className="flex items-center gap-3">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 18 }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-400 text-navy-900"
            >
              <CheckCircle2 className="h-4 w-4" />
            </motion.span>
            <span className="text-sm text-white/85">{it}</span>
          </motion.li>
        ))}
      </motion.ul>
    </SceneShell>
  );
}

/** calendar reminder — preventive/procedure scheduling. */
export function CalendarReminderScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={CalendarDays}>Your reminder</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-5 flex items-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 14, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ ease }}
          className="w-32 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl"
        >
          <div className="bg-teal-500 py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
            Upcoming
          </div>
          <div className="grid grid-cols-7 gap-1 p-2.5">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.01 }}
                className={cn(
                  'flex h-3 w-3 items-center justify-center rounded-[3px] text-[6px]',
                  i === 18 ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-300',
                )}
              >
                {i === 18 ? '●' : ''}
              </motion.span>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          {['No rush — you choose the timing', 'Bring your questions', 'Talk options through with your team'].map(
            (t) => (
              <p key={t} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                {t}
              </p>
            ),
          )}
        </motion.div>
      </div>
    </SceneShell>
  );
}

/** consent / privacy education — sections glowing softly. */
export function ConsentEducationScene({ useCase, scene }: SceneProps) {
  const lines = ['Participation is always voluntary', 'You can ask questions anytime', 'You can change your mind'];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={FileText}>Understanding consent</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ease }}
        className="mt-5 max-w-md rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
      >
        {lines.map((l, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0.4, boxShadow: '0 0 0px rgba(20,181,168,0)' }}
            animate={{
              opacity: 1,
              boxShadow: [
                '0 0 0px rgba(20,181,168,0)',
                '0 0 24px rgba(20,181,168,0.35)',
                '0 0 0px rgba(20,181,168,0)',
              ],
            }}
            transition={{ delay: 0.5 + i * 0.5, duration: 1.4 }}
            className="mb-2 flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2.5 last:mb-0"
          >
            <CheckCircle2 className="h-4 w-4 text-teal-300" />
            <span className="text-sm text-white/85">{l}</span>
          </motion.div>
        ))}
      </motion.div>
    </SceneShell>
  );
}

/** privacy / de-identification diagram. */
export function PrivacyDataScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Lock}>How your privacy is protected</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-6 flex items-center gap-3">
        <Node icon={UserCheck} label="Your record" delay={0.3} tone="white" />
        <Flow delay={0.6} />
        <Node icon={Lock} label="De-identified" delay={0.9} tone="teal" />
        <Flow delay={1.2} />
        <Node icon={Database} label="Research" delay={1.5} tone="white" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-5 text-sm text-white/60"
      >
        Identifying details are removed before data is ever used for research.
      </motion.p>
    </SceneShell>
  );
}

function Node({
  icon: Icon,
  label,
  delay,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  delay: number;
  tone: 'white' | 'teal';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      className="flex flex-col items-center gap-2"
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl ring-1 backdrop-blur',
          tone === 'teal' ? 'bg-teal-400/20 text-teal-200 ring-teal-300/30' : 'bg-white/10 text-white ring-white/15',
        )}
      >
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-[11px] font-medium text-white/70">{label}</span>
    </motion.div>
  );
}

function Flow({ delay }: { delay: number }) {
  return (
    <div className="relative h-px w-10 overflow-hidden bg-white/15">
      <motion.span
        className="absolute inset-y-0 left-0 w-4 bg-teal-300"
        initial={{ x: '-100%' }}
        animate={{ x: '300%' }}
        transition={{ delay, duration: 1, repeat: Infinity, repeatDelay: 1 }}
      />
    </div>
  );
}

/** portal message — chat bubbles popping in. */
export function PortalMessageScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={MessageSquare}>From your care team</Eyebrow>
      <div className="mt-5 max-w-md space-y-3">
        <Bubble side="left" delay={0.3}>
          {scene.onScreenText}
        </Bubble>
        <Bubble side="left" delay={0.9}>
          We’re here to help you understand the next step — no pressure.
        </Bubble>
        <Bubble side="right" delay={1.5}>
          That’s really helpful, thank you.
        </Bubble>
      </div>
    </SceneShell>
  );
}

function Bubble({
  side,
  delay,
  children,
}: {
  side: 'left' | 'right';
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('flex', side === 'right' ? 'justify-end' : 'justify-start')}
    >
      <span
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          side === 'right'
            ? 'rounded-br-sm bg-teal-500 text-white'
            : 'rounded-bl-sm bg-white/10 text-white/90 backdrop-blur',
        )}
      >
        {children}
      </span>
    </motion.div>
  );
}

/** care journey / discharge / recovery timeline — nodes filling. */
export function CareJourneyScene({ useCase, scene }: SceneProps) {
  const stage = useCase.clinicalContext.journeyStage;
  const stops = [stage, 'This education', 'Prepare', 'Your care team'];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Clock}>Where you are on your journey</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-8 flex items-center">
        {stops.map((s, i) => (
          <div key={s} className="flex flex-1 items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.4, type: 'spring', stiffness: 300, damping: 18 }}
              className="flex flex-col items-center"
            >
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border-2',
                  i <= 1 ? 'border-teal-400 bg-teal-400 text-navy-900' : 'border-white/30 text-white/50',
                )}
              >
                {i <= 1 ? <CheckCircle2 className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
              </span>
              <span className="mt-2 w-20 text-center text-[11px] font-medium text-white/70">{s}</span>
            </motion.div>
            {i < stops.length - 1 && (
              <div className="relative mx-1 h-px flex-1 bg-white/15">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: i < 1 ? '100%' : '0%' }}
                  transition={{ delay: 0.6 + i * 0.4, duration: 0.6 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

export const DischargeTimelineScene = CareJourneyScene;

/** medication education — safe framing, no changes recommended. */
export function MedicationEducationScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Pill}>About your medication questions</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-5 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
        {[
          { icon: HelpCircle, t: 'It’s okay to have questions' },
          { icon: MessageSquare, t: 'Ask before changing anything' },
          { icon: Stethoscope, t: 'Your team knows your full picture' },
          { icon: ShieldCheck, t: 'Never stop on your own' },
        ].map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.12, ease }}
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 backdrop-blur"
          >
            <c.icon className="h-5 w-5 text-teal-300" />
            <span className="text-sm text-white/85">{c.t}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

/** bilingual / language access — captions switching EN ⇄ ES. */
export function LanguageAccessScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Languages}>En su idioma preferido</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-6 max-w-md space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-teal-300/30 bg-teal-400/10 px-4 py-3"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-200">Español</p>
          <p className="mt-1 text-sm text-white">Explicación clara y sencilla, con subtítulos grandes.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">English caption</p>
          <p className="mt-1 text-sm text-white/80">Clear, simple explanation with large captions.</p>
        </motion.div>
      </div>
    </SceneShell>
  );
}

/** caregiver summary — shareable card. */
export function CaregiverSummaryScene({ useCase, scene }: SceneProps) {
  const cg = useCase.patient.caregiver;
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Users}>{cg ? `For ${cg.name}` : 'For your caregiver'}</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 18, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: 0.3, ease }}
        className="mt-5 max-w-sm rounded-2xl border border-white/15 bg-white p-4 text-navy-900 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-700">
            <Users className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold">Caregiver summary</p>
          <BadgeCheck className="ml-auto h-4 w-4 text-teal-500" />
        </div>
        <div className="mt-3 space-y-2">
          {['What the visit is about', 'Questions to bring', 'Who to contact'].map((t, i) => (
            <motion.p
              key={t}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="flex items-center gap-2 text-sm text-slate-600"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
              {t}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </SceneShell>
  );
}

/** question cards — sliding in. */
export function QuestionCardsScene({ useCase, scene }: SceneProps) {
  const qs = questionItems(useCase);
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={HelpCircle}>Questions you might ask</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.div variants={listStagger} initial="hidden" animate="show" className="mt-5 space-y-2.5">
        {qs.map((q) => (
          <motion.div
            key={q}
            variants={listItem}
            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
          >
            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
            <span className="text-sm text-white/85">{q}</span>
          </motion.div>
        ))}
      </motion.div>
    </SceneShell>
  );
}

/** quote — patient concern, acknowledged warmly. */
export function QuoteScene({ useCase, scene }: SceneProps) {
  const concern = useCase.patient.concerns[0];
  return (
    <SceneShell visualType={scene.visualType}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease }}
      >
        <Quote className="h-10 w-10 text-teal-300/60" />
      </motion.div>
      <Headline text={concern ? `“${concern.quote}”` : scene.onScreenText} className="mt-3 text-xl italic sm:text-2xl" />
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 max-w-md text-sm leading-relaxed text-white/70"
      >
        {concern ? concern.acknowledgedAs : scene.narration}
      </motion.p>
    </SceneShell>
  );
}

/** source transparency — source cards revealing/flipping. */
export function SourceTransparencyScene({ useCase, scene }: SceneProps) {
  const cards = [
    { icon: Database, label: 'Real-world evidence theme', value: useCase.evidenceTheme.theme },
    { icon: FileText, label: 'Approved content', value: useCase.approvedContent.title },
    { icon: ShieldCheck, label: 'Reviewed', value: `${useCase.approvedContent.version} · ${useCase.approvedContent.lastReviewed}` },
  ];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Database}>Where this comes from</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-5 grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, rotateY: 60 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.4 + i * 0.2, ease }}
            style={{ transformPerspective: 600 }}
            className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur"
          >
            <c.icon className="h-5 w-5 text-teal-300" />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-white/50">{c.label}</p>
            <p className="mt-0.5 text-xs leading-snug text-white/85">{c.value}</p>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

/** comparison — two gentle columns (e.g. "what this means" vs "what to ask"). */
export function ComparisonScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Activity}>Putting it in context</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-5 grid max-w-xl grid-cols-2 gap-3">
        {[
          { t: 'In plain language', items: ['What it generally means', 'Why it matters to you'] },
          { t: 'To bring to your visit', items: ['What you’d like to understand', 'What feels unclear'] },
        ].map((col, ci) => (
          <motion.div
            key={col.t}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + ci * 0.2, ease }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-200">{col.t}</p>
            <ul className="mt-2.5 space-y-1.5">
              {col.items.map((it) => (
                <li key={it} className="flex items-start gap-1.5 text-sm text-white/80">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-300" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

/** icon grid — concept tiles popping in. */
export function IconGridScene({ useCase, scene }: SceneProps) {
  const tiles = [
    { icon: HeartPulse, t: 'Understand' },
    { icon: HelpCircle, t: 'Prepare' },
    { icon: MessageSquare, t: 'Ask' },
    { icon: UserCheck, t: 'Decide together' },
  ];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Sparkles}>The idea</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-5 grid max-w-md grid-cols-2 gap-2.5 sm:grid-cols-4">
        {tiles.map((t, i) => (
          <motion.div
            key={t.t}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.12, type: 'spring', stiffness: 300, damping: 18 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3.5 text-center backdrop-blur"
          >
            <t.icon className="h-6 w-6 text-teal-300" />
            <span className="text-xs font-medium text-white/80">{t.t}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

/** map / route — transportation & navigation (health equity). */
export function MapRouteScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={MapPin}>Getting there is part of care</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="relative mt-6 h-28 max-w-lg">
        <svg viewBox="0 0 400 80" className="h-full w-full">
          <motion.path
            d="M10,60 C90,10 150,70 220,35 C280,5 330,55 390,20"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="3"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <motion.path
            d="M10,60 C90,10 150,70 220,35 C280,5 330,55 390,20"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease }}
          />
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2fd0c0" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
        </svg>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-teal-400 text-navy-900"
        >
          <MapPin className="h-4 w-4" />
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="mt-2 text-sm text-white/70"
      >
        Your care team can help coordinate the next step — it’s okay to ask.
      </motion.p>
    </SceneShell>
  );
}

/** closing — warm disclaimer + route back to care team. Badge stamps in. */
export function SafetyDisclaimerScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType} className="items-start">
      <Eyebrow icon={ShieldCheck}>Before you go</Eyebrow>
      <Headline text={scene.onScreenText} />
      <motion.div
        initial={{ opacity: 0, scale: 1.4, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: -3 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 220, damping: 14 }}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-teal-300/50 bg-teal-400/10 px-4 py-2.5 text-sm font-semibold text-teal-100"
      >
        <ShieldCheck className="h-5 w-5" />
        Educational only · Talk with your care team
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 max-w-lg text-sm leading-relaxed text-white/60"
      >
        {useCase.script.disclaimer}
      </motion.p>
    </SceneShell>
  );
}

/** care context — "why you're seeing this", grounded in approved care-team context. */
export function CareContextScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Stethoscope}>Why you’re seeing this</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, ease }}
        className="mt-5 max-w-lg rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
      >
        <p className="text-sm leading-relaxed text-white/85">
          {useCase.clinicalContext.careTeamContext}
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-teal-400/15 px-3 py-1 text-[11px] font-medium text-teal-100">
          <Clock className="h-3.5 w-3.5" />
          {useCase.clinicalContext.journeyStage}
        </div>
      </motion.div>
    </SceneShell>
  );
}

/** plain-English education — one idea, large, with a soft analogy bloom. */
export function PlainEnglishEducationScene({ useCase, scene }: SceneProps) {
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={HeartPulse}>In plain language</Eyebrow>
      <div className="relative mt-4">
        <motion.div
          aria-hidden
          className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-teal-400/20 blur-2xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Headline text={scene.onScreenText} className="relative max-w-2xl text-2xl sm:text-3xl" />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 max-w-lg text-sm leading-relaxed text-white/65"
      >
        One idea at a time — no jargon, no pressure.
      </motion.p>
    </SceneShell>
  );
}

/** research / clinical-trial journey — voluntary, rights-first steps. */
export function ResearchJourneyScene({ useCase, scene }: SceneProps) {
  const steps = [
    { icon: HelpCircle, t: 'Learn what it is' },
    { icon: MessageSquare, t: 'Ask any question' },
    { icon: ShieldCheck, t: 'Always voluntary' },
    { icon: UserCheck, t: 'Decide together' },
  ];
  return (
    <SceneShell visualType={scene.visualType}>
      <Eyebrow icon={Sparkles}>Understanding research</Eyebrow>
      <Headline text={scene.onScreenText} className="mt-3 text-xl sm:text-2xl" />
      <div className="mt-6 flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.18, ease }}
            className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/20 text-teal-200">
              <s.icon className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-white/80">{s.t}</span>
          </motion.div>
        ))}
      </div>
    </SceneShell>
  );
}

/* ========================================================================= dispatcher */

export function VideoSceneCanvas({ useCase, scene }: SceneProps) {
  const cat = useCase.category;
  const v = scene.visualType;

  // Category-aware overrides for bespoke visuals.
  if (cat === 'Language Access' && (v === 'comparison' || v === 'icon-grid'))
    return <LanguageAccessScene useCase={useCase} scene={scene} />;
  if (cat === 'Medication Education' && (v === 'comparison' || v === 'icon-grid'))
    return <MedicationEducationScene useCase={useCase} scene={scene} />;
  if (cat === 'Consent & Privacy' && v === 'consent-panel')
    return <PrivacyDataScene useCase={useCase} scene={scene} />;
  if ((cat === 'Preventive Screening' || cat === 'Procedure Preparation') && v === 'icon-grid')
    return <CalendarReminderScene useCase={useCase} scene={scene} />;
  if (cat === 'Clinical Research' && v === 'journey-timeline')
    return <ResearchJourneyScene useCase={useCase} scene={scene} />;
  if (cat === 'Lab Follow-Up' && v === 'comparison')
    return <PlainEnglishEducationScene useCase={useCase} scene={scene} />;

  switch (v) {
    case 'title-card':
      return <PatientIntroScene useCase={useCase} scene={scene} />;
    case 'lab-card':
      return <LabResultScene useCase={useCase} scene={scene} />;
    case 'checklist':
      return <ChecklistScene useCase={useCase} scene={scene} />;
    case 'consent-panel':
      return <ConsentEducationScene useCase={useCase} scene={scene} />;
    case 'portal-mockup':
      return <PortalMessageScene useCase={useCase} scene={scene} />;
    case 'journey-timeline':
      return cat === 'Care Transitions' ? (
        <DischargeTimelineScene useCase={useCase} scene={scene} />
      ) : (
        <CareJourneyScene useCase={useCase} scene={scene} />
      );
    case 'caregiver-card':
      return <CaregiverSummaryScene useCase={useCase} scene={scene} />;
    case 'question-list':
      return <QuestionCardsScene useCase={useCase} scene={scene} />;
    case 'quote-card':
      return <QuoteScene useCase={useCase} scene={scene} />;
    case 'source-panel':
      return <SourceTransparencyScene useCase={useCase} scene={scene} />;
    case 'comparison':
      return <ComparisonScene useCase={useCase} scene={scene} />;
    case 'icon-grid':
      return <IconGridScene useCase={useCase} scene={scene} />;
    case 'map-route':
      return <MapRouteScene useCase={useCase} scene={scene} />;
    case 'closing-card':
      return <SafetyDisclaimerScene useCase={useCase} scene={scene} />;
    default:
      return <PatientIntroScene useCase={useCase} scene={scene} />;
  }
}

/* ----------------------------------------------- canonical named exports + renderer */

/**
 * The canonical motion-ready scene set. Several are aliases of the implementations
 * above so the storyboard data's visualType maps cleanly to a named component.
 */
export const LabCardScene = LabResultScene;
export const ChecklistRevealScene = ChecklistScene;
export const ConsentFormScene = ConsentEducationScene;
export const MedicationSafetyScene = MedicationEducationScene;
export const BilingualCaptionScene = LanguageAccessScene;
export const PrivacyDeIdentificationScene = PrivacyDataScene;
export const QuestionsToAskScene = QuestionCardsScene;

/**
 * VideoSceneRenderer — takes a StoryboardScene (+ patient/use-case context) and
 * renders the right scene component. Reused by MockVideoPlayer and the visual system.
 * useCase is optional so a scene can be previewed in isolation.
 */
export function VideoSceneRenderer({
  scene,
  useCase,
}: {
  scene: StoryboardScene;
  useCase?: DemoUseCase;
}) {
  const uc = useCase ?? FALLBACK_USE_CASE;
  return <VideoSceneCanvas useCase={uc} scene={scene} />;
}

/* ---------------------------------------------------- catalog for the visual-system page */

export interface SceneCatalogEntry {
  name: string;
  blurb: string;
  visualType: VisualType;
  Component: (p: SceneProps) => JSX.Element;
}

export const sceneCatalog: SceneCatalogEntry[] = [
  { name: 'PatientIntroScene', blurb: 'Warm, personalized opener', visualType: 'title-card', Component: PatientIntroScene },
  { name: 'CareContextScene', blurb: 'Why you’re seeing this', visualType: 'journey-timeline', Component: CareContextScene },
  { name: 'PlainEnglishEducationScene', blurb: 'One idea, in plain language', visualType: 'comparison', Component: PlainEnglishEducationScene },
  { name: 'ResearchJourneyScene', blurb: 'Voluntary, rights-first steps', visualType: 'journey-timeline', Component: ResearchJourneyScene },
  { name: 'LabResultScene', blurb: 'What a test looks at — never interpreted', visualType: 'lab-card', Component: LabResultScene },
  { name: 'ChecklistScene', blurb: 'Preparation, revealed one by one', visualType: 'checklist', Component: ChecklistScene },
  { name: 'CalendarReminderScene', blurb: 'Scheduling without pressure', visualType: 'icon-grid', Component: CalendarReminderScene },
  { name: 'ConsentEducationScene', blurb: 'Consent sections glowing softly', visualType: 'consent-panel', Component: ConsentEducationScene },
  { name: 'MedicationEducationScene', blurb: 'Safe questions, no changes', visualType: 'comparison', Component: MedicationEducationScene },
  { name: 'DischargeTimelineScene', blurb: 'Recovery journey filling in', visualType: 'journey-timeline', Component: DischargeTimelineScene },
  { name: 'LanguageAccessScene', blurb: 'Bilingual captions switching', visualType: 'comparison', Component: LanguageAccessScene },
  { name: 'PrivacyDataScene', blurb: 'De-identification diagram', visualType: 'consent-panel', Component: PrivacyDataScene },
  { name: 'CaregiverSummaryScene', blurb: 'A shareable summary card', visualType: 'caregiver-card', Component: CaregiverSummaryScene },
  { name: 'QuestionCardsScene', blurb: 'Questions sliding in', visualType: 'question-list', Component: QuestionCardsScene },
  { name: 'PortalMessageScene', blurb: 'Message bubbles popping in', visualType: 'portal-mockup', Component: PortalMessageScene },
  { name: 'SafetyDisclaimerScene', blurb: 'Badge stamps in, routes to care team', visualType: 'closing-card', Component: SafetyDisclaimerScene },
];
