import { redirect } from "next/navigation";

/** The portal login lives at /final/login (the site's Login). */
export default function ClinicLoginRedirect() {
  redirect("/final/login");
}
