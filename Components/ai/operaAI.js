export const getStructuredAIResponse = (query) => {
    const q = query.toLowerCase().trim();

    if (!q) {
        return {
            type: 'error',
            message: "Please ask a question."
        };
    }

    // Hard-coded demo answers for specific questions
    if (q.includes("why was my production down last week") || q.includes("production down last week")) {
        return {
            type: 'simple',
            message: "Production was down 12.4% week-over-week primarily because two high-value Invisalign starts were rescheduled and Chair 3 ran at 68% utilization instead of its usual 85%. If Chair 3 returns to baseline utilization this week, projected production recovers by $14,200."
        };
    }

    if (q.includes("which chairs are underperforming today") || q.includes("underperforming chairs")) {
        return {
            type: 'simple',
            message: "Chair 2 and Chair 5 are underperforming. Chair 2 has had 31 minutes of idle time since 9am due to a late patient, and Chair 5 is running procedures 18% longer than scheduled. I recommend shifting one wire change from Chair 5 to Chair 2 to rebalance."
        };
    }

    if (q.includes("are we fully booked") || q.includes("just looking busy")) {
        return {
            type: 'simple',
            message: "You're booked at 92% capacity, but only 76% of booked time is production-generating. The gap comes from short follow-ups and hygiene overlaps. Optimizing appointment types would increase daily production by approximately $3,800 without adding hours."
        };
    }

    if (q.includes("which patients are most likely to cancel") || q.includes("cancel this week")) {
        return {
            type: 'simple',
            message: "Seven patients are at high cancellation risk based on historical behavior, appointment type, and lead time. Three are Invisalign check-ins booked over 21 days out. Proactively confirming those patients could prevent $6,400 in lost production."
        };
    }

    if (q.includes("how is my front desk performing") || q.includes("front desk") && q.includes("last month")) {
        return {
            type: 'simple',
            message: "Front desk performance is up 9% month-over-month. Call answer rate increased from 71% to 78%, and average booking time dropped by 42 seconds. However, missed calls between 12–1pm are still the largest leakage point."
        };
    }

    if (q.includes("what's slowing my clinic down") || q.includes("slowing") && q.includes("most")) {
        return {
            type: 'simple',
            message: "The largest bottleneck is case acceptance follow-ups. 19 treatment plans over $4,000 have been pending for more than 10 days. Closing just 25% of those would add $52,000 in near-term revenue."
        };
    }

    if (q.includes("which procedures are hurting") || q.includes("schedule efficiency")) {
        return {
            type: 'simple',
            message: "Banding appointments are consistently running 14 minutes over schedule, creating downstream delays. Shortening those appointments by standardizing setup would free up 1.6 chair hours per day."
        };
    }

    if (q.includes("are we staffing correctly today") || q.includes("staffing correctly")) {
        return {
            type: 'simple',
            message: "You're slightly overstaffed this afternoon. Hygiene coverage exceeds demand by 0.8 staff-hours, while clinical support is tight during the 10–12 window. Reallocating one staff member earlier would reduce idle time without affecting care."
        };
    }

    if (q.includes("what should i fix first") && q.includes("revenue this month")) {
        return {
            type: 'simple',
            message: "Focus on three actions: Recover underutilized chair time (+$38K/month potential), Improve Invisalign case acceptance (+$61K pipeline), Reduce same-day cancellations (+$19K/month). Addressing these alone would increase monthly revenue by ~14%."
        };
    }

    if (q.includes("if i do nothing differently") || q.includes("how will this month end")) {
        return {
            type: 'simple',
            message: "At your current pace, you'll finish the month 7% below target, primarily due to mid-month schedule gaps and unclosed treatment plans. If you implement the two highest-impact fixes I flagged, you'll exceed target by 4–6% instead."
        };
    }

    // New patients query (Dental Context)
    if (q.includes("patient") && (q.includes("new") || q.includes("how many"))) {
        return {
            type: 'structured',
            quickAnswer: "You've welcomed 48 new patients this month, with 'Google' and 'Patient Referrals' being the top acquisition channels.",
            dataLookup: {
                title: "I am analyzing Patient Acquisition & Referral Data for 2024",
                description: "Performing analysis of new patient acquisition, comparing month-to-date performance against historical benchmarks, and examining the effectiveness of various marketing and referral channels. This analysis includes patient demographics, appointment types, and treatment acceptance rates.",
                sources: [
                    { name: "Patient Management System", type: "database", status: "active" },
                    { name: "Referral Tracking Module", type: "crm", status: "active" },
                    { name: "Marketing Analytics", type: "analytics", status: "synced" },
                    { name: "Online Booking Logs", type: "tracking", status: "live" }
                ]
            },
            analysis: {
                title: "New Patient Flow & Conversion Analysis",
                widgets: [
                    { 
                        title: "Track Monthly Acquisition by Source", 
                        description: "Comprehensive analysis of new patient flow, segmented by referral and marketing channels.",
                        details: "Analyzing channel effectiveness, cost-per-acquisition, and patient lifetime value forecasts.",
                        metrics: [{ label: "Top Channel", value: "Referrals (45%)" }, { label: "Monthly Growth", value: "+15%" }]
                    },
                    { 
                        title: "Analyze New Patient Appointment Types", 
                        description: "Breakdown of initial appointments for new patients, such as comprehensive exams, emergencies, or hygiene.",
                        details: "Identifying patterns in new patient needs to optimize scheduling and service offerings.",
                        metrics: [{ label: "Top Appt. Type", value: "Hygiene" }, { label: "NP Emergencies", value: "8%" }]
                    },
                    { 
                        title: "Calculate New Patient Treatment Acceptance", 
                        description: "Measuring the rate at which new patients accept proposed treatment plans within the first 30 days.",
                        details: "Tracking conversion from initial consultation to scheduled treatment to gauge trust and value proposition.",
                        metrics: [{ label: "NP Tx Acceptance", value: "65%" }, { label: "Avg. Initial Tx Value", value: "$1,250" }]
                    }
                ]
            },
            insights: {
                title: "Actionable Patient Acquisition Insights",
                content: "The practice onboarded 48 new patients this month, a 15% increase. Patient referrals remain the strongest channel, indicating high patient satisfaction. To capitalize on this, consider launching a formal referral program with incentives. The 65% treatment acceptance rate is strong; aim for 70% by offering same-day treatment consultations for new patients with diagnosed needs.",
                highlights: [
                    { label: "New Patients (Month)", value: "48", change: "+15%" },
                    { label: "Top Source", value: "Referrals", change: "45%" },
                    { label: "Avg. Initial Tx Value", value: "$1,250", change: "+4%" },
                    { label: "NP Acceptance Rate", value: "65%", change: "+3%" }
                ],
                chartData: [
                    { name: 'Referral', value: 22 }, { name: 'Google', value: 15 },
                    { name: 'Insurance', value: 7 }, { name: 'Other', value: 4 }
                ]
            }
        };
    }

    // Collection rate query (Dental Context)
    if (q.includes("collection")) {
        return {
            type: 'structured',
            quickAnswer: "Your current 90-day collection rate is an excellent 98.3%, and your average Days in AR is down to 28 days.",
            dataLookup: {
                title: "I am analyzing Revenue Cycle Management (RCM) Data for 2024",
                description: "Conducting an evaluation of collection efficiency, accounts receivable aging, payer performance, and claim processing metrics. This analysis includes detailed examination of payment velocity, denial rates, and financial health indicators.",
                sources: [
                    { name: "Billing & Collections Module", type: "financial", status: "active" },
                    { name: "Clearinghouse Data", type: "processor", status: "live" },
                    { name: "AR Aging Reports", type: "accounting", status: "current" },
                    { name: "Insurance Adjudication Logs", type: "financial", status: "synced" }
                ]
            },
            analysis: {
                title: "Revenue Cycle & Collection Efficiency Analysis",
                widgets: [
                    { 
                        title: "Calculate Collection Rate Performance", 
                        description: "Rolling 30/60/90/120 day analysis of collections against net production.",
                        details: "Tracking collection velocity and benchmarking against MGMA top 10% standards for dental practices.",
                        metrics: [{ label: "90-Day Rate", value: "98.3%" }, { label: "YTD Average", value: "97.5%" }]
                    },
                    { 
                        title: "Analyze Accounts Receivable Aging", 
                        description: "Breakdown of outstanding patient vs. insurance balances by aging buckets.",
                        details: "Identifying bottlenecks in the billing cycle and high-risk accounts for follow-up.",
                        metrics: [{ label: "Days in AR", value: "28" }, { label: "Insurance AR >90d", value: "$7.6K" }]
                    },
                    { 
                        title: "Benchmark Payer Performance", 
                        description: "Comparative analysis of payment speeds and denial rates across top insurance payers.",
                        details: "Positioning your practice's claim efficiency to identify opportunities for negotiating fee schedules or improving claim submission.",
                        metrics: [{ label: "Top Payer", value: "Delta Dental" }, { label: "Avg. Denial Rate", value: "3.2%" }]
                    }
                ]
            },
            insights: {
                title: "Actionable Financial Performance Insights",
                content: "The 98.3% collection rate is top-tier. To maintain this, focus on the $7.6K in insurance AR over 90 days. Assign a team member to follow up on these specific claims this week. To further optimize, implement automated payment reminders for patient balances that reach 30 days outstanding. This can reduce patient AR and maintain a low Days in AR metric.",
                highlights: [
                    { label: "90-Day Collection Rate", value: "98.3%", change: "Top 10%" },
                    { label: "Days in AR", value: "28", change: "-2 days" },
                    { label: "Patient AR >90d", value: "$3.1K", change: "-15%" },
                    { label: "Clean Claim Rate", value: "96.8%", change: "+1.2%" }
                ],
                chartData: [
                    { name: '0-30d', value: 120 }, { name: '31-60d', value: 45 },
                    { name: '61-90d', value: 19 }, { name: '>90d', value: 11 }
                ]
            }
        };
    }

    // Provider productivity query (Dental Context)
    if (q.includes("provider") && (q.includes("productivity") || q.includes("performance"))) {
        return {
            type: 'structured',
            quickAnswer: "Dr. Anya Sharma is the top-producing dentist this month at $810/hr, while Jessica Day leads hygienists at $250/hr.",
            dataLookup: {
                title: "I am analyzing Provider Production & Efficiency Data for Q4 2024",
                description: "Comprehensive evaluation of provider productivity, including production per hour (PPH), schedule utilization, and procedure mix. This analysis incorporates patient volume and treatment efficiency to provide actionable insights for performance coaching.",
                sources: [
                    { name: "Provider Schedules", type: "scheduling", status: "live" },
                    { name: "Production by Provider Reports", type: "financial", status: "active" },
                    { name: "Appointment History", type: "analytics", status: "current" },
                    { name: "Clinical Procedure Logs", type: "tracking", status: "monitored" }
                ]
            },
            analysis: {
                title: "Provider Performance & Efficiency Analysis",
                widgets: [
                    { 
                        title: "Rank by Production Per Hour (PPH)", 
                        description: "Comparative ranking of dentist and hygienist PPH to identify top performers and coaching opportunities.",
                        details: "Multi-dimensional scoring incorporating production volume, procedure mix, and patient satisfaction.",
                        metrics: [{ label: "Top Dentist PPH", value: "$810" }, { label: "Top Hygiene PPH", value: "$250" }]
                    },
                    { 
                        title: "Calculate Provider Schedule Utilization", 
                        description: "Metrics measuring filled appointment time versus available time to gauge scheduling efficiency.",
                        details: "Analyzing chair time optimization, patient throughput, and revenue generation per clinical hour.",
                        metrics: [{ label: "Avg. Dentist Use", value: "90%" }, { label: "Avg. Hygiene Use", value: "95%" }]
                    },
                    { 
                        title: "Analyze Procedure Mix", 
                        description: "Analysis of the types of procedures performed by each provider to understand service focus.",
                        details: "Examining the balance between diagnostic, preventative, restorative, and cosmetic procedures.",
                        metrics: [{ label: "Top Dentist Proc.", value: "Crowns" }, { label: "Top Hygiene Proc.", value: "SRP" }]
                    }
                ]
            },
            insights: {
                title: "Actionable Provider Performance Insights",
                content: "Dr. Sharma's high PPH is driven by advanced procedures. To elevate other dentists, consider a mentorship session where she shares her case presentation techniques. Jessica Day's 95% hygiene utilization is a benchmark for the team. Replicate her success by having her lead a short training on her recall confirmation and scheduling process.",
                highlights: [
                    { label: "Top Dentist", value: "Dr. Sharma", change: "$810/hr" },
                    { label: "Top Hygienist", value: "J. Day", change: "$250/hr" },
                    { label: "Team Utilization", value: "92%", change: "+2%" },
                    { label: "Avg. Tx Value/Visit", value: "$450", change: "+6%" }
                ],
                chartData: [
                    { name: 'Dr. Sharma', value: 810 }, { name: 'Dr. Davis', value: 750 },
                    { name: 'Dr. Carter', value: 720 }, { name: 'J. Day (H)', value: 250 }, { name: 'M. Lee (H)', value: 225 }
                ]
            }
        };
    }

    // Schedule query
    if (q.includes("schedule") || (q.includes("today") && q.includes("appointments"))) {
        return {
            type: 'structured',
            quickAnswer: "You have 5 major appointments today, including a high-value implant consult at 2:00 PM.",
            dataLookup: {
                title: "I am accessing Today's Master Schedule",
                description: "Cross-referencing appointment book with patient records to provide a consolidated view of today's clinical activities, including procedure types, patient alerts, and required prep.",
                sources: [
                    { name: "Appointment Scheduler", type: "scheduling", status: "live" },
                    { name: "Patient Records", type: "database", status: "active" },
                    { name: "Clinical Notes", type: "tracking", status: "current" }
                ]
            },
            analysis: {
                title: "Daily Schedule Breakdown & Key Events",
                widgets: [
                    { 
                        title: "Morning Block (9AM - 12PM)", 
                        description: "Focus on restorative and emergency care.",
                        details: "Two fillings and one emergency exam.",
                        metrics: [{ label: "Key Appt", value: "Emergency Tooth Pain" }, { label: "Est. Production", value: "$1,800" }]
                    },
                    { 
                        title: "Afternoon Block (1PM - 5PM)", 
                        description: "High-value procedures and hygiene.",
                        details: "One implant consult and a routine cleaning.",
                        metrics: [{ label: "Key Appt", value: "Implant Consult" }, { label: "Est. Production", value: "$4,500+" }]
                    }
                ]
            },
            insights: {
                title: "Actionable Schedule Insights for Today",
                content: "The implant consult with Jennifer Brown at 2:00 PM is the highest value opportunity today. Ensure the consultation room is prepped with implant models and financial options are ready to present. The 9:00 AM emergency patient, Sarah Johnson, has a history of dental anxiety; alert the clinical team to allow extra time for patient comfort.",
                highlights: [
                    { label: "Total Appointments", value: "5", change: "" },
                    { label: "High-Value Procedures", value: "1", change: "Implant" },
                    { label: "Patient Alerts", value: "1", change: "Anxiety" },
                    { label: "Est. Daily Production", value: "$6,300", change: "" }
                ],
                chartData: [
                    { name: '9AM', value: 500 }, { name: '10AM', value: 1300 },
                    { name: '2PM', value: 4000 }, { name: '4PM', value: 500 }
                ]
            }
        };
    }

    // Help/commands query
    if (q.includes("help") || q.includes("what can you do") || q.includes("command")) {
        return {
            type: 'help',
            commands: [
                { query: "How many new patients did we see this month?", description: "Comprehensive patient acquisition analytics with trend analysis" },
                { query: "What's our current collection rate?", description: "Detailed financial performance metrics and benchmarking" },
                { query: "Show me provider productivity trends", description: "In-depth staff performance analysis and optimization insights" },
                { query: "What is the schedule for today?", description: "Real-time daily appointment overview and flow management" },
                { query: "How are revenue trends looking?", description: "Financial trend analysis with predictive insights" },
                { query: "What's our debond rate?", description: "Treatment success metrics and clinical excellence analysis" }
            ]
        };
    }

    // Default response
    return {
        type: 'simple',
        message: "I can help with queries about patients, revenue, and schedules. For deeper analysis, an API key may be required. Try asking 'help' to see what I can do!"
    };
};

export async function askWithContext(question, uploadedFiles = [], uploadedImages = []) {
    try {
        // First check if we have a hard-coded response
        const structuredResponse = getStructuredAIResponse(question);
        if (structuredResponse.type === 'simple') {
            return structuredResponse.message;
        }
        
        const resp = await fetch('/api/ai/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                question, 
                fileIds: uploadedFiles.map(f => f.fileId),
                images: uploadedImages 
            })
        })
        const data = await resp.json()
        if (!resp.ok) throw new Error(data?.error || 'Request failed')
        return data.answer
    } catch (e) {
        return `Error: ${e.message}`
    }
}