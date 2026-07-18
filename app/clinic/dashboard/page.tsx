import { redirect } from "next/navigation";

/** No KPI dashboard — the portal opens on Patients. */
export default function ClinicDashboardHome() {
  redirect("/clinic/dashboard/patients");
}
