import type { StoryboardScene } from '../types';

/**
 * Part 2 storyboards — six patient-education videos that blend personalized UI
 * scenes with real-world clinical scenes. Education only. Never diagnosis,
 * treatment recommendation, medication guidance, independent result
 * interpretation, or patient-specific risk prediction.
 */
export const storyboardsPart2: Record<string, StoryboardScene[]> = {
  /* =====================================================================
   * 7) PRENATAL VISIT PREP — Amina, 31, first pregnancy
   * ===================================================================== */
  'prenatal-visit-prep': [
    {
      sceneTitle: 'Warm intro for Amina',
      narration:
        "Hi Amina — congratulations on your first pregnancy. We know this is a big, exciting season, and we put this short walk-through together just for you so you feel ready and calm heading into your next prenatal visit.",
      onScreenText: "Hi Amina — let's get you ready for your visit",
      visualType: 'title-card',
      motionDirection: 'Soft fade-up of name, gentle parallax on warm background',
      transition: 'Cross-dissolve into life-context card',
      iconName: 'Baby',
      lottieSearchKeyword: 'gentle welcome confetti soft',
      customAnimationIdea:
        'Amina\'s name letter-spaces in over a soft peach gradient while a small heart pulse beats once.',
      backgroundStyle: 'Warm peach-to-cream gradient, very soft grain',
      safetyBoundary:
        'Welcome only — makes no claim about the baby or pregnancy status, gives no medical advice.',
      personalizationReason:
        'Greets Amina by name and names that this is her first pregnancy, the moment she is actually in.',
      durationSec: 9,
      patientPersonalization:
        'Uses Amina\'s name and her first-pregnancy milestone to set a calm, made-for-her tone.',
      assetSearchTerms: ['warm welcome animation', 'soft gradient title', 'gentle heart pulse', 'pregnancy intro card'],
      codedAnimationIdea:
        'Framer Motion stagger on name characters (opacity 0→1, y 12→0) + single scale pulse on a small heart SVG.',
      avoidShowing: ['any image of a fetus or ultrasound result', 'clinical claims', 'stock medical stress imagery'],
    },
    {
      sceneTitle: 'Amina\'s goals — partner involved',
      narration:
        "We also know you want your partner right there with you for this — and that you keep a running list of questions in your notes app so nothing slips. Both of those are exactly the right instincts, and we'll build on them.",
      onScreenText: 'Your goal: go through this together, with your questions ready',
      visualType: 'quote-card',
      motionDirection: 'Two soft cards slide in side by side, then settle',
      transition: 'Upward wipe into the pregnancy timeline',
      iconName: 'Users',
      lottieSearchKeyword: 'couple support together soft',
      customAnimationIdea:
        'Two rounded avatar chips (Amina + partner) ease toward each other until a small connecting line draws between them.',
      backgroundStyle: 'Cream background with a single soft teal accent ribbon',
      safetyBoundary:
        'Reflects Amina\'s own stated goals; offers no advice and no claim about the pregnancy.',
      personalizationReason:
        'Mirrors Amina\'s real preference to involve her partner and her habit of keeping a notes-app question list.',
      durationSec: 10,
      patientPersonalization:
        'Names her partner-involvement goal and her notes-app question habit directly.',
      assetSearchTerms: ['couple together icon', 'notes app list animation', 'connection line draw', 'soft card slide'],
      codedAnimationIdea:
        'Two motion.div chips spring toward center; an SVG path between them animates strokeDashoffset to draw the link.',
      avoidShowing: ['fetal imagery', 'any pregnancy-outcome wording', 'busy clinical UI'],
    },
    {
      sceneTitle: 'Your pregnancy timeline',
      narration:
        "Here's a simple, friendly map of the road ahead — visits and check-ins by trimester. It's just to help you and your partner picture the rhythm of the coming months, not a schedule of anything specific to you.",
      onScreenText: 'A gentle map of the months ahead',
      visualType: 'journey-timeline',
      motionDirection: 'Horizontal timeline draws left to right, nodes pop in softly',
      transition: 'Camera pushes in on the upcoming-visit node, then dissolves',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'timeline milestones gentle progress',
      customAnimationIdea:
        'A pastel timeline line draws across three trimester bands; each milestone dot fades in with a soft bounce.',
      backgroundStyle: 'Soft horizontal trimester bands in cream, peach, and pale teal',
      safetyBoundary:
        'General educational rhythm of prenatal care only — not Amina\'s personal schedule or any prediction.',
      personalizationReason:
        'Framed for a first-time parent who wants to picture the journey she and her partner are starting.',
      durationSec: 11,
      patientPersonalization:
        'Speaks to a first pregnancy and the desire to understand the overall rhythm with her partner.',
      assetSearchTerms: ['pregnancy trimester timeline', 'milestone dots animation', 'progress path draw', 'soft pastel timeline'],
      codedAnimationIdea:
        'SVG line strokeDashoffset animates 0→full; trimester nodes use staggered spring scale 0.6→1.',
      avoidShowing: ['week-by-week fetal development images', 'risk or due-date claims', 'alarming countdowns'],
    },
    {
      sceneTitle: 'What a calm ultrasound visit feels like',
      narration:
        "Many first-time parents wonder what the imaging appointment is even like. It's a calm, quiet room — you lie back, the technician moves a smooth wand across your belly, and gentle shapes appear on a screen. We're showing the setting only, so it feels familiar before you ever walk in.",
      onScreenText: 'The imaging room — calm and familiar',
      visualType: 'icon-grid',
      motionDirection: 'Soft top-down reveal of the room, then a slow horizontal sweep across an abstract screen',
      transition: 'Gentle blur-through into the prenatal visit room',
      iconName: 'ScanLine',
      lottieSearchKeyword: 'ultrasound scan calm abstract sweep',
      customAnimationIdea:
        'A stylized exam screen lights up with soft, abstract grayscale ripples sweeping left to right — purely ambient, no recognizable image.',
      backgroundStyle: 'Muted clinical blues with a softly glowing abstract monitor',
      safetyBoundary:
        'Shows the SETTING and experience only — no image of a baby, no claim about the scan, no result.',
      personalizationReason:
        'Eases a first-time parent\'s uncertainty by making the imaging environment feel known in advance.',
      durationSec: 12,
      clinicalVisualCategory: 'imaging-scan',
      clinicalVisualDirection:
        'Scanner setting with a smooth wand motion and an abstract monitor sweep — ambient, never a fetal image.',
      realWorldConceptShown:
        'What a prenatal ultrasound appointment setting and experience generally look like.',
      safeMedicalVisualStyle:
        'Clean 2.5D, soft blues, abstract grayscale ripples on the screen — calm, never literal.',
      assetSearchTerms: ['ultrasound room calm', 'abstract scan sweep', 'medical monitor glow', 'sonography setting illustration'],
      codedAnimationIdea:
        'A masked gradient sweeps across an SVG monitor (translateX loop) while a wand element eases along a soft arc.',
      avoidShowing: ['any fetal image', 'a beating-heart claim', 'distressing or graphic clinical imagery', 'result text on screen'],
    },
    {
      sceneTitle: 'Inside a prenatal visit room',
      narration:
        "Your regular check-ins happen somewhere just as calm — a comfortable room where your care team checks in with you, listens, and answers questions. There's always space for both you and your partner here.",
      onScreenText: 'A comfortable room, room for both of you',
      visualType: 'icon-grid',
      motionDirection: 'Slow dolly into a softly lit room, two seats highlighted',
      transition: 'Cross-dissolve into the notes-app checklist',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'calm clinic room welcoming consultation',
      customAnimationIdea:
        'A simple illustrated exam room fades in; two chairs gently glow to signal space for Amina and her partner.',
      backgroundStyle: 'Soft warm-neutral room illustration with a single teal accent',
      safetyBoundary:
        'Depicts a welcoming care setting only — no procedures, no advice, no claims.',
      personalizationReason:
        'Reinforces Amina\'s wish to have her partner present by literally showing two seats.',
      durationSec: 9,
      clinicalVisualCategory: 'care-setting',
      clinicalVisualDirection:
        'A calm prenatal consult room with comfortable seating and warm light; emphasize space for a partner.',
      realWorldConceptShown: 'The everyday environment of a routine prenatal check-in.',
      safeMedicalVisualStyle: 'Warm illustrated interior, soft shadows, no equipment focus, no people in distress.',
      assetSearchTerms: ['prenatal consult room', 'calm clinic interior', 'two chairs welcoming', 'OB visit room illustration'],
      codedAnimationIdea:
        'Room SVG fades up; two chair shapes pulse a soft glow via animated drop-shadow opacity.',
      avoidShowing: ['exam tables in use', 'instruments close up', 'any anxious depiction', 'clinical claims'],
    },
    {
      sceneTitle: 'Bring your notes-app questions',
      narration:
        "Now the part you already do so well — your questions. Pull up your notes app and jot a few down before the visit. Here are some gentle starters you and your partner can add to, so nothing you care about gets forgotten in the room.",
      onScreenText: 'Open your notes app — bring your questions',
      visualType: 'checklist',
      motionDirection: 'A phone notes-app mock slides up; checklist lines type in one by one',
      transition: 'Items collapse into a single saved card, then wipe to partner card',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'checklist notes app typing soft',
      customAnimationIdea:
        'A phone frame rises with a notes UI; each question line "types" in and a soft check appears beside it.',
      backgroundStyle: 'Cream background with a clean phone mock and teal checks',
      safetyBoundary:
        'Prompts Amina to prepare her own questions — supplies neutral starters, never medical answers.',
      personalizationReason:
        'Built directly around Amina\'s notes-app habit and her fear of forgetting questions.',
      durationSec: 11,
      patientPersonalization:
        'Mirrors her exact behavior — keeping questions in a notes app — and the worry of forgetting them.',
      assetSearchTerms: ['notes app checklist', 'phone typing animation', 'question list UI', 'soft checkmark'],
      codedAnimationIdea:
        'Per-line typewriter effect (width clip) inside a phone SVG; checkmark path draws via strokeDashoffset after each line.',
      avoidShowing: ['medical answers to the questions', 'any diagnosis prompts', 'fear-based wording'],
    },
    {
      sceneTitle: 'Plan it with your partner + next step',
      narration:
        "Before your visit, take five quiet minutes together — pick your top three questions and decide who'll ask what. Then add the appointment to your calendar and bring your phone. You've got this, together.",
      onScreenText: 'Pick your top 3 questions • add the visit to your calendar',
      visualType: 'question-list',
      motionDirection: 'Three question chips highlight and lift; a calendar chip slides in',
      transition: 'Soft fade to the closing safety card',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'plan together calendar reminder gentle',
      customAnimationIdea:
        'Top three question chips glow and rise; a calendar pill animates in with a soft "added" check.',
      backgroundStyle: 'Warm cream with paired avatar chips and a calendar accent',
      safetyBoundary:
        'A simple preparation step — no advice, no claim, just helping them organize and show up.',
      personalizationReason:
        'Turns Amina\'s two goals — partner involvement and remembering questions — into one shared next step.',
      durationSec: 9,
      patientPersonalization:
        'Assigns questions between Amina and her partner, honoring her togetherness goal.',
      assetSearchTerms: ['calendar reminder animation', 'question chips highlight', 'shared planning UI', 'add to calendar check'],
      codedAnimationIdea:
        'Three chips spring up (y 8→0, scale 1→1.04→1); calendar pill slides in x 24→0 with a drawn check.',
      avoidShowing: ['medical recommendations', 'outcome promises', 'overwhelming task lists'],
    },
    {
      sceneTitle: 'Safety + warm close',
      narration:
        "Amina, this video is here to help you feel prepared and supported — it doesn't diagnose anything, make any claim about your pregnancy, or replace the guidance of your care team. We're so glad to be walking this with you and your partner.",
      onScreenText: 'Educational only — your care team guides your care',
      visualType: 'closing-card',
      motionDirection: 'Gentle fade-in of disclaimer, soft shield icon settles',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield reassurance soft fade',
      customAnimationIdea:
        'A soft shield outline draws in beneath the disclaimer text, then both ease to a calm rest.',
      backgroundStyle: 'Deep calm teal-navy with quiet vignette',
      safetyBoundary:
        'Explicit education-only disclaimer; defers all care decisions to Amina\'s care team.',
      personalizationReason:
        'Closes by name, reaffirming support for Amina and her partner specifically.',
      durationSec: 8,
      patientPersonalization:
        'Names Amina and her partner in a warm, reassuring sign-off.',
      assetSearchTerms: ['safety shield animation', 'soft disclaimer card', 'reassuring close', 'brand fade out'],
      codedAnimationIdea:
        'Shield SVG strokeDashoffset draw; disclaimer text fades up; container settles with a slow ease-out.',
      avoidShowing: ['any pregnancy claim', 'fine print that alarms', 'medical instructions'],
    },
  ],

  /* =====================================================================
   * 8) LANGUAGE ACCESS — Carlos, 55, Spanish-preferred, BP follow-up
   *    Narration + onScreenText in simple Spanish.
   * ===================================================================== */
  'language-access': [
    {
      sceneTitle: 'Saludo cálido para Carlos',
      narration:
        "Hola Carlos. Sabemos que a veces sale de la consulta sin estar seguro de qué pasó, y eso es muy normal. Por eso hicimos este video corto en español, solo para usted, sobre su cita de presión arterial.",
      onScreenText: 'Hola Carlos — este video es para usted, en español',
      visualType: 'title-card',
      motionDirection: 'El nombre aparece suavemente sobre un fondo cálido',
      transition: 'Disolvencia hacia la tarjeta de metas',
      iconName: 'Languages',
      lottieSearchKeyword: 'warm welcome spanish language calm',
      customAnimationIdea:
        'El nombre de Carlos aparece letra por letra; un pequeño globo "Español" se ilumina suavemente.',
      backgroundStyle: 'Degradado cálido en tonos arena con acento azul suave',
      safetyBoundary:
        'Solo bienvenida en su idioma — no da consejos médicos ni interpreta nada.',
      personalizationReason:
        'Habla a Carlos en español, su idioma preferido, y nombra su sensación de salir confundido.',
      durationSec: 9,
      patientPersonalization:
        'Usa el nombre de Carlos y su preferencia por el español; reconoce que a veces sale inseguro.',
      assetSearchTerms: ['spanish welcome card', 'language badge animation', 'warm gradient title', 'idioma español icon'],
      codedAnimationIdea:
        'Stagger de letras del nombre (opacity 0→1) y un chip "Español" con un brillo suave en bucle corto.',
      avoidShowing: ['texto en inglés que confunda', 'cifras de presión', 'imágenes clínicas alarmantes'],
    },
    {
      sceneTitle: 'Lo que usted quiere lograr',
      narration:
        "Su meta es simple y muy buena: salir de cada cita entendiendo qué pasó. A veces su hijo le ayuda a traducir, y eso está perfecto. Vamos a darle herramientas para que usted siempre se sienta seguro.",
      onScreenText: 'Su meta: salir de la cita entendiendo todo',
      visualType: 'quote-card',
      motionDirection: 'Una tarjeta de cita se desliza y se asienta con suavidad',
      transition: 'Barrido hacia arriba hacia el dispositivo de presión',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'understanding clarity speech bubble calm',
      customAnimationIdea:
        'Una burbuja de diálogo se aclara de borrosa a nítida para representar "entender mejor".',
      backgroundStyle: 'Fondo arena con una cinta azul suave',
      safetyBoundary:
        'Refleja la meta de Carlos; no ofrece consejo ni interpreta resultados.',
      personalizationReason:
        'Reconoce su meta de entender la consulta y que su hijo a veces traduce.',
      durationSec: 10,
      patientPersonalization:
        'Nombra su meta de claridad y el apoyo de su hijo como traductor ocasional.',
      assetSearchTerms: ['speech bubble clarity', 'blur to focus animation', 'spanish quote card', 'goal card UI'],
      codedAnimationIdea:
        'Una burbuja SVG pasa de blur(8px) a blur(0) con un fade, mostrando claridad.',
      avoidShowing: ['decir que su presión es buena o mala', 'jerga médica', 'texto solo en inglés'],
    },
    {
      sceneTitle: 'Cómo se toma una lectura de presión',
      narration:
        "Veamos qué pasa en la cita. El brazalete se coloca en su brazo, se infla con suavidad y aprieta un poquito, y luego se afloja. Así el equipo obtiene su lectura. No duele, solo se siente una presión leve por unos segundos.",
      onScreenText: 'El brazalete se infla, aprieta un poco y se afloja',
      visualType: 'comparison',
      motionDirection: 'Un brazalete ilustrado se infla y se desinfla en un brazo simple',
      transition: 'Disolvencia hacia el flujo en el vaso sanguíneo',
      iconName: 'Activity',
      lottieSearchKeyword: 'blood pressure cuff inflate calm illustration',
      customAnimationIdea:
        'Un brazalete 2.5D se infla (la barra de presión sube) y se desinfla con una animación suave y repetida.',
      backgroundStyle: 'Azules clínicos suaves con un brazo ilustrado',
      safetyBoundary:
        'Muestra cómo funciona el dispositivo en general — no muestra ni interpreta la lectura de Carlos.',
      personalizationReason:
        'Quita el misterio de la parte de la cita que a Carlos más le confunde.',
      durationSec: 12,
      clinicalVisualCategory: 'medical-device',
      clinicalVisualDirection:
        'Brazalete de presión sobre un brazo ilustrado; muéstrelo inflándose y desinflándose con una barra de presión, sin números reales.',
      realWorldConceptShown: 'Cómo se toma físicamente una medición de presión arterial.',
      safeMedicalVisualStyle: 'Ilustración 2.5D limpia, azules suaves, sin cifras ni sangre.',
      assetSearchTerms: ['blood pressure cuff animation', 'sphygmomanometer illustration', 'arm cuff inflate', 'medical device 2.5d'],
      codedAnimationIdea:
        'Un brazalete SVG escala su ancho (inflar) mientras una barra vertical sube y baja en bucle suave.',
      avoidShowing: ['una lectura/número específico', 'decir si está alta o baja', 'agujas o sangre', 'imágenes alarmantes'],
    },
    {
      sceneTitle: 'Qué es la presión, de forma sencilla',
      narration:
        "Para entenderlo mejor: la presión arterial es simplemente la fuerza de la sangre al moverse por sus vasos, como agua suave fluyendo por una manguera. Es algo que su cuerpo hace todo el día. Aquí solo lo explicamos en general.",
      onScreenText: 'La presión es la fuerza de la sangre al fluir',
      visualType: 'comparison',
      motionDirection: 'Puntos suaves fluyen por un vaso ilustrado de izquierda a derecha',
      transition: 'Barrido hacia la tarjeta de medición en casa',
      iconName: 'HeartPulse',
      lottieSearchKeyword: 'blood flow vessel gentle simple animation',
      customAnimationIdea:
        'Pequeñas partículas de sangre fluyen por un vaso curvo; el flujo es calmado y constante, nunca alarmante.',
      backgroundStyle: 'Fondo azul-rojizo muy suave con un vaso translúcido',
      safetyBoundary:
        'Explicación general del concepto — no dice nada sobre la presión personal de Carlos.',
      personalizationReason:
        'Da a Carlos un modelo mental simple para entender el tema de su seguimiento.',
      durationSec: 11,
      clinicalVisualCategory: 'cellular-flow',
      clinicalVisualDirection:
        'Sangre simplificada fluyendo por un vaso para representar el concepto de presión, en general.',
      realWorldConceptShown: 'El concepto general de la presión arterial como flujo dentro de un vaso.',
      safeMedicalVisualStyle: 'Vaso translúcido 2.5D, partículas suaves, ritmo calmado, sin gráficos médicos.',
      assetSearchTerms: ['blood flow vessel animation', 'cells flowing simple', 'cardiovascular illustration calm', 'particle flow vein'],
      codedAnimationIdea:
        'Partículas circulares animan su offset a lo largo de un path SVG de vaso en bucle continuo y suave.',
      avoidShowing: ['interpretar el valor de Carlos', 'coágulos o daño dramático', 'imágenes de miedo', 'cifras'],
    },
    {
      sceneTitle: 'Cómo medir en casa, paso a paso',
      narration:
        "Si mide su presión en casa, estos pasos sencillos ayudan: siéntese y descanse cinco minutos, mantenga los pies en el piso, apoye el brazo en una mesa y quédese quieto. Anote la fecha y la hora para compartirla con su equipo.",
      onScreenText: 'En casa: descanse, pies en el piso, brazo apoyado, anote',
      visualType: 'checklist',
      motionDirection: 'Lista de pasos aparece uno por uno con una marca suave',
      transition: 'Los pasos se agrupan y disuelven hacia la tarjeta del hijo',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'home health checklist steps calm',
      customAnimationIdea:
        'Cada paso aparece con un ícono simple y una palomita verde suave que se dibuja al lado.',
      backgroundStyle: 'Fondo arena con tarjetas limpias y palomitas verdes',
      safetyBoundary:
        'Pasos de preparación para medir — no interpreta ni juzga ningún resultado.',
      personalizationReason:
        'Le da a Carlos un proceso claro y repetible para sentirse en control entre citas.',
      durationSec: 11,
      patientPersonalization:
        'Pensado para que Carlos pueda medir con confianza y compartir notas con su equipo.',
      assetSearchTerms: ['home measurement checklist', 'step icons animation', 'green checkmark draw', 'blood pressure home steps'],
      codedAnimationIdea:
        'Stagger de filas (y 8→0); cada palomita SVG se dibuja con strokeDashoffset al entrar.',
      avoidShowing: ['decir qué número es normal para él', 'consejos de medicación', 'alarmar sobre cifras'],
    },
    {
      sceneTitle: 'Un resumen para compartir con su hijo',
      narration:
        "Después de cada cita, le damos un resumen sencillo en español que puede mostrarle a su hijo o a su familia. Así, si alguien le ayuda, todos entienden lo mismo y usted nunca se queda con dudas.",
      onScreenText: 'Un resumen claro para usted y su familia',
      visualType: 'caregiver-card',
      motionDirection: 'Una tarjeta de resumen se comparte de un teléfono a otro',
      transition: 'Disolvencia hacia la tarjeta de cierre',
      iconName: 'Users',
      lottieSearchKeyword: 'family summary share message calm',
      customAnimationIdea:
        'Una tarjeta de resumen se desliza de un teléfono "Carlos" a otro "Hijo", con una palomita de compartido.',
      backgroundStyle: 'Fondo cálido con dos teléfonos ilustrados conectados',
      safetyBoundary:
        'Comparte un resumen educativo aprobado — no contiene consejo médico ni interpretación.',
      personalizationReason:
        'Apoya directamente que el hijo de Carlos a veces ayuda a traducir y entender.',
      durationSec: 10,
      patientPersonalization:
        'Conecta el resumen con el apoyo familiar de Carlos, en especial su hijo.',
      assetSearchTerms: ['share summary animation', 'family caregiver card', 'phone to phone transfer', 'spanish summary UI'],
      codedAnimationIdea:
        'Una motion.div tarjeta anima x de teléfono A a teléfono B; aparece una palomita "compartido".',
      avoidShowing: ['datos clínicos sin contexto', 'interpretar resultados', 'texto solo en inglés'],
    },
    {
      sceneTitle: 'Próximo paso + seguridad (cierre)',
      narration:
        "Para su próxima cita: traiga sus medidas anotadas, una o dos preguntas, y a su hijo si quiere su apoyo. Y recuerde, Carlos: este video es educativo y no reemplaza el consejo médico de su equipo de atención. Estamos aquí para usted.",
      onScreenText: 'Este video es educativo y no reemplaza el consejo médico de su equipo de atención.',
      visualType: 'closing-card',
      motionDirection: 'El texto de seguridad aparece con un escudo suave',
      transition: 'Disolvencia lenta a la marca',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield reassurance spanish soft',
      customAnimationIdea:
        'Un escudo suave se dibuja debajo del aviso en español y todo se asienta con calma.',
      backgroundStyle: 'Azul-marino calmado con viñeta suave',
      safetyBoundary:
        'Aviso explícito en español de que es solo educativo y remite a su equipo de atención.',
      personalizationReason:
        'Cierra por nombre y reúne sus pasos y su apoyo familiar.',
      durationSec: 9,
      patientPersonalization:
        'Nombra a Carlos y a su hijo en un cierre cálido y tranquilizador.',
      assetSearchTerms: ['safety shield spanish', 'disclaimer card soft', 'reassuring close', 'brand fade'],
      codedAnimationIdea:
        'Escudo SVG con strokeDashoffset; el aviso hace fade-up y el contenedor cierra con ease-out lento.',
      avoidShowing: ['decir si su presión está bien o mal', 'instrucciones de medicación', 'texto que asuste'],
    },
  ],

  /* =====================================================================
   * 9) PROCEDURE PREP — Elaine, 58, caregiver, colonoscopy prep
   * ===================================================================== */
  'procedure-prep': [
    {
      sceneTitle: 'Warm intro for Elaine',
      narration:
        "Hi Elaine. We know you're juggling a lot right now — caring for your mother while taking care of your own health too. We made this short, calm guide just for you so getting ready for your colonoscopy feels manageable, not overwhelming.",
      onScreenText: "Hi Elaine — let's make your prep simple",
      visualType: 'title-card',
      motionDirection: 'Name fades up over a calm gradient, soft breathing scale',
      transition: 'Cross-dissolve into concerns card',
      iconName: 'HeartPulse',
      lottieSearchKeyword: 'calm welcome supportive soft',
      customAnimationIdea:
        'Elaine\'s name fades in while a soft circle behind it breathes in and out once, a calming cue.',
      backgroundStyle: 'Calm sage-to-cream gradient, soft grain',
      safetyBoundary:
        'Welcome only — no medical advice, no outcome claims.',
      personalizationReason:
        'Names Elaine and her dual role caring for her mother and herself.',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges Elaine is a caregiver for her mother while preparing for her own procedure.',
      assetSearchTerms: ['calm welcome animation', 'breathing circle', 'supportive title card', 'soft gradient intro'],
      codedAnimationIdea:
        'Name letters fade in (stagger); background circle scales 1→1.06→1 once with slow easing.',
      avoidShowing: ['graphic procedure imagery', 'anxious medical visuals', 'outcome claims'],
    },
    {
      sceneTitle: 'Elaine\'s worry — the prep steps',
      narration:
        "A lot of people tell us the part they worry about most isn't the procedure — it's the prep the days before. That's completely understandable. We'll lay it out in plain, simple steps so you always know what's next.",
      onScreenText: "The prep is the part most people worry about — let's simplify it",
      visualType: 'quote-card',
      motionDirection: 'A worry chip softens and a tidy steps card slides in to replace it',
      transition: 'Upward wipe into the prep timeline',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'reassurance worry to calm steps',
      customAnimationIdea:
        'A tangled-looking scribble smooths into a clean ordered list to show "messy worry → clear steps".',
      backgroundStyle: 'Cream background with a single sage accent',
      safetyBoundary:
        'Acknowledges Elaine\'s concern; gives organization, not medical advice.',
      personalizationReason:
        'Directly names Elaine\'s stated worry about the prep steps.',
      durationSec: 10,
      patientPersonalization:
        'Mirrors Elaine\'s specific anxiety about the multi-day prep rather than the procedure itself.',
      assetSearchTerms: ['scribble to list animation', 'worry to calm', 'ordered steps reveal', 'reassurance quote card'],
      codedAnimationIdea:
        'An SVG squiggle path morphs (d interpolation) into evenly spaced list lines.',
      avoidShowing: ['fear-based imagery', 'graphic detail', 'medical instructions specific to her'],
    },
    {
      sceneTitle: 'A simple look at the digestive tract',
      narration:
        "Here's a gentle, simple picture of what this exam looks at — your digestive tract, the long winding pathway that food travels through. Seeing it as a friendly diagram helps the whole thing feel less mysterious.",
      onScreenText: 'A simple map of your digestive tract',
      visualType: 'icon-grid',
      motionDirection: 'A clean labeled tract diagram draws in, soft highlight travels along it',
      transition: 'Dissolve into the calm procedure walkthrough',
      iconName: 'Activity',
      lottieSearchKeyword: 'digestive tract anatomy simple diagram calm',
      customAnimationIdea:
        'A stylized 2.5D digestive pathway draws in segment by segment; a soft glow travels along the path.',
      backgroundStyle: 'Soft clinical blues with a labeled pastel anatomy diagram',
      safetyBoundary:
        'Simplified, non-graphic anatomy only — no internal photos, no claims.',
      personalizationReason:
        'Demystifies the area of focus so Elaine feels informed before her appointment.',
      durationSec: 11,
      clinicalVisualCategory: 'anatomy',
      clinicalVisualDirection:
        'A clean, labeled, simplified digestive tract; gentle highlight travels the path — illustrative, not photographic.',
      realWorldConceptShown: 'The general anatomy the colonoscopy examines.',
      safeMedicalVisualStyle: 'Pastel 2.5D anatomy, soft labels, no realistic tissue or internal photography.',
      assetSearchTerms: ['digestive system illustration', 'colon anatomy simple', 'labeled tract diagram', 'pastel medical anatomy'],
      codedAnimationIdea:
        'SVG tract path draws via strokeDashoffset; a small glow dot animates along the same path with offset-distance.',
      avoidShowing: ['realistic internal tissue', 'blood', 'graphic medical photography', 'disease claims'],
    },
    {
      sceneTitle: 'A calm walkthrough of the day',
      narration:
        "On the day itself, the team helps you rest comfortably, the exam is brief, and you'll be looked after the whole time. We're keeping this simple and calm on purpose — you'll be in good hands.",
      onScreenText: 'On the day: you rest, the team takes care of the rest',
      visualType: 'journey-timeline',
      motionDirection: 'Three soft step cards advance left to right with a gentle highlight',
      transition: 'Cross-dissolve into the arrival care-setting',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'procedure walkthrough calm steps reassuring',
      customAnimationIdea:
        'Three rounded step cards — arrive, rest, recover — slide in and the active one gently lifts.',
      backgroundStyle: 'Soft blues with three rounded step cards',
      safetyBoundary:
        'High-level, comforting overview only — no invasive footage, no outcome claims.',
      personalizationReason:
        'Reassures Elaine, who worries about the unknown, by showing a calm, simple sequence.',
      durationSec: 11,
      clinicalVisualCategory: 'procedure-walkthrough',
      clinicalVisualDirection:
        'Abstracted three-step day overview (arrive → rest → recover); calm and non-graphic, no instruments shown in use.',
      realWorldConceptShown: 'The general flow of a colonoscopy appointment day.',
      safeMedicalVisualStyle: 'Soft step cards, gentle motion, no graphic or invasive depiction.',
      assetSearchTerms: ['procedure day steps', 'calm clinic walkthrough', 'patient journey cards', 'reassuring medical steps'],
      codedAnimationIdea:
        'Step cards translate x with stagger; active card scales 1→1.04 and casts a soft shadow.',
      avoidShowing: ['scopes or instruments in use', 'sedation distress', 'blood', 'specific outcome claims'],
    },
    {
      sceneTitle: 'Arriving at the procedure center',
      narration:
        "When you arrive, it's a calm, welcoming center — friendly staff, a comfortable waiting area, and a quiet room where you'll get ready. Knowing what the place feels like ahead of time can take a lot of the edge off.",
      onScreenText: 'A calm, welcoming center',
      visualType: 'icon-grid',
      motionDirection: 'Slow dolly through a softly lit reception into a calm prep area',
      transition: 'Dissolve into the prep timeline',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'clinic arrival reception calm welcoming',
      customAnimationIdea:
        'An illustrated reception fades in; a soft path leads the eye to a comfortable prep chair.',
      backgroundStyle: 'Warm-neutral illustrated interior with sage accents',
      safetyBoundary:
        'Depicts the welcoming setting only — no procedures, no advice.',
      personalizationReason:
        'Helps a planning-focused caregiver picture logistics and feel prepared.',
      durationSec: 9,
      clinicalVisualCategory: 'care-setting',
      clinicalVisualDirection:
        'A calm endoscopy/procedure-center arrival: reception and comfortable prep area, warm and unintimidating.',
      realWorldConceptShown: 'The environment Elaine will arrive to on procedure day.',
      safeMedicalVisualStyle: 'Warm illustrated interior, soft light, no clinical equipment focus.',
      assetSearchTerms: ['procedure center reception', 'calm clinic arrival', 'comfortable waiting area', 'outpatient center illustration'],
      codedAnimationIdea:
        'Reception SVG fades up; a guiding line animates toward a highlighted prep chair.',
      avoidShowing: ['procedure rooms in use', 'medical instruments', 'anxious patients', 'claims'],
    },
    {
      sceneTitle: 'Your prep timeline + clear-liquid steps',
      narration:
        "Here's your prep laid out on a simple timeline — the day before, the evening, and the morning of. The icons show the clear-liquid steps so it's easy to glance at. Follow the exact instructions your care team gave you; this is just a friendly map.",
      onScreenText: 'Day before • evening • morning — follow your team\'s instructions',
      visualType: 'checklist',
      motionDirection: 'A timeline draws across; clear-liquid icons pop in beside each phase',
      transition: 'Cross-dissolve into ride/home-support card',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'prep timeline clear liquids icons checklist',
      customAnimationIdea:
        'A horizontal prep timeline with three phases; a water-glass and broth icon fade in with soft checks per phase.',
      backgroundStyle: 'Cream with a clean timeline and pastel clear-liquid icons',
      safetyBoundary:
        'Organizes prep phases generically and defers exact instructions to her care team — no dosing or advice.',
      personalizationReason:
        'Built for Elaine\'s worry about the steps and her need to plan around caregiving.',
      durationSec: 12,
      patientPersonalization:
        'Lays the prep out as a glanceable timeline so a busy caregiver can plan her days.',
      assetSearchTerms: ['prep timeline animation', 'clear liquids icons', 'checklist phases', 'water broth icon set'],
      codedAnimationIdea:
        'Timeline strokeDashoffset draws; per-phase icons spring in (scale 0.6→1) with a drawn check.',
      avoidShowing: ['specific medication or dosing', 'graphic prep effects', 'overriding her care team\'s instructions'],
    },
    {
      sceneTitle: 'Plan your ride + home support',
      narration:
        "Two things to set up ahead of time: a ride home, since you shouldn't drive afterward, and a little help with your mother for that morning. Line these up now and the day will go so much more smoothly.",
      onScreenText: 'Arrange a ride home • plan care for your mother',
      visualType: 'map-route',
      motionDirection: 'A simple route line animates from center to home; a caregiver chip slides in',
      transition: 'Soft fade to the safety closing card',
      iconName: 'MapPin',
      lottieSearchKeyword: 'ride home route map caregiver support calm',
      customAnimationIdea:
        'A route draws from the center to a home icon; a small "ride" car eases along it, then a support chip for her mother appears.',
      backgroundStyle: 'Cream map surface with a soft route line and home pin',
      safetyBoundary:
        'Logistics support only — no medical advice, just planning help.',
      personalizationReason:
        'Speaks directly to Elaine\'s need to plan transportation and mother-care around the day.',
      durationSec: 9,
      patientPersonalization:
        'Addresses Elaine\'s exact logistics: arranging a ride and coverage for her mother.',
      assetSearchTerms: ['route to home animation', 'ride arrangement icon', 'caregiver support chip', 'map pin home'],
      codedAnimationIdea:
        'Route SVG draws; a car icon animates offset-distance along the path; a support chip fades in after.',
      avoidShowing: ['driving-after-sedation', 'stressful logistics framing', 'medical claims'],
    },
    {
      sceneTitle: 'Safety + warm close',
      narration:
        "Elaine, this guide is here to help you feel prepared — it doesn't diagnose anything, promise any outcome, or replace your care team's instructions. Follow exactly what they gave you, and lean on us if you have questions. You're doing a wonderful job.",
      onScreenText: 'Educational only — follow your care team\'s instructions',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer fades in with a soft shield, then settles',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield reassurance soft close',
      customAnimationIdea:
        'A soft shield draws beneath the disclaimer; the scene eases to a calm rest.',
      backgroundStyle: 'Calm sage-navy with quiet vignette',
      safetyBoundary:
        'Explicit education-only disclaimer; defers all instructions and decisions to her care team.',
      personalizationReason:
        'Closes by name with encouragement for Elaine\'s caregiver role.',
      durationSec: 8,
      patientPersonalization:
        'Names Elaine and affirms her effort as both a caregiver and a patient.',
      assetSearchTerms: ['safety shield animation', 'disclaimer card', 'reassuring close', 'brand fade out'],
      codedAnimationIdea:
        'Shield SVG strokeDashoffset draw; disclaimer fades up; container ease-out to rest.',
      avoidShowing: ['outcome promises', 'graphic recovery imagery', 'instructions that override her team'],
    },
  ],

  /* =====================================================================
   * 10) CAREGIVER EDUCATION — Nina (daughter) helping George, 74
   * ===================================================================== */
  'caregiver-education': [
    {
      sceneTitle: 'Warm intro for Nina',
      narration:
        "Hi Nina. Helping your dad George through his appointments is a real act of love, and it's a lot to hold. We made this short guide for you so you can walk out of each visit with everything that matters captured and clear.",
      onScreenText: 'Hi Nina — supporting George, made simpler',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a warm gradient; a soft heart settles beside it',
      transition: 'Cross-dissolve into the caregiver-goal card',
      iconName: 'Users',
      lottieSearchKeyword: 'caregiver welcome family support warm',
      customAnimationIdea:
        'Nina\'s name fades in; a small two-figure (daughter + father) icon gently slides together.',
      backgroundStyle: 'Warm amber-to-cream gradient, soft grain',
      safetyBoundary:
        'Welcome only — supports the caregiver, never overrides clinician guidance.',
      personalizationReason:
        'Greets Nina directly and names her role helping her father George.',
      durationSec: 9,
      patientPersonalization:
        'Addresses Nina as the caregiver and George as the person she supports.',
      assetSearchTerms: ['caregiver welcome animation', 'family support icon', 'warm title card', 'daughter father figures'],
      codedAnimationIdea:
        'Name stagger fade; two-figure SVG eases together (x toward center) with a soft settle.',
      avoidShowing: ['alarming medical imagery', 'anything that undermines clinicians', 'distress'],
    },
    {
      sceneTitle: 'What George needs — and what you worry about',
      narration:
        "You've noticed George forgets details from visits — what the doctor said, the next steps, which medication is which. That's so common, and there's no fault in it. With a few simple habits, you can catch and keep all of it together.",
      onScreenText: 'George forgets the details — we\'ll help you capture them',
      visualType: 'quote-card',
      motionDirection: 'A fading "?" softens into a tidy captured note',
      transition: 'Upward wipe into the visit experience scene',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'memory support note capture gentle',
      customAnimationIdea:
        'A few floating fragments of words drift apart, then gather into a single clean note card.',
      backgroundStyle: 'Cream with a soft amber accent',
      safetyBoundary:
        'Acknowledges memory challenges with compassion; offers organization, not medical advice.',
      personalizationReason:
        'Names George\'s specific difficulty remembering visit details, Nina\'s core concern.',
      durationSec: 10,
      patientPersonalization:
        'Reflects Nina\'s observation that George forgets details, framed without blame.',
      assetSearchTerms: ['word fragments gather', 'memory note animation', 'capture details UI', 'gentle quote card'],
      codedAnimationIdea:
        'Several text fragments animate from scattered positions into a stacked note (x/y to 0, opacity up).',
      avoidShowing: ['stigmatizing cognitive-decline imagery', 'fear framing', 'medical diagnosis of George'],
    },
    {
      sceneTitle: 'At the visit, together',
      narration:
        "Here's a calm picture of the visit itself — you sitting beside George while the care team talks. Your job is simple: listen, take a few notes, and gently ask the doctor to repeat anything that wasn't clear. You're his second set of ears.",
      onScreenText: 'You\'re his second set of ears',
      visualType: 'icon-grid',
      motionDirection: 'A soft scene of two seated figures and a clinician; a note pad highlights',
      transition: 'Cross-dissolve into the calm clinic setting',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'doctor visit caregiver patient conversation calm',
      customAnimationIdea:
        'An illustrated visit: clinician + George + Nina; a small notepad beside Nina gains a soft pencil-writing motion.',
      backgroundStyle: 'Soft warm clinical tones with three illustrated figures',
      safetyBoundary:
        'Shows a supportive visit interaction only — no procedures, no advice that overrides clinicians.',
      personalizationReason:
        'Casts Nina in her actual role: present with George, capturing what the clinician says.',
      durationSec: 11,
      clinicalVisualCategory: 'patient-experience',
      clinicalVisualDirection:
        'A caregiver + patient + clinician conversation at a visit; warm, calm, note-taking emphasized.',
      realWorldConceptShown: 'What a supportive caregiver-accompanied appointment looks like.',
      safeMedicalVisualStyle: 'Warm illustrated figures, soft palette, no equipment focus, no distress.',
      assetSearchTerms: ['caregiver doctor visit illustration', 'note taking appointment', 'family clinician conversation', 'supportive visit scene'],
      codedAnimationIdea:
        'Figures fade in; a notepad SVG shows a small repeating pencil-stroke (path draw loop) beside Nina.',
      avoidShowing: ['clinical procedures', 'instruments', 'anything that contradicts the clinician', 'alarming content'],
    },
    {
      sceneTitle: 'Inside a calm clinic',
      narration:
        "These visits happen in a calm, comfortable space — somewhere unhurried where George can settle and you can focus. Knowing it's a relaxed setting helps both of you arrive a little more at ease.",
      onScreenText: 'A calm, unhurried space',
      visualType: 'icon-grid',
      motionDirection: 'Slow dolly into a softly lit consult room with two comfortable chairs',
      transition: 'Dissolve into the appointment-summary scene',
      iconName: 'Stethoscope',
      lottieSearchKeyword: 'calm clinic room welcoming consultation soft',
      customAnimationIdea:
        'A gentle illustrated consult room fades in; two adjacent chairs softly glow to signal "you sit together".',
      backgroundStyle: 'Warm-neutral illustrated room with amber accent',
      safetyBoundary:
        'Depicts a welcoming setting only — no procedures or advice.',
      personalizationReason:
        'Reassures both Nina and George by previewing a relaxed environment.',
      durationSec: 9,
      clinicalVisualCategory: 'care-setting',
      clinicalVisualDirection:
        'A calm primary-care consult room with two comfortable seats side by side; warm and unintimidating.',
      realWorldConceptShown: 'The everyday environment of George\'s appointments.',
      safeMedicalVisualStyle: 'Warm illustrated interior, soft light, paired seating, no equipment focus.',
      assetSearchTerms: ['calm consult room', 'two chairs clinic', 'welcoming clinic interior', 'primary care room illustration'],
      codedAnimationIdea:
        'Room SVG fades up; two chairs animate a soft drop-shadow glow in alternating ease.',
      avoidShowing: ['exam tables in use', 'instruments', 'sterile cold imagery', 'distress'],
    },
    {
      sceneTitle: 'Capture an appointment summary',
      narration:
        "Right after the visit, jot a quick summary while it's fresh: what the doctor said, any changes, and the next steps. We give you a simple template so you only fill in the blanks — no need to remember a format.",
      onScreenText: 'Capture: what was said • changes • next steps',
      visualType: 'portal-mockup',
      motionDirection: 'A portal summary card fills in field by field with a soft check at the end',
      transition: 'Cross-dissolve into the memory-support checklist',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'appointment summary form fill portal calm',
      customAnimationIdea:
        'A clean summary card auto-fills three labeled fields one by one; a "saved" check appears when complete.',
      backgroundStyle: 'Cream with a clean portal card and amber checks',
      safetyBoundary:
        'A note-capture template only — never generates or alters medical content.',
      personalizationReason:
        'Directly solves George\'s forgetting by giving Nina a frictionless place to capture details.',
      durationSec: 11,
      patientPersonalization:
        'Built around Nina recording George\'s visit details immediately while fresh.',
      assetSearchTerms: ['summary form fill animation', 'portal card UI', 'saved checkmark', 'appointment notes template'],
      codedAnimationIdea:
        'Three field rows reveal via clip-path width; a saved check draws (strokeDashoffset) at the end.',
      avoidShowing: ['auto-generated medical advice', 'altering clinician instructions', 'PHI exposure'],
    },
    {
      sceneTitle: 'Memory-support checklist',
      narration:
        "A few small habits make a big difference: bring a list of current medications, write down questions beforehand, snap a photo of any printed instructions, and confirm the next appointment before you leave. Tiny steps, big peace of mind.",
      onScreenText: 'Meds list • questions • photo instructions • confirm next visit',
      visualType: 'checklist',
      motionDirection: 'Four checklist items appear one by one with soft draws',
      transition: 'Cross-dissolve into the medication/follow-up calendar',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'caregiver checklist habits memory support',
      customAnimationIdea:
        'Four rows with small icons (pill, question, camera, calendar) appear with a gentle check beside each.',
      backgroundStyle: 'Cream with clean rows and pastel icons',
      safetyBoundary:
        'Organizational habits only — no medication advice, no diagnosis, no overriding clinicians.',
      personalizationReason:
        'Equips Nina with concrete, low-effort tools to compensate for George\'s memory gaps.',
      durationSec: 11,
      patientPersonalization:
        'Practical caregiver habits tailored to helping George not lose visit information.',
      assetSearchTerms: ['caregiver checklist icons', 'memory support steps', 'habit list animation', 'pill camera calendar icon'],
      codedAnimationIdea:
        'Rows stagger in (y 8→0); each check draws with strokeDashoffset on entry.',
      avoidShowing: ['specific medication instructions', 'dosing advice', 'anything overriding the clinician'],
    },
    {
      sceneTitle: 'Follow-up calendar + doctor questions',
      narration:
        "Last, keep a shared calendar of George's follow-ups and refills so nothing slips, and bring a short card of questions to ask the doctor next time. Add the next visit now while it's on your mind — future you will be grateful.",
      onScreenText: 'Shared calendar for follow-ups • a card of questions to ask',
      visualType: 'question-list',
      motionDirection: 'A calendar fills with two follow-up pills; a question card slides in beside it',
      transition: 'Soft fade to the safety closing card',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'shared calendar follow up questions card calm',
      customAnimationIdea:
        'A mini calendar populates two follow-up chips with soft drops; a question card flips in beside it.',
      backgroundStyle: 'Cream with a calendar widget and a question card',
      safetyBoundary:
        'Scheduling and question-prompting only — no medical advice or decisions.',
      personalizationReason:
        'Gives Nina a durable system for George\'s follow-ups and a prompt to raise her own questions.',
      durationSec: 10,
      patientPersonalization:
        'Combines George\'s follow-up tracking with Nina\'s list of questions for the doctor.',
      assetSearchTerms: ['calendar follow up animation', 'question card flip', 'shared schedule UI', 'doctor questions list'],
      codedAnimationIdea:
        'Calendar chips drop in (y -8→0 with bounce); question card rotateY 90→0 flip-in.',
      avoidShowing: ['medical recommendations', 'medication changes', 'overriding clinician scheduling'],
    },
    {
      sceneTitle: 'Safety + warm close',
      narration:
        "Nina, this guide is here to support you — it never diagnoses, changes medications, or replaces what George's care team tells you. Always follow their guidance, and use these tools to make every visit a little easier. Thank you for showing up for him.",
      onScreenText: 'Educational only — your care team\'s guidance comes first',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer fades in with a soft shield, then settles',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield reassurance caregiver soft',
      customAnimationIdea:
        'A soft shield draws beneath the disclaimer; the scene eases to a warm rest.',
      backgroundStyle: 'Calm amber-navy with quiet vignette',
      safetyBoundary:
        'Explicit education-only disclaimer; defers all care decisions to George\'s care team.',
      personalizationReason:
        'Closes by name, honoring Nina\'s effort on George\'s behalf.',
      durationSec: 8,
      patientPersonalization:
        'Names Nina and George with gratitude in a warm sign-off.',
      assetSearchTerms: ['safety shield animation', 'disclaimer card', 'reassuring caregiver close', 'brand fade'],
      codedAnimationIdea:
        'Shield SVG strokeDashoffset draw; disclaimer fades up; container ease-out to rest.',
      avoidShowing: ['anything alarming', 'medication changes', 'content that overrides clinicians'],
    },
  ],

  /* =====================================================================
   * 11) HEALTH EQUITY / TRANSPORT — Tasha, 39
   * ===================================================================== */
  'health-equity-transport': [
    {
      sceneTitle: 'Warm, judgment-free intro for Tasha',
      narration:
        "Hi Tasha. Life is full — between childcare and getting across town, appointments can be genuinely hard to make. There is zero judgment here. We made this just to make getting to your care easier, on your terms.",
      onScreenText: 'Hi Tasha — let\'s make getting to care easier',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a warm gradient; a gentle open-door icon settles',
      transition: 'Cross-dissolve into the barriers card',
      iconName: 'Home',
      lottieSearchKeyword: 'warm welcome supportive judgment free',
      customAnimationIdea:
        'Tasha\'s name fades in; a small open-door icon swings gently to signal "you\'re welcome here".',
      backgroundStyle: 'Warm coral-to-cream gradient, soft grain',
      safetyBoundary:
        'Welcome only — supportive, never shaming, no medical advice.',
      personalizationReason:
        'Greets Tasha and names her real barriers with warmth, removing any blame.',
      durationSec: 9,
      patientPersonalization:
        'Acknowledges Tasha\'s childcare and transportation barriers with zero judgment.',
      assetSearchTerms: ['warm welcome animation', 'open door icon', 'supportive title card', 'judgment free intro'],
      codedAnimationIdea:
        'Name stagger fade; a door SVG rotates open slightly (rotateY) then rests.',
      avoidShowing: ['anything shaming or blaming', 'stigmatizing imagery', 'stressful clutter'],
    },
    {
      sceneTitle: 'The real barriers — childcare & time',
      narration:
        "Let's name what's actually in the way: arranging childcare, finding the time, and getting there and back. These are practical, solvable things — not personal failings. We'll tackle them one at a time.",
      onScreenText: 'Childcare • time • the trip there and back',
      visualType: 'quote-card',
      motionDirection: 'Three barrier chips appear, then each lifts as it becomes "solvable"',
      transition: 'Upward wipe into the route map',
      iconName: 'Users',
      lottieSearchKeyword: 'barriers to solutions supportive chips calm',
      customAnimationIdea:
        'Three barrier chips (childcare, time, transport) appear; each gains a soft green outline to mark "solvable".',
      backgroundStyle: 'Cream with a soft coral accent',
      safetyBoundary:
        'Names barriers supportively; offers practical help, never judgment or advice.',
      personalizationReason:
        'Reflects Tasha\'s exact barriers — childcare and transportation — as solvable, not faults.',
      durationSec: 10,
      patientPersonalization:
        'Directly addresses Tasha\'s childcare, time, and transportation challenges without blame.',
      assetSearchTerms: ['barrier chips animation', 'solvable solution outline', 'supportive cards', 'childcare transport icons'],
      codedAnimationIdea:
        'Three chips stagger in; each gets an SVG outline draw to signal "addressed".',
      avoidShowing: ['blame language', 'stigmatizing depictions of hardship', 'judgmental tone'],
    },
    {
      sceneTitle: 'Your route to the appointment',
      narration:
        "Here's the simple route to your clinic, so the trip feels known before you set out. We can also help you find the easiest way to get there — whether that's a ride, transit, or a parking spot waiting for you.",
      onScreenText: 'A simple route — and help getting there',
      visualType: 'map-route',
      motionDirection: 'A route line draws from home to the clinic pin; a moving marker travels it',
      transition: 'Cross-dissolve into the clinic-arrival setting',
      iconName: 'MapPin',
      lottieSearchKeyword: 'map route navigation appointment calm',
      customAnimationIdea:
        'A clean route draws from a home pin to a clinic pin; a marker eases along it and the clinic pin gives a soft bounce.',
      backgroundStyle: 'Soft cream map surface with coral route line and pins',
      safetyBoundary:
        'Navigation and logistics help only — no medical advice.',
      personalizationReason:
        'Turns Tasha\'s transportation barrier into a concrete, easy-to-picture route.',
      durationSec: 11,
      patientPersonalization:
        'Maps Tasha\'s trip to her clinic and signals transportation support options.',
      assetSearchTerms: ['route map animation', 'home to clinic path', 'navigation marker', 'map pin bounce'],
      codedAnimationIdea:
        'Route path strokeDashoffset draws; a marker animates offset-distance; clinic pin springs at arrival.',
      avoidShowing: ['exact home address exposure', 'stressful traffic imagery', 'medical claims'],
    },
    {
      sceneTitle: 'A welcoming clinic arrival',
      narration:
        "When you get here, it's a calm, friendly place. The front desk is glad to see you, there's no rush, and you belong here just as much as anyone. We want arriving to feel easy, not stressful.",
      onScreenText: 'A calm arrival — you belong here',
      visualType: 'icon-grid',
      motionDirection: 'Slow dolly into a warm reception; a friendly greeting cue appears',
      transition: 'Dissolve into the supportive-visit scene',
      iconName: 'Home',
      lottieSearchKeyword: 'clinic arrival welcoming reception warm',
      customAnimationIdea:
        'An illustrated reception fades in; a soft "welcome" speech bubble eases up from the desk.',
      backgroundStyle: 'Warm illustrated interior with coral accent',
      safetyBoundary:
        'Depicts a welcoming setting only — no procedures, no advice, no judgment.',
      personalizationReason:
        'Counters Tasha\'s embarrassment about rescheduling by showing a warm, no-rush arrival.',
      durationSec: 9,
      clinicalVisualCategory: 'care-setting',
      clinicalVisualDirection:
        'A warm, welcoming clinic arrival and reception; friendly and unhurried, emphasizing belonging.',
      realWorldConceptShown: 'The welcoming environment Tasha arrives to.',
      safeMedicalVisualStyle: 'Warm illustrated reception, soft light, friendly staff cue, no equipment focus.',
      assetSearchTerms: ['welcoming clinic reception', 'warm arrival illustration', 'friendly front desk', 'calm waiting area'],
      codedAnimationIdea:
        'Reception SVG fades up; a welcome speech bubble scales 0.8→1 and rests.',
      avoidShowing: ['cold sterile imagery', 'crowded stressful waiting', 'judgmental staff', 'medical procedures'],
    },
    {
      sceneTitle: 'A supportive, judgment-free visit',
      narration:
        "Inside, the visit is just a conversation — your care team listening, no lectures, no judgment about missed appointments. You can be honest about what's hard, and they'll help you find what works for your life.",
      onScreenText: 'Just a conversation — honest and judgment-free',
      visualType: 'icon-grid',
      motionDirection: 'A soft scene of two figures in easy conversation; a warm speech exchange',
      transition: 'Cross-dissolve into the care-navigator message',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'supportive doctor conversation calm judgment free',
      customAnimationIdea:
        'Two illustrated figures exchange gentle speech bubbles back and forth in an easy, unhurried rhythm.',
      backgroundStyle: 'Warm clinical tones with two seated figures',
      safetyBoundary:
        'Shows a supportive interaction only — no advice, no judgment, no claims.',
      personalizationReason:
        'Directly eases Tasha\'s embarrassment by modeling a non-judgmental, honest visit.',
      durationSec: 11,
      clinicalVisualCategory: 'patient-experience',
      clinicalVisualDirection:
        'A supportive, judgment-free conversation between patient and care team; warm and reassuring.',
      realWorldConceptShown: 'What a supportive, non-judgmental visit feels like.',
      safeMedicalVisualStyle: 'Warm illustrated figures, soft palette, easy posture, no equipment, no distress.',
      assetSearchTerms: ['supportive visit conversation', 'judgment free care', 'patient clinician talk', 'warm consultation scene'],
      codedAnimationIdea:
        'Two speech bubbles alternate scale-in (0.85→1) in a gentle back-and-forth loop.',
      avoidShowing: ['lecturing posture', 'shame cues', 'clinical procedures', 'tension'],
    },
    {
      sceneTitle: 'Your care navigator is a message away',
      narration:
        "You don't have to solve any of this alone. Your care navigator can help arrange a ride, find childcare resources, or pick a time that actually fits your week — just send a message. That's exactly what they're here for.",
      onScreenText: 'Message your care navigator — they\'ll help with the logistics',
      visualType: 'caregiver-card',
      motionDirection: 'A chat bubble from a navigator slides in; helpful option chips appear',
      transition: 'Cross-dissolve into the rescheduling-support flow',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'care navigator message chat support helpful',
      customAnimationIdea:
        'A navigator chat bubble slides in; three helper chips (ride, childcare, timing) fan out beneath it.',
      backgroundStyle: 'Cream with a chat UI and coral helper chips',
      safetyBoundary:
        'Connects Tasha to logistical support — no medical advice, no judgment.',
      personalizationReason:
        'Gives Tasha a real, low-pressure way to get help with her specific barriers.',
      durationSec: 10,
      patientPersonalization:
        'Routes Tasha\'s childcare, ride, and timing needs to a supportive care navigator.',
      assetSearchTerms: ['care navigator chat', 'support message UI', 'helper option chips', 'logistics assistance animation'],
      codedAnimationIdea:
        'Navigator bubble slides in (x -20→0); three chips fan out with staggered scale-in.',
      avoidShowing: ['medical advice in chat', 'pressure or guilt', 'judgmental wording'],
    },
    {
      sceneTitle: 'Rescheduling is easy — and next step',
      narration:
        "And if you do need to move an appointment, that's completely okay — it happens, and it's never held against you. Tap reschedule, pick a time that works, and you're set. Your next step is simple: pick the day that fits your life.",
      onScreenText: 'Need to reschedule? Tap, pick a time, done — no problem',
      visualType: 'portal-mockup',
      motionDirection: 'A reschedule button taps; a calendar opens and a new slot highlights green',
      transition: 'Soft fade to the safety closing card',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'reschedule appointment calendar easy tap',
      customAnimationIdea:
        'A reschedule button shows a tap ripple; a calendar opens and a new time slot fills with a soft confirm check.',
      backgroundStyle: 'Cream with a clean reschedule UI and coral confirm',
      safetyBoundary:
        'Scheduling support only — supportive, no judgment, no medical advice.',
      personalizationReason:
        'Removes the embarrassment Tasha feels about rescheduling by making it easy and blame-free.',
      durationSec: 9,
      patientPersonalization:
        'Directly answers Tasha\'s embarrassment about rescheduling with a frictionless, kind flow.',
      assetSearchTerms: ['reschedule flow animation', 'calendar slot select', 'tap ripple UI', 'confirm appointment check'],
      codedAnimationIdea:
        'Button shows a ripple (scale+fade); calendar opens (height auto), a slot fills, check draws.',
      avoidShowing: ['guilt or penalty framing', 'shaming copy', 'medical claims'],
    },
    {
      sceneTitle: 'Safety + warm close',
      narration:
        "Tasha, this video is here to support you, never to judge you — it doesn't diagnose anything or replace your care team's guidance. Getting to care can be hard, and we're on your side. Reach out anytime; we've got you.",
      onScreenText: 'Educational only — we\'re here to support you, not judge you',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer fades in with a soft shield; an open-hand cue settles',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield supportive reassurance soft',
      customAnimationIdea:
        'A soft shield draws beneath the disclaimer alongside a small open-hand icon; the scene eases to rest.',
      backgroundStyle: 'Calm coral-navy with quiet vignette',
      safetyBoundary:
        'Explicit education-only, supportive disclaimer; defers care decisions to her care team.',
      personalizationReason:
        'Closes by name, reaffirming support and removing any sense of judgment for Tasha.',
      durationSec: 8,
      patientPersonalization:
        'Names Tasha with a warm, on-your-side sign-off.',
      assetSearchTerms: ['safety shield animation', 'supportive disclaimer card', 'open hand icon', 'brand fade'],
      codedAnimationIdea:
        'Shield + open-hand SVGs strokeDashoffset draw; disclaimer fades up; container ease-out.',
      avoidShowing: ['any shaming tone', 'medical advice', 'fine print that alarms'],
    },
  ],

  /* =====================================================================
   * 12) GENOMICS CONSENT — Henry, 64, curious but privacy-conscious
   * ===================================================================== */
  'genomics-consent': [
    {
      sceneTitle: 'Warm intro for Henry',
      narration:
        "Hi Henry. You're curious about contributing to research, and you also care a lot about your privacy — both of those can be true at once. We made this short, clear explainer just for you, so you can understand exactly how it works before deciding anything.",
      onScreenText: 'Hi Henry — understanding research, on your terms',
      visualType: 'title-card',
      motionDirection: 'Name fades up over a calm gradient; a small lock icon settles beside it',
      transition: 'Cross-dissolve into the curiosity/privacy card',
      iconName: 'Dna',
      lottieSearchKeyword: 'research curiosity privacy calm welcome',
      customAnimationIdea:
        'Henry\'s name fades in; a small padlock icon gently clicks shut to signal "your privacy matters".',
      backgroundStyle: 'Calm indigo-to-slate gradient, soft grain',
      safetyBoundary:
        'Welcome only — no enrollment pressure, no genetic claims, no advice.',
      personalizationReason:
        'Greets Henry and names both his curiosity and his privacy-consciousness.',
      durationSec: 9,
      patientPersonalization:
        'Holds Henry\'s curiosity about research and his privacy concern together, by name.',
      assetSearchTerms: ['research welcome animation', 'privacy lock icon', 'calm title card', 'genomics intro'],
      codedAnimationIdea:
        'Name stagger fade; a padlock SVG rotates shut (shackle path) with a soft click cue.',
      avoidShowing: ['genetic risk claims', 'scary lab imagery', 'enrollment pressure', 'identifiers'],
    },
    {
      sceneTitle: 'Curious, and careful — both okay',
      narration:
        "It's smart to want both: to be part of something bigger and to keep your personal information protected. This explainer walks through how research uses information in a de-identified way — meaning your name is separated out — so you can weigh it calmly.",
      onScreenText: 'Curious about research • careful about privacy — both matter',
      visualType: 'quote-card',
      motionDirection: 'Two balanced chips (curiosity + privacy) settle level on a soft scale',
      transition: 'Upward wipe into the DNA + de-identification scene',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'balance curiosity privacy trust calm',
      customAnimationIdea:
        'A gentle balance beam holds a "curiosity" chip and a "privacy" chip; it settles perfectly level.',
      backgroundStyle: 'Slate with a soft indigo accent',
      safetyBoundary:
        'Validates Henry\'s stance; explains concepts only, never pushes enrollment.',
      personalizationReason:
        'Honors Henry\'s dual stance instead of nudging him toward a choice.',
      durationSec: 10,
      patientPersonalization:
        'Frames Henry\'s curiosity and caution as equally valid, no pressure either way.',
      assetSearchTerms: ['balance scale animation', 'privacy curiosity chips', 'level beam UI', 'trust quote card'],
      codedAnimationIdea:
        'A balance-beam SVG rotates to level (rotate to 0) as two chips fade onto each side.',
      avoidShowing: ['implying he should enroll', 'genetic risk framing', 'pressure cues'],
    },
    {
      sceneTitle: 'How de-identification works',
      narration:
        "Here's the heart of it. Your genetic information is like a long, twisting ladder — a DNA strand. When it's used for research, your identifying details, your name and contact, are separated and fade away, replaced by an anonymous code. A privacy shield stays around it the whole time.",
      onScreenText: 'Your name is separated out — your data becomes an anonymous code',
      visualType: 'comparison',
      motionDirection: 'A DNA helix rotates slowly; name labels fade to neutral dots inside a shield',
      transition: 'Dissolve into the privacy/research-database scene',
      iconName: 'Dna',
      lottieSearchKeyword: 'dna helix de-identification privacy shield calm',
      customAnimationIdea:
        'A gentle DNA helix rotates; "Henry / contact" labels beside it dissolve into neutral dots; a translucent shield encloses the whole frame.',
      backgroundStyle: 'Deep slate with a glowing indigo helix and a soft shield ring',
      safetyBoundary:
        'Explains de-identification as a general concept — no genetic interpretation, no identifiers shown.',
      personalizationReason:
        'Speaks straight to Henry\'s privacy concern by literally showing identifiers fade away.',
      durationSec: 13,
      clinicalVisualCategory: 'dna-genomics',
      clinicalVisualDirection:
        'A calm rotating DNA helix; identifier labels fade to dots and an anonymous code appears, all inside a privacy shield.',
      realWorldConceptShown: 'How genomic data is de-identified to protect privacy in research.',
      safeMedicalVisualStyle: 'Glowing 2.5D helix, soft indigo, neutral dots and shield — clean and reassuring, never clinical-scary.',
      assetSearchTerms: ['dna helix animation', 'de-identification privacy', 'data anonymization shield', 'genomics privacy illustration'],
      codedAnimationIdea:
        'Helix SVG rotates (rotateY loop); label text fades to dots (opacity + blur); a shield ring scales in and pulses softly.',
      avoidShowing: ['real identifiers', 'genetic risk readouts', 'scary lab or DNA-damage imagery', 'a specific result'],
    },
    {
      sceneTitle: 'Where your data lives — protected',
      narration:
        "That anonymous data joins a secure research database alongside many others, kept behind strong protections. Researchers study patterns across large groups of people — never you as an individual — to help future patients. Your identity stays locked away the whole time.",
      onScreenText: 'A secure database — patterns across many, never you alone',
      visualType: 'icon-grid',
      motionDirection: 'Anonymous dots flow into a protected database vault; a lock seals it',
      transition: 'Cross-dissolve into the sample-collection scene',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'secure research database privacy vault calm',
      customAnimationIdea:
        'Neutral dots stream into a stylized database/vault; a padlock clicks shut and a soft shield glows around it.',
      backgroundStyle: 'Slate with a glowing secure-database illustration',
      safetyBoundary:
        'Explains secure, population-level research use only — no individual claims, no identifiers.',
      personalizationReason:
        'Reassures Henry that research looks at groups, not him individually, easing his privacy worry.',
      durationSec: 11,
      clinicalVisualCategory: 'research-visit',
      clinicalVisualDirection:
        'Anonymous data entering a secure research database; emphasize protection and population-level study, never an individual.',
      realWorldConceptShown: 'How de-identified data is stored securely and studied at population scale.',
      safeMedicalVisualStyle: 'Clean vault/database 2.5D, soft glow, lock and shield motifs, calm and trustworthy.',
      assetSearchTerms: ['secure database animation', 'data vault privacy', 'research repository illustration', 'protected data lock'],
      codedAnimationIdea:
        'Dots animate along paths into a database SVG; a padlock shackle closes; a shield ring fades in around it.',
      avoidShowing: ['individual identification', 'genetic risk results', 'breach or scary imagery', 'identifiers'],
    },
    {
      sceneTitle: 'A simple, non-graphic sample',
      narration:
        "If you do choose to take part, contributing a sample is simple and gentle — often just a small saliva sample in a tube, or a routine blood draw like the ones you've had before. Nothing dramatic, nothing graphic.",
      onScreenText: 'A simple saliva sample or a routine draw — gentle and quick',
      visualType: 'icon-grid',
      motionDirection: 'A small specimen tube fills softly; a calm label seals on',
      transition: 'Dissolve into the consent-review scene',
      iconName: 'FlaskConical',
      lottieSearchKeyword: 'saliva sample tube collection gentle calm',
      customAnimationIdea:
        'A clean specimen tube gently fills with a soft fluid level rising; a neutral label slides on and a cap seals it.',
      backgroundStyle: 'Soft clinical blues with a single illustrated specimen tube',
      safetyBoundary:
        'Shows a simple, non-graphic sample concept only — no needles in skin, no blood imagery, no claims.',
      personalizationReason:
        'Demystifies participation for privacy-conscious Henry with a calm, low-stakes visual.',
      durationSec: 10,
      clinicalVisualCategory: 'sample-collection',
      clinicalVisualDirection:
        'A simple saliva tube or routine specimen, non-graphic; emphasize how easy and undramatic it is.',
      realWorldConceptShown: 'What providing a research sample generally involves.',
      safeMedicalVisualStyle: 'Clean 2.5D specimen tube, soft fluid level, neutral label, no needles-in-skin, no blood.',
      assetSearchTerms: ['saliva sample tube', 'specimen collection illustration', 'lab tube fill animation', 'non graphic sample'],
      codedAnimationIdea:
        'Tube SVG fluid level rises (rect height grows); a label slides on (x) and cap rotates to seal.',
      avoidShowing: ['needles entering skin', 'blood or graphic draws', 'scary lab equipment', 'genetic results'],
    },
    {
      sceneTitle: 'Reviewing the consent form',
      narration:
        "Before anything happens, you review a consent form — in plain language — that spells out what's collected, how privacy is protected, and that you can ask questions or change your mind at any time. Nothing moves forward until you say yes.",
      onScreenText: 'You review consent in plain language — and can change your mind anytime',
      visualType: 'consent-panel',
      motionDirection: 'A clear consent panel scrolls; key terms highlight; a checkbox waits, unchecked',
      transition: 'Cross-dissolve into the safety closing card',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'consent form review checkbox plain language calm',
      customAnimationIdea:
        'A clean consent panel scrolls gently; three key lines highlight one by one; an unchecked checkbox pulses softly to signal "your choice".',
      backgroundStyle: 'Slate with a clean consent-panel UI and indigo highlights',
      safetyBoundary:
        'Explains the consent process and right to withdraw — never implies he should enroll.',
      personalizationReason:
        'Centers Henry\'s control and right to say no, addressing his privacy concern directly.',
      durationSec: 11,
      patientPersonalization:
        'Emphasizes Henry\'s control: review, ask questions, and withdraw consent at any time.',
      assetSearchTerms: ['consent form UI animation', 'checkbox highlight', 'plain language panel', 'withdraw anytime icon'],
      codedAnimationIdea:
        'Panel scrolls (translateY); three lines highlight (background fade) in sequence; checkbox scales 1→1.05 pulse, stays unchecked.',
      avoidShowing: ['pre-checked consent', 'enrollment pressure', 'fine-print intimidation', 'identifiers'],
    },
    {
      sceneTitle: 'Safety + warm close',
      narration:
        "Henry, this explainer is here to help you understand, not to push you either way — it doesn't interpret any genetic risk, expose your information, or recommend that you enroll. The choice is entirely yours, and we're glad to answer any question you have.",
      onScreenText: 'Educational only — the choice is entirely yours',
      visualType: 'closing-card',
      motionDirection: 'Disclaimer fades in with a soft shield and lock; the scene settles',
      transition: 'Slow fade to brand mark',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'safety shield privacy reassurance soft close',
      customAnimationIdea:
        'A soft shield with a small lock draws beneath the disclaimer; the scene eases to a calm rest.',
      backgroundStyle: 'Calm indigo-navy with quiet vignette',
      safetyBoundary:
        'Explicit education-only disclaimer; no risk interpretation, no enrollment recommendation, no identifiers.',
      personalizationReason:
        'Closes by name, reaffirming Henry\'s full control over the decision.',
      durationSec: 8,
      patientPersonalization:
        'Names Henry and underscores that the decision belongs entirely to him.',
      assetSearchTerms: ['safety shield lock animation', 'privacy disclaimer card', 'reassuring close', 'brand fade'],
      codedAnimationIdea:
        'Shield + lock SVGs strokeDashoffset draw; disclaimer fades up; container ease-out to rest.',
      avoidShowing: ['genetic risk interpretation', 'enrollment pressure', 'exposed identifiers', 'scary imagery'],
    },
  ],

  /* =====================================================================
   * CORONARY STENT — Bruno, 61, anxious about a heart procedure
   * ===================================================================== */
  'coronary-stent': [
    {
      sceneTitle: 'Hi, Bruno',
      narration:
        "Hi Bruno, it's your care team. We know a procedure on your heart sounds scary — so let's walk through exactly what happens, calmly and clearly, before your visit.",
      onScreenText: "Hi Bruno — let's walk through it.",
      visualType: 'title-card',
      motionDirection: 'Name fades up over a calm, softly beating heart motif',
      transition: 'Cross-dissolve',
      iconName: 'HeartPulse',
      lottieSearchKeyword: 'calm heart welcome',
      customAnimationIdea: "Bruno's name settles over a softly beating heart silhouette.",
      backgroundStyle: 'Navy gradient with warm light',
      safetyBoundary: 'Education only — no assessment of Bruno’s case.',
      personalizationReason: 'Greets Bruno and gently names the fear.',
      durationSec: 11,
    },
    {
      sceneTitle: 'We hear you',
      narration:
        "You told us that anything to do with your heart is frightening, and that's completely understandable. The best way to feel calmer is to actually see what the procedure involves — so that's exactly what we'll do.",
      onScreenText: '“Anything with my heart scares me.”',
      visualType: 'quote-card',
      motionDirection: 'Quote eases in; a reassuring underline draws beneath it',
      transition: 'Slide-left',
      iconName: 'MessageSquare',
      lottieSearchKeyword: 'reassurance calm',
      customAnimationIdea: 'A worried quote softens as a calm line draws beneath it.',
      backgroundStyle: 'Muted navy with a warm spotlight',
      safetyBoundary: 'Acknowledges feelings; makes no clinical claims.',
      personalizationReason: 'Validates Bruno’s specific fear.',
      durationSec: 12,
    },
    {
      sceneTitle: 'Questions worth asking',
      narration:
        "Before your procedure, it can help to jot a few questions down. How long does it take? Will I be awake? What's recovery like? Bring these, and your team will walk you through every one.",
      onScreenText: 'Questions to bring',
      visualType: 'question-list',
      motionDirection: 'Checklist items tick in one by one',
      transition: 'Fade',
      iconName: 'ClipboardList',
      lottieSearchKeyword: 'question checklist',
      customAnimationIdea: 'Each question writes on with a soft check beside it.',
      backgroundStyle: 'Calm navy with blue accents',
      safetyBoundary: 'Prompts discussion; gives no medical answers.',
      personalizationReason: 'Helps an anxious first-timer feel prepared.',
      durationSec: 11,
    },
    {
      sceneTitle: 'Your team is with you',
      narration:
        "When you're ready, your care team will go over the details and answer anything on your mind. You don't have to carry the worry alone — just reply or tap to start the conversation.",
      onScreenText: "You're not alone in this",
      visualType: 'portal-mockup',
      motionDirection: 'A gentle message prompt rises with a soft pulse',
      transition: 'Fade',
      iconName: 'CalendarClock',
      lottieSearchKeyword: 'care team message',
      customAnimationIdea: 'A “reply to talk it through” prompt pulses softly.',
      backgroundStyle: 'Soft navy with a warm key light',
      safetyBoundary: 'Encourages a care-team conversation, not self-care.',
      personalizationReason: 'Reassures Bruno he has support.',
      durationSec: 10,
    },
    {
      sceneTitle: 'A calm close',
      narration:
        "This video is here to help you understand your procedure, Bruno — it isn't medical advice, and your care team is the best place for your specific questions. Thanks for taking a few minutes for your heart.",
      onScreenText: 'For education only',
      visualType: 'closing-card',
      motionDirection: 'Text settles center; disclaimer eases in last',
      transition: 'Fade-to-card',
      iconName: 'ShieldCheck',
      lottieSearchKeyword: 'calm closing heart',
      customAnimationIdea: 'A calm heart settles as the disclaimer fades in.',
      backgroundStyle: 'Deep navy, minimal and restful',
      safetyBoundary: 'Explicit education-only disclaimer.',
      personalizationReason: 'Closes warmly by name.',
      durationSec: 9,
    },
  ],
};
